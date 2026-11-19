import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import matter from 'gray-matter';

// Load the client-safe helper without changing the project's module configuration.
const source = fs.readFileSync('src/lib/writing-series.js', 'utf8');
const { getWritingHighlights, getWritingSeries, seriesTitle } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const article = (slug, series, date, updated) => ({ slug, series, date, updated, part: 1, title: slug, readingTime: '3 min read' });

test('highlights fill three slots with recent series, then latest posts', () => {
  for (const count of [0, 1, 2, 3, 4]) {
    const posts = Array.from({ length: count }, (_, i) => article(`post-${i}`, `Series ${i}`, `2026-11-${10 + i}`));
    posts.push(article('standalone', null, '2026-11-19'));
    const cards = getWritingHighlights(posts);
    assert.equal(cards.length, Math.min(3, posts.length + count));
    assert.equal(cards.filter((card) => card.label.startsWith('Series')).length, Math.min(3, count));
    if (count < 3) assert.equal(cards[count].key, 'standalone');
    assert.equal(new Set(cards.map((card) => card.key)).size, cards.length);
  }
  assert.deepEqual(getWritingHighlights([]), []);
});

test('series use the newest update while preserving part order and anchor links', () => {
  const posts = [article('older', 'TCG', '2026-10-01', '2026-11-19'), article('newer', 'Design Philosophy', '2026-11-12')];
  posts.push({ ...article('tcg-next', 'TCG', '2026-11-14'), part: 2 });
  const groups = getWritingSeries(posts);
  assert.equal(groups[0].key, 'tcg');
  assert.equal(groups[0].title, 'Making a TCG (Tracers)');
  assert.deepEqual(groups[0].posts.map((post) => post.part), [1, 2]);
  assert.equal(getWritingHighlights(posts)[0].href, '/design-writing/#series-tcg');
  assert.equal(seriesTitle('Design Philosophy'), 'My Game Design Philosophy');
});

const posts = fs.readdirSync('src/content/blog').filter((name) => name.endsWith('.md')).map((name) => ({
  slug: name.slice(0, -3), ...matter(fs.readFileSync(`src/content/blog/${name}`, 'utf8')).data,
}));

test('articles retain valid dates, complete ordered series, balanced styling and working internal references', () => {
  assert.equal(posts.length, 20);
  assert.equal(new Set(posts.map((post) => post.id)).size, posts.length);
  assert.equal(posts.find((post) => post.slug === 'tcg-part-one').date, '2025-07-30');
  for (const group of getWritingSeries(posts)) {
    group.posts.forEach((post, i) => {
      assert.equal(post.part, i + 1);
      assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(post.date <= '2026-11-19');
      if (i) assert.ok(post.date >= group.posts[i - 1].date);
      for (const slug of post.relatedSlugs || []) assert.ok(posts.some((p) => p.slug === slug && p.series === post.series));
      const text = post.content.map((block) => block.text || '').join('\n');
      for (const tag of ['NOTE', 'BLOCK', 'SIDENOTE', 'VIOLET']) {
        assert.equal(text.split(`[${tag}]`).length, text.split(`[/${tag}]`).length, `${post.slug}: ${tag}`);
      }
      for (const [, slug] of text.matchAll(/\]\(\/design-writing\/([^/)]+)\)/g)) assert.ok(posts.some((p) => p.slug === slug), `${post.slug}: ${slug}`);
    });
  }
});

test('new article preserves unresolved Aura timing and proposed tests', () => {
  const post = posts.find((post) => post.slug === 'when-more-cards-meant-less-game');
  const text = post.content.map((block) => block.text || '').join('\n');
  assert.equal(post.part, 13);
  for (const phrase of ["We haven't decided that part yet.", "I'll compare a few existing draw and recovery effects", 'generated Auras come first', "I don't want to introduce a dedicated Aura area or a hard limit"]) assert.ok(text.includes(phrase));
});


test('removed philosophy essays are absent and remaining series is contiguous', () => {
  const removed = ['meaningful-choices-not-more-choices', 'start-with-the-feeling-not-the-feature', 'clarity-is-not-the-same-as-simplicity'];
  for (const slug of removed) assert.ok(!posts.some((post) => post.slug === slug));
  const philosophy = getWritingSeries(posts).find((group) => group.key === 'philosophy');
  assert.equal(philosophy.posts.length, 7);
  assert.deepEqual(philosophy.posts.map((post) => post.part), [1, 2, 3, 4, 5, 6, 7]);
});

test('resource and Improv articles preserve the intended narrative', () => {
  const bySlug = (slug) => posts.find((post) => post.slug === slug);
  const content = (slug) => bySlug(slug).content.map((block) => block.text || '').join('\\n');
  const prototype = bySlug('02-the-prototype-with-too-many-decks');
  for (const heading of ['A deck is not a game loop', 'Could I lose the resource deck?'])
    assert.ok(prototype.content.some((block) => block.type === 'subheading' && block.text === heading));
  const resource = content('03-rebuilding-the-resource-loop');
  for (const type of ['Momentum Maneuver', 'Hype Maneuver', 'Flow Maneuver']) assert.ok(resource.includes(type));
  const improv = content('improv-when-a-card-becomes-fuel');
  assert.ok(!improv.includes('What I would actually test'));
  assert.ok(!improv.includes('Tracer in early'));
});


test('the three revised TCG articles retain styled notes and reflections', () => {
  for (const slug of ['02-the-prototype-with-too-many-decks', '03-rebuilding-the-resource-loop', 'improv-when-a-card-becomes-fuel']) {
    const post = posts.find((post) => post.slug === slug);
    const text = post.content.map((block) => block.text || '').join('\\n');
    assert.ok(text.includes('[NOTE]') && text.includes('[/NOTE]'), slug + ': note');
    assert.ok(text.includes('[BLOCK]') && text.includes('[/BLOCK]'), slug + ': reflection');
  }
});


test('new philosophy essays have distinct theses and appropriate reading times', () => {
  const slugs = [
    'when-two-good-mechanics-make-a-worse-game',
    'complexity-has-an-audience',
    'the-difference-between-adding-choices-and-creating-decisions',
  ];
  const titles = [
    'When Two Good Mechanics Make a Worse Game',
    'Complexity Has an Audience',
    'The Difference Between Adding Choices and Creating Decisions',
  ];
  for (let i = 0; i < slugs.length; i++) {
    const post = posts.find((p) => p.slug === slugs[i]);
    assert.ok(post, slugs[i]);
    assert.equal(post.title, titles[i]);
    assert.equal(post.series, 'Design Philosophy');
    assert.equal(post.part, i + 5);
    assert.ok(post.content.some((block) => block.type === 'heading-2'));
    const text = post.content.map((block) => block.text || '').join(' ');
    const minutes = Math.ceil(text.split(/\s+/).filter(Boolean).length / 225);
    assert.ok(minutes >= 5 && minutes <= 7, slugs[i] + ': ' + minutes + ' min');
    assert.ok(text.includes('[BLOCK]') && text.includes('[/BLOCK]'));
  }
});


test('performance and worldbuilding are combined into one TCG article', () => {
  const removed = 'why-i-built-the-world-of-tracers';
  assert.ok(!posts.some((post) => post.slug === removed), 'no redundant worldbuilding entry');
  const combined = posts.find((post) => post.slug === '05-prototype-two-finding-the-performance');
  assert.ok(combined);
  assert.equal(combined.part, 7);
  assert.equal(combined.coverImage, '/tcg-tracers-inspirations.png');
  const text = combined.content.map((block) => block.text || '').join(' ');
  for (const phrase of ['underground sport', 'two crews', 'world', 'Flow', 'Hype', 'Momentum', 'pavement after a Jam']) {
    assert.ok(text.includes(phrase), phrase);
  }
  assert.ok(!text.includes('/design-writing/' + removed));
  const tcg = getWritingSeries(posts).find((group) => group.key === 'tcg');
  assert.equal(tcg.posts.length, 13);
  assert.deepEqual(tcg.posts.map((post) => post.part), Array.from({ length: 13 }, (_, i) => i + 1));
});


test('LEGO philosophy article stays on modular interconnected systems and learning', () => {
  const post = posts.find((post) => post.slug === 'lego-bricks-are-not-the-game');
  assert.ok(post);
  assert.equal(post.title, 'Building Games Like LEGO: Modular Systems, Stronger Connections');
  assert.ok(!/card game|physical card|Tracers|Maneuver/i.test(post.excerpt));
  const articleText = post.content.map((block) => block.text || '').join(' ');
  for (const phrase of ['modular', 'overlap', 'replace', 'remove', 'foundation', 'learning', 'systems']) {
    assert.ok(articleText.toLowerCase().includes(phrase), phrase);
  }
  assert.ok(!/card game|physical game|Tracers|Maneuver/i.test(articleText));
  const minutes = Math.ceil(articleText.split(/\s+/).filter(Boolean).length / 225);
  assert.ok(minutes >= 5 && minutes <= 7, `LEGO article reading time: ${minutes}`);
});


test('the deleted Clarity essay is not linked from the adjacent philosophy posts', () => {
  const slugs = ['prototype-the-question-not-the-feature', 'when-two-good-mechanics-make-a-worse-game'];
  for (const slug of slugs) {
    const post = posts.find((entry) => entry.slug === slug);
    assert.ok(post);
    assert.ok(!(post.relatedSlugs || []).includes('clarity-is-not-the-same-as-simplicity'));
    assert.ok(!post.content.some((block) => (block.text || '').includes('clarity-is-not-the-same-as-simplicity')));
  }
});
