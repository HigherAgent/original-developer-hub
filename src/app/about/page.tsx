export const metadata = {
  title: 'About | Developer Hub',
  description: 'Learn about the developer behind the projects',
};

export default function AboutPage() {
  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-dark">About Me</h1>
          <p className="text-lg text-neutral-medium">
            Independent developer focused on creating useful, accessible applications.
          </p>
        </header>
        
        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Professional Background</h2>
          <p className="mb-4">
            I'm a self-taught developer with a passion for creating practical applications that solve real-world problems.
            My journey in development began several years ago, and I've since worked on a variety of projects ranging from
            small utility tools to larger web applications.
          </p>
          <p>
            I believe in creating software that's accessible, user-friendly, and solves genuine needs rather than chasing
            the latest trends or unnecessary complexity.
          </p>
        </section>
        
        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Development Philosophy</h2>
          <p className="mb-4">
            My approach to development is guided by a few core principles:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>User-Centric Design:</strong> Applications should be intuitive and solve real problems for users.</li>
            <li><strong>Accessibility:</strong> Software should be usable by everyone, regardless of ability or device.</li>
            <li><strong>Simplicity:</strong> The simplest solution that solves the problem is usually the best one.</li>
            <li><strong>Performance:</strong> Applications should be fast and efficient, respecting users' time and resources.</li>
            <li><strong>Privacy:</strong> User data should be respected and protected by default.</li>
          </ul>
          <p>
            These principles inform every project I work on, from the initial concept to the final implementation.
          </p>
        </section>
        
        <section className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Languages</h3>
              <ul className="space-y-2">
                <li>JavaScript / TypeScript</li>
                <li>HTML / CSS</li>
                <li>Python</li>
                <li>SQL</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Frameworks & Libraries</h3>
              <ul className="space-y-2">
                <li>React / Next.js</li>
                <li>Node.js</li>
                <li>Tailwind CSS</li>
                <li>Express</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Tools</h3>
              <ul className="space-y-2">
                <li>Git / GitHub</li>
                <li>VS Code</li>
                <li>Docker</li>
                <li>Figma</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Practices</h3>
              <ul className="space-y-2">
                <li>Responsive Design</li>
                <li>Performance Optimization</li>
                <li>Accessibility (A11y)</li>
                <li>SEO</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Why Support My Work?</h2>
          <p className="mb-4">
            All of my projects are developed independently and made available for free. Your support helps me continue
            creating and maintaining these tools.
          </p>
          <p className="mb-4">
            By supporting my work, you're helping fund:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Ongoing development and new features</li>
            <li>Server and infrastructure costs</li>
            <li>Time spent maintaining existing projects</li>
            <li>Development of new projects</li>
          </ul>
          <p className="mb-6">
            I'm committed to keeping my projects free and accessible to everyone, and your support makes that possible.
          </p>
          <div className="text-center">
            <a href="/support" className="btn-primary">Support My Work</a>
          </div>
        </section>
      </div>
    </main>
  );
}
