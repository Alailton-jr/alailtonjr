import { useParams } from 'react-router-dom';
import { PROJECTS } from '../data/site';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-12 text-center text-muted-fg">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p>The project you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
      <p className="text-lg text-muted-fg mb-6">{project.summary}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted text-muted-fg"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-accent transition-colors"
          >
            Repository
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-accent transition-colors"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
