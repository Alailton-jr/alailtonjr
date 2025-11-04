export const projectMeta = {
  id: 'omni-leads',
  title: 'Omni Leads — B2B Intelligence',
  summary: 'Lead‑scoring platform with geocoding, clustering, and RCA workflows.',
  tags: ['React', 'FastAPI', 'Postgres', 'ML', 'Geospatial'],
};
import { PROJECTS } from '../../data/site';

const project = PROJECTS.find(p => p.id === 'omni-leads');

export default function OmniLeadsProjectPage() {
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
    </div>
  );
}
