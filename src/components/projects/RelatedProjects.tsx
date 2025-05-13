import Link from 'next/link';
import ProjectCard from './ProjectCard';

// RelatedProjects component for showing related projects
interface RelatedProjectsProps {
  currentProjectSlug: string;
  limit?: number;
}

// This component would eventually fetch related projects based on tags, categories, or other criteria
// For now, it's a simple implementation that shows other projects
export default function RelatedProjects({ 
  currentProjectSlug,
  limit = 3 
}: RelatedProjectsProps) {
  // This would come from a database or CMS in a real implementation
  const allProjects = [
    {
      title: 'PDF Made Simple',
      description: 'A user-friendly tool to work with PDF forms without requiring registration or paid services.',
      status: 'ready' as const,
      slug: 'pdf-made-simple',
    },
    {
      title: 'Developer Hub',
      description: 'A centralized portfolio website that showcases all development projects and provides a unified donation system.',
      status: 'development' as const,
      slug: 'developer-hub',
    },
    {
      title: 'Future Project 1',
      description: 'An exciting new project that is currently in the planning phase. Stay tuned for updates!',
      status: 'planned' as const,
      slug: 'future-project-1',
    },
    {
      title: 'Future Project 2',
      description: 'Another exciting new project that is currently in the planning phase. More details coming soon!',
      status: 'planned' as const,
      slug: 'future-project-2',
    },
    {
      title: 'Future Project 3',
      description: 'A third exciting new project that is currently in the planning phase. Watch this space for updates!',
      status: 'planned' as const,
      slug: 'future-project-3',
    },
  ];
  
  // Filter out the current project and limit the number of related projects
  const relatedProjects = allProjects
    .filter(project => project.slug !== currentProjectSlug)
    .slice(0, limit);
  
  if (relatedProjects.length === 0) {
    return null;
  }
  
  return (
    <div className="related-projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            status={project.status}
            slug={project.slug}
          />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/projects" className="btn-secondary">
          View All Projects
        </Link>
      </div>
    </div>
  );
}
