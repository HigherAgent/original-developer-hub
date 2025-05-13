import Link from 'next/link';
import Image from 'next/image';

type ProjectStatus = 'ready' | 'beta' | 'development' | 'planned';

type ProjectCardProps = {
  title: string;
  description: string;
  status: ProjectStatus;
  slug: string;
  imageSrc?: string;
};

const statusMap = {
  ready: 'Launch Ready',
  beta: 'Beta',
  development: 'In Development',
  planned: 'Planned',
};

export default function ProjectCard({
  title,
  description,
  status,
  slug,
  imageSrc = '/placeholder-project.jpg',
}: ProjectCardProps) {
  return (
    <div className="card">
      <div className="h-40 bg-neutral-light rounded-md mb-4 relative overflow-hidden">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
      <h3 className="card-header">{title}</h3>
      <div className={`status-tag status-${status} mb-2`}>
        {statusMap[status]}
      </div>
      <p className="text-sm text-neutral-medium mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex justify-end">
        <Link href={`/projects/${slug}`} className="btn-tertiary">
          View Project
        </Link>
      </div>
    </div>
  );
}
