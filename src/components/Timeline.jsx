import React from 'react';
import { timelineData } from '../data/experience';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  BookOpen 
} from 'lucide-react';

export default function Timeline() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <span>03 // Academic Timeline</span>
          </div>
          <h2 className="section-title">
            Education &amp; <span className="gradient-text">Practical Experience</span>
          </h2>
          <p className="section-subtitle">
            A chronological timeline of degree pursuits, foundational coursework, and hands-on 
            development milestones.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {timelineData.map((item, index) => {
            const isEducation = item.type === 'education';
            return (
              <div key={index} className="timeline-item">
                
                {/* Node icon */}
                <div className="timeline-node">
                  {isEducation ? (
                    <GraduationCap size={20} className="node-icon" />
                  ) : (
                    <Briefcase size={20} className="node-icon" />
                  )}
                </div>

                {/* Content Card */}
                <div className="timeline-card glass-card">
                  <div className="timeline-card-header">
                    <div className="timeline-period-badge">
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>
                    <span className="timeline-type-pill">{item.badge}</span>
                  </div>

                  <h3 className="timeline-card-title">{item.title}</h3>
                  <div className="timeline-meta-row">
                    <span className="timeline-institution">
                      <BookOpen size={14} />
                      {item.institution}
                    </span>
                    <span className="timeline-location">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  </div>

                  <p className="timeline-description">{item.description}</p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="timeline-highlights">
                      <h4 className="highlights-title">Core Focus &amp; Practical Areas:</h4>
                      <ul className="highlights-list">
                        {item.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="highlight-item">
                            <CheckCircle size={15} className="hl-icon" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="timeline-footer">
                    <span className="timeline-status-tag">{item.status}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
