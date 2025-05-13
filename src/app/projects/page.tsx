import ProjectCard from '@/components/projects/ProjectCard';

export const metadata = {
  title: 'Projects | Developer Hub',
  description: 'Browse all development projects in the Developer Hub',
};

export default function ProjectsPage() {
  const projects = [
    {
      title: 'PDF Made Simple',
      description: 'A user-friendly tool to work with PDF forms without requiring registration or paid services. Allows users to fill out PDF forms, save them, and share them easily.',
      status: 'ready' as const,
      slug: 'pdf-made-simple',
    },
    {
      title: 'Developer Hub',
      description: 'A centralized portfolio website that showcases all development projects and provides a unified donation system. Built with Next.js and Tailwind CSS.',
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

  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-dark">Projects</h1>
          <p className="text-lg text-neutral-medium">
            Browse all my development projects, from production-ready applications to works in progress.
          </p>
        </header>
        
        {/* Filtering (placeholder for future implementation) */}
        <div className="mb-8">
          <div className="p-4 bg-neutral-light bg-opacity-50 rounded-lg">
            <p className="text-center text-neutral-medium">
              Filtering options will be implemented in a future update.
            </p>
          </div>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              status={project.status}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
