import React from 'react';
import { skillGroups } from '../data/skills';
import { Database, BarChart3, Server, Cpu, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function Skills() {
  const getGroupIcon = (iconName) => {
    switch (iconName) {
      case 'Database':
        return <Database size={22} />;
      case 'BarChart3':
        return <BarChart3 size={22} />;
      case 'Server':
        return <Server size={22} />;
      case 'Cpu':
        return <Cpu size={22} />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">

        <div className="section-header" data-reveal>
          <div className="section-tag">
            <span>05 // Technical Arsenal</span>
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Competencies</span>
          </h2>
          <p className="section-subtitle">
            Grouped technical toolsets supported directly by ongoing coursework at Mumbai University
            and implemented within public GitHub projects.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="skill-group-card glass-card" data-reveal style={{ '--rd': `${idx * 110}ms` }}>
              <div className="group-header">
                <div className="group-icon-box">
                  {getGroupIcon(group.icon)}
                </div>
                <div>
                  <h3 className="group-title">{group.title}</h3>
                  <p className="group-desc">{group.description}</p>
                </div>
              </div>

              <div className="skills-pills-list">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`tech-pill ${skill.highlight ? 'highlight' : ''}`}
                  >
                    {skill.highlight && <CheckCircle2 size={13} className="pill-check" />}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-footnote glass-card" data-reveal>
          <CheckCircle2 size={18} className="footnote-icon" />
          <p>
            <strong>Evidence-Based Profile:</strong> All listed proficiencies correspond to active
            undergraduate coursework, laboratory modules, or codebases featured in the project showcase.
          </p>
        </div>

      </div>
    </section>
  );
}