import SectionShell from "@/components/ui/SectionShell";
import ProjectCard from "@/components/gallery/ProjectCard";
import { projects } from "@/content/projects";

export default function ProjectsSection() {
  return (
    <SectionShell id="projects" variant="default" className="bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 reveal-on-scroll">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Featured Projects
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
