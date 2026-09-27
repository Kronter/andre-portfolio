import PortfolioPage from '@/components/portfolio/PortfolioPage';
import { getPortfolioProjects, getWritingPosts } from '@/lib/portfolio-content';

export default PortfolioPage;

export async function getStaticProps() {
  const [projects, writingPosts] = await Promise.all([
    getPortfolioProjects(),
    getWritingPosts(),
  ]);

  return { props: { projects, writingPosts } };
}
