import React, { useState } from 'react';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Github, FolderGit2, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <span>04 // Verifiable Code</span>
          </div>
          <h2 className="section-title">
            Featured Practical <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Authentic repositories built to explore machine learning embeddings, 
            defensive web engineering, threat intelligence, and high-performance APIs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="project-filter-bar">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
              <span className="filter-count">
                {category === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Banner: GitHub Repository CTA */}
        <div className="github-explore-banner glass-card">
          <div className="banner-left">
            <div className="banner-icon-box">
              <FolderGit2 size={24} />
            </div>
            <div>
              <h3 className="banner-title">Looking for more experiment repositories?</h3>
              <p className="banner-subtitle">
                Visit Kashaf's GitHub profile to explore codebases, commit histories, and setup scripts.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/sayyedkashaf?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <Github size={16} />
            <span>Browse All Repositories</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

      </div>
    </section>
  );
}
