import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ImageGallery from '@/components/projects/gallery/ImageGallery';
import TechStack from '@/components/projects/TechStack';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import RelatedProjects from '@/components/projects/RelatedProjects';

// Define TypeScript types for project data
type ProjectStatus = 'ready' | 'beta' | 'development' | 'planned';

interface Technology {
  name: string;
  icon: string;
  url: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  description: string;
  longDescription: string;
  imageSrc: string;
  gallery: string[];
  technologies: Technology[];
  repositoryUrl?: string;
  liveUrl?: string;
  timeline: TimelineEvent[];
}

// Status map (same as in ProjectCard component)
const statusMap = {
  ready: 'Launch Ready',
  beta: 'Beta',
  development: 'In Development',
  planned: 'Planned',
};

// This would eventually come from a database or CMS
// For now, we're using mock data
const getProjectData = (slug: string): Project | undefined => {
  const projects: Project[] = [
    {
      title: 'PDF Made Simple',
      slug: 'pdf-made-simple',
      status: 'ready',
      description: 'A user-friendly tool to work with PDF forms without requiring registration or paid services.',
      longDescription: `PDF Made Simple is a free tool that allows users to fill out PDF forms, save them, and share them easily without requiring registration or paid services.

The project was created to solve a common frustration: many existing PDF form tools are either unnecessarily complex, require paid subscriptions, or demand user registration with personal information.

Key features include:
- No registration required
- Completely free to use
- Simple, intuitive interface
- Instant PDF form detection
- Browser-based processing (no server uploads)
- Privacy-focused approach
- Mobile-friendly responsive design`,
      imageSrc: '/projects/pdf-made-simple/cover.jpg',
      gallery: [
        '/projects/pdf-made-simple/screenshot-1.jpg',
        '/projects/pdf-made-simple/screenshot-2.jpg',
        '/projects/pdf-made-simple/screenshot-3.jpg',
      ],
      technologies: [
        { name: 'JavaScript', icon: 'javascript.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'PDF.js', icon: 'pdfjs.svg', url: 'https://mozilla.github.io/pdf.js/' },
        { name: 'HTML/CSS', icon: 'html5.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'Responsive Design', icon: 'responsive.svg', url: '#' },
      ],
      repositoryUrl: 'https://github.com/yourusername/pdf-made-simple',
      liveUrl: 'https://pdf-made-simple.yourdomain.com',
      timeline: [
        {
          date: 'January 2025',
          title: 'Project Inception',
          description: 'Identified the need for a simple, free PDF form filler without registration requirements'
        },
        {
          date: 'February 2025',
          title: 'Initial Development',
          description: 'Created core functionality for PDF processing and form detection'
        },
        {
          date: 'March 2025',
          title: 'Beta Testing',
          description: 'Released beta version for initial user testing and feedback'
        },
        {
          date: 'April 2025',
          title: 'Launch',
          description: 'Official launch with all core features implemented'
        },
        {
          date: 'May 2025',
          title: 'Feature Enhancement',
          description: 'Added PDF preview and recent uploads history'
        }
      ]
    },
    {
      title: 'Developer Hub',
      slug: 'developer-hub',
      status: 'development',
      description: 'A centralized portfolio website that showcases all development projects and provides a unified donation system.',
      longDescription: `The Developer Hub is a centralized portfolio website that showcases all development projects and provides a unified donation system.

Built with Next.js and Tailwind CSS, it serves as a professional platform to present work, collect support for ongoing development, and build a personal brand as a developer.

Key features include:
- Unified project showcase
- Centralized donation system
- Professional branding
- Responsive design
- Project status tracking
- Technology stack visualization`,
      imageSrc: '/projects/developer-hub/cover.jpg',
      gallery: [
        '/projects/developer-hub/screenshot-1.jpg',
        '/projects/developer-hub/screenshot-2.jpg',
      ],
      technologies: [
        { name: 'Next.js', icon: 'nextjs.svg', url: 'https://nextjs.org/' },
        { name: 'TypeScript', icon: 'typescript.svg', url: 'https://www.typescriptlang.org/' },
        { name: 'Tailwind CSS', icon: 'tailwind.svg', url: 'https://tailwindcss.com/' },
        { name: 'React', icon: 'react.svg', url: 'https://reactjs.org/' },
      ],
      repositoryUrl: 'https://github.com/yourusername/developer-hub',
      timeline: [
        {
          date: 'March 2025',
          title: 'Project Planning',
          description: 'Defined requirements and created site architecture'
        },
        {
          date: 'April 2025',
          title: 'Design System Creation',
          description: 'Developed comprehensive design system and component structure'
        },
        {
          date: 'May 2025',
          title: 'Core Development',
          description: 'Implemented core pages and responsive design'
        }
      ]
    },
    {
      title: 'Future Project 1',
      slug: 'future-project-1',
      status: 'planned',
      description: 'An exciting new project that is currently in the planning phase.',
      longDescription: 'This project is currently in the planning phase. More details will be available soon.',
      imageSrc: '/projects/future-project-1/cover.jpg',
      gallery: [],
      technologies: [
        { name: 'React', icon: 'react.svg', url: 'https://reactjs.org/' },
        { name: 'Node.js', icon: 'nodejs.svg', url: 'https://nodejs.org/' },
      ],
      timeline: [
        {
          date: 'May 2025',
          title: 'Concept Development',
          description: 'Initial concept and requirements gathering'
        }
      ]
    }
  ];

  return projects.find(project => project.slug === slug);
};

// Generate static paths for all known projects
export function generateStaticParams() {
  return [
    { slug: 'pdf-made-simple' },
    { slug: 'developer-hub' },
    { slug: 'future-project-1' },
  ];
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectData(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Developer Hub',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.title} | Developer Hub`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectData(params.slug);
  
  // If project not found, show 404 page
  if (!project) {
    notFound();
  }
  
  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <header className="mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-sm text-neutral-medium hover:text-primary-blue mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 text-neutral-dark">
              {project.title}
            </h1>
            <div className={`status-tag status-${project.status} text-sm md:text-base`}>
              {statusMap[project.status]}
            </div>
          </div>
        </header>
        
        {/* Project Gallery */}
        <div className="mb-8">
          <ImageGallery 
            images={project.gallery} 
            altText={project.title} 
          />
        </div>
        
        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Project Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">About This Project</h2>
            <div className="prose prose-neutral max-w-none">
              {project.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {/* Project Links */}
            {(project.repositoryUrl || project.liveUrl) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                  >
                    View Live Project
                  </a>
                )}
                {project.repositoryUrl && (
                  <a 
                    href={project.repositoryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary"
                  >
                    View Repository
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Project Details */}
          <div>
            <div className="card">
              <h3 className="card-header mb-4">Project Details</h3>
              
              {/* Technology Stack */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-neutral-dark">Technologies</h4>
                <TechStack technologies={project.technologies} />
              </div>
              
              {/* Support Project */}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-neutral-dark">Support This Project</h4>
                <p className="text-sm text-neutral-medium mb-4">
                  Help fund the development and maintenance of this project with a one-time or recurring donation.
                </p>
                <Link href={`/support?project=${project.slug}`} className="btn-primary w-full text-center">
                  Support Development
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Development Timeline</h2>
          <ProjectTimeline events={project.timeline} />
        </div>
        
        {/* Related Projects */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Related Projects</h2>
          <RelatedProjects currentProjectSlug={params.slug} limit={3} />
        </div>
      </div>
    </main>
  );
}
