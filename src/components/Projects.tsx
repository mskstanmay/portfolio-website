import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { PROJECTS } from '@/utils/constants';
import { GitHubIcon, ExternalLinkIcon } from './icons';

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="A selection of projects that reflect how I approach problem-solving and product design."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
            className="card flex flex-col p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-primary-400"
              >
                <GitHubIcon className="h-4 w-4" />
                Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-primary-400"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
