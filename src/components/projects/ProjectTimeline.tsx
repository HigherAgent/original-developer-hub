interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

export default function ProjectTimeline({ events }: ProjectTimelineProps) {
  if (!events.length) {
    return (
      <div className="text-neutral-medium text-center py-8">
        No timeline events available for this project.
      </div>
    );
  }

  return (
    <div className="project-timeline">
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index < events.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-neutral-light"></div>
            )}
            
            <div className="flex items-start">
              {/* Date marker */}
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full bg-primary-blue bg-opacity-10 flex items-center justify-center z-10 relative">
                  <span className="text-primary-blue font-semibold">{index + 1}</span>
                </div>
              </div>
              
              {/* Event content */}
              <div className="ml-4 bg-white p-5 rounded-lg border border-neutral-light shadow-sm flex-grow">
                <div className="text-sm font-medium text-primary-teal mb-1">
                  {event.date}
                </div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                  {event.title}
                </h3>
                <p className="text-neutral-medium">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
