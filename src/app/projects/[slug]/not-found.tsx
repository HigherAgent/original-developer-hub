import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <main className="py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-neutral-dark">Project Not Found</h1>
        <p className="text-lg text-neutral-medium mb-8">
          The project you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/projects" className="btn-primary">
            Browse All Projects
          </Link>
          <Link href="/" className="btn-secondary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
