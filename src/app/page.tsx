import Link from 'next/link';
import ProjectCard from '@/components/projects/ProjectCard';

export default function Home() {
  const featuredProjects = [
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
      title: 'Future Project',
      description: 'An exciting new project that is currently in the planning phase. Stay tuned for updates!',
      status: 'planned' as const,
      slug: 'future-project',
    },
  ];

  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-dark">
            Developer Hub
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A centralized portfolio showcasing innovative development projects and solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/support" className="btn-secondary">
              Support My Work
            </Link>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                status={project.status}
                slug={project.slug}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Technical Skills</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Front-End</h3>
                <ul className="space-y-2">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                  <li>Animation & Interaction</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Back-End</h3>
                <ul className="space-y-2">
                  <li>Node.js</li>
                  <li>RESTful APIs</li>
                  <li>Database Design</li>
                  <li>Authentication</li>
                  <li>Serverless Functions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Tools & Practices</h3>
                <ul className="space-y-2">
                  <li>Git / GitHub</li>
                  <li>CI/CD Pipelines</li>
                  <li>Performance Optimization</li>
                  <li>Accessibility (A11y)</li>
                  <li>Test-Driven Development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">About</h2>
          <div className="card">
            <p className="mb-4">
              Welcome to my Developer Hub! I'm a passionate independent developer focused on creating useful, 
              user-friendly applications that solve real problems.
            </p>
            <p className="mb-4">
              This hub serves as a central location for all my development projects, with a unified system
              for users to support my ongoing work.
            </p>
            <p>
              Whether you're interested in using one of my applications, exploring the code behind them,
              or supporting further development, you'll find everything you need here.
            </p>
            <div className="mt-6">
              <Link href="/about" className="btn-tertiary">
                Learn More About Me
              </Link>
            </div>
          </div>
        </section>
        
        {/* Support Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Support My Work</h2>
          <div className="card bg-gradient-to-br from-neutral-offWhite to-neutral-light">
            <p className="mb-4">
              All my projects are developed independently and made available for free. Your support
              helps me continue creating and maintaining these tools.
            </p>
            <p className="mb-6">
              By supporting my work, you're helping fund ongoing development, server costs, and new features.
            </p>
            <div className="text-center">
              <Link href="/support" className="btn-primary">
                Support My Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
