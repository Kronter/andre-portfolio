import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getPortfolioProjects() {
  const directory = path.join(process.cwd(), 'src', 'content', 'projects');
  const filenames = fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'));

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const source = fs.readFileSync(path.join(directory, filename), 'utf8');
      const { data, content } = matter(source);
      const processed = await remark().use(html).process(content);

      return {
        ...data,
        slug: data.slug || filename.replace(/\.md$/, ''),
        contentHtml: processed.toString(),
      };
    }),
  );

  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
export async function getWritingPosts() {
  const directory = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const source = fs.readFileSync(path.join(directory, filename), 'utf8');
      const { data } = matter(source);
      const text = Array.isArray(data.content)
        ? data.content.flatMap((block) => [block.text || '', ...(block.items || [])]).join(' ')
        : '';
      const plainText = text.replace(/\[[A-Z]+\]|\[\/[A-Z]+\]|<[^>]+>|[*_#]/g, ' ');
      const readingMinutes = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 225));

      return {
        ...data,
        slug: filename.replace(/\.md$/, ''),
        readingTime: `${readingMinutes} min read`,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
