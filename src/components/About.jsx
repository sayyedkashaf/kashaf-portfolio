import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  BrainCircuit, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: <BrainCircuit size={22} className="pillar-icon" />,
      title: "Data Analysis & ML",
      text: "Transforming raw data into meaningful insights using Python, SQL, statistical methods, and exploratory visualization."
    },
    {
      icon: <Sparkles size={22} className="pillar-icon" />,
      title: "Applied AI & Vector Search",
      text: "Implementing vector embeddings and generative AI to craft intelligent recommendation systems and semantic search tools."
    },
    {
      icon: <Code2 size={22} className="pillar-icon" />,
      title: "Backend & API Architecture",
      text: "Building clean, documented RESTful services with FastAPI and Flask, emphasizing data validation and reliability."
    },
    {
      icon: <ShieldCheck size={22} className="pillar-icon" />,
      title: "Defensive Cybersecurity",
      text: "Exploring the intersection of data and security through threat intelligence normalization, rate-limiting, and web protection."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <span>01 // About Me</span>
          </div>
          <h2 className="section-title">
            Passionate About Practical <span className="gradient-text">Problem Solving</span>
          </h2>
          <p className="section-subtitle">
            A student-focused portfolio centered on authentic coursework, active technical curiosity, 
            and hands-on software development.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Narrative Card */}
          <div className="about-narrative-card glass-card">
            <h3 className="narrative-heading">
              My Journey in Data Science
            </h3>
            <p className="narrative-text">
              I am currently pursuing a <strong>B.Sc. in Data Science at SDBI (Mumbai University)</strong>, 
              graduating in 2028. My learning journey combines rigorous data analysis, programming, 
              visualization, machine learning fundamentals, and backend software engineering.
            </p>
            <p className="narrative-text">
              I strongly believe that the most effective way to understand complex technical concepts 
              is by <em>learning by building</em>. This mindset has driven me to build practical projects 
              spanning data pipelines, REST APIs, AI-powered recommendation systems, web protection tools, 
              and threat intelligence correlators.
            </p>

            <div className="about-highlights-list">
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Student-driven approach: transparent learning, real repositories, and verifiable code.</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Focus on clean code, structured git commits, and clear documentation.</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Eager to collaborate on internships, open-source initiatives, and research projects.</span>
              </div>
            </div>

            {/* Quick Metadata chips */}
            <div className="about-meta-row">
              <div className="meta-badge">
                <GraduationCap size={16} />
                <span>B.Sc. Data Science (2025–2028)</span>
              </div>
              <div className="meta-badge">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </div>
              <div className="meta-badge">
                <Layers size={16} />
                <span>SDBI &bull; Mumbai University</span>
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div className="about-pillars-column">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card glass-card">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    {pillar.icon}
                  </div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                </div>
                <p className="pillar-desc">{pillar.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
