const SERIES = {
  TCG: { key: 'tcg', title: 'Making a TCG (Tracers)', description: 'Tracers, prototypes, rules and the decisions behind the game.' },
  'Design Philosophy': { key: 'philosophy', title: 'My Game Design Philosophy', description: 'Personal essays on choices, play, learning, constraints and clarity.' },
};

export const seriesTitle = (series) => SERIES[series]?.title || series;

export function getWritingSeries(posts) {
  const names = [...new Set(posts.map((post) => post.series).filter(Boolean))];
  return names.map((name) => {
    const articles = posts.filter((post) => post.series === name).sort((a, b) => a.part - b.part);
    return {
      ...(SERIES[name] || { key: `custom-${encodeURIComponent(name)}`, title: name, description: 'Follow this writing series.' }),
      posts: articles,
      updated: articles.reduce((latest, post) => (post.updated || post.date) > latest ? (post.updated || post.date) : latest, ''),
    };
  }).sort((a, b) => b.updated.localeCompare(a.updated) || a.key.localeCompare(b.key));
}

export function getWritingHighlights(posts) {
  const series = getWritingSeries(posts).slice(0, 3).map((group) => ({
    key: group.key, title: group.title, description: group.description,
    label: `Series · ${group.posts.length} articles`, href: `/design-writing/#series-${group.key}`,
  }));
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return [...series, ...latestPosts.slice(0, 3 - series.length).map((post) => ({
    key: post.slug, title: post.title, description: post.excerpt,
    label: `Latest post · ${post.readingTime}`, href: `/design-writing/${post.slug}/`,
  }))];
}
