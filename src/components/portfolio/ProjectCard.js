import Image from 'next/image';

export default function ProjectCard({ project, onOpen, compact = false }) {
  return (
    <button
      type="button"
      className={`project-card ${compact ? 'project-card-compact' : ''}`}
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={`Open ${project.title} case study`}
    >
      <span className="project-image-wrap">
        <Image
          src={project.image}
          alt={project.imageAlt || `${project.title} project artwork`}
          fill
          sizes={compact ? '(max-width: 767px) 78vw, 320px' : '(max-width: 767px) 100vw, 50vw'}
          className="project-image"
        />
        <span className="project-card-arrow" aria-hidden="true">↗</span>
      </span>
      <span className="project-card-copy">
        <span className="project-card-heading">
          <strong>{project.title}</strong>
          {project.descriptor && <span>{project.descriptor}</span>}
        </span>
        <span className="tag-list" aria-label="Project evidence">
          {project.tags?.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </span>
      </span>
    </button>
  );
}
