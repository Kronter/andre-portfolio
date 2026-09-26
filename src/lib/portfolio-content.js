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
      return { ...data, slug: filename.replace(/\.md$/, '') };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
