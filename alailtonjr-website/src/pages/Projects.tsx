import { useState, useMemo } from 'react';
import { ProjectCard } from '../components/ProjectCard';

// Manually define projects here
const PROJECTS = [
  {
    id: 'vied',
    title: 'Virtual IED - IEC 61850',
    summary: 'Open‑source vIED implementing line differential protection with SV/GOOSE, running on virtualized servers.',
    tags: ['IEC 61850', '87L', 'Virtualization', 'C++', 'Linux RT'],
    repo: 'https://github.com/yourrepo/vied',
    page: '/projects/vied',
  },
  // Add more projects here as needed
];

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesTag = 
        selectedTag === null ||
        project.tags.includes(selectedTag);
      return matchesTag;
    });
  }, [selectedTag]);

  return (
    <div className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-lg text-muted-fg">
          A collection of my work in power systems, protection, and software development.
        </p>
      </div>

      {/* Tag Filter Only */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
            selectedTag === null
              ? 'border-accent bg-accent text-accent-fg'
              : 'border-border bg-muted text-muted-fg hover:border-accent'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
              selectedTag === tag
                ? 'border-accent bg-accent text-accent-fg'
                : 'border-border bg-muted text-muted-fg hover:border-accent'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-fg">
          <p>No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
