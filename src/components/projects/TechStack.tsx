import Link from 'next/link';
import Image from 'next/image';

interface Technology {
  name: string;
  icon: string;
  url: string;
}

interface TechStackProps {
  technologies: Technology[];
}

export default function TechStack({ technologies }: TechStackProps) {
  if (!technologies.length) {
    return (
      <div className="text-neutral-medium text-sm">
        No technologies specified for this project.
      </div>
    );
  }

  return (
    <div className="tech-stack">
      <div className="grid grid-cols-2 gap-3">
        {technologies.map((tech, index) => (
          <a
            key={index}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-md bg-neutral-light bg-opacity-50 hover:bg-opacity-70 transition-colors"
          >
            <div className="relative w-8 h-8 mr-3 flex-shrink-0">
              {/* For production, you would have proper technology icons */}
              <div className="absolute inset-0 rounded-full bg-primary-blue bg-opacity-10 flex items-center justify-center">
                <span className="text-primary-blue font-semibold text-sm">
                  {tech.name.charAt(0)}
                </span>
              </div>
            </div>
            <span className="text-neutral-dark font-medium">{tech.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
