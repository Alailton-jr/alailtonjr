import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a href={project.page || `/projects/${project.id}`} className="group block p-6 rounded-4xl border border-border bg-card hover:shadow-lg transition-all duration-200">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-contain rounded-lg mb-4"
          loading="lazy"
        />
      )}
      <h3 className="text-xl font-semibold text-card-fg mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-fg text-sm mb-4 line-clamp-3">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted text-muted-fg"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {project.repo && (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg">
            <Github className="w-4 h-4" />
            Code
          </span>
        )}
        {project.link && (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg">
            <ExternalLink className="w-4 h-4" />
            Demo
          </span>
        )}
      </div>
    </a>
  );
}
