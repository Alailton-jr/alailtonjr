export const projectMeta = {
  id: 'vied',
  title: 'Virtual IED (87L) for IEC 61850',
  summary: 'Open‑source vIED implementing line differential protection with SV/GOOSE, running on virtualized servers.',
  tags: ['IEC 61850', '87L', 'Virtualization', 'C++', 'Linux RT'],
  repo: 'https://github.com/yourrepo/vied',
};
import { PROJECTS } from '../../data/site';

const project = PROJECTS.find(p => p.id === 'vied');

export default function VIEDProjectPage() {
  if (!project) return <div className="py-12 text-center text-muted-fg">Project not found.</div>;
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg text-muted-fg mb-6">{project.summary}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted text-muted-fg">{tag}</span>
        ))}
      </div>
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-accent transition-colors">Repository</a>
      )}
    </div>
  );
}
