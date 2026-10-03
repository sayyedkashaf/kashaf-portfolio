import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        
        {/* Left Column: Text & CTAs */}
        <div className="hero-content">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>B.Sc. Data Science Student &bull; SDBI Mumbai University</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Sayyed Kashaf</span>
          </h1>

          <p className="hero-headline">
            Building with Data, AI &amp; Modern Technology.
          </p>

          <p className="hero-description">
            I'm a B.Sc. Data Science student based in Mumbai, focused on turning data and 
            technology into practical, reliable solutions. I enjoy working with Python, SQL, 
            data visualization, AI tools, and backend engineering while continuously sharpening 
            my problem-solving skills through hands-on open-source projects.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary hero-btn">
              <span>View Practical Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary hero-btn">
              <Mail size={17} />
              <span>Contact Me</span>
            </a>
          </div>

          <div className="hero-socials">
            <span className="hero-socials-label">Connect:</span>
            <a
              href="https://github.com/sayyedkashaf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              title="GitHub Profile"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kashaf-sayyed-712635379"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Code & Profile Card */}
        <div className="hero-card-column">
          <div className="hero-terminal-card glass-card">
            {/* Terminal Window Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="terminal-title">
                <Terminal size={14} />
                <span>kashaf_profile.py</span>
              </div>
              <span className="terminal-lang">Python 3.12</span>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              <pre>
                <code>
                  <span className="token-keyword">class</span> <span className="token-class">DataScienceStudent</span>:{"\n"}
                  {"    "}<span className="token-keyword">def</span> <span className="token-function">__init__</span>(<span className="token-self">self</span>):{"\n"}
                  {"        "}<span className="token-self">self</span>.name = <span className="token-string">"Sayyed Kashaf"</span>{"\n"}
                  {"        "}<span className="token-self">self</span>.program = <span className="token-string">"B.Sc. Data Science"</span>{"\n"}
                  {"        "}<span className="token-self">self</span>.university = <span className="token-string">"SDBI / Mumbai Univ"</span>{"\n"}
                  {"        "}<span className="token-self">self</span>.graduation_year = <span className="token-number">2028</span>{"\n"}
                  {"        "}<span className="token-self">self</span>.interests = [&#10;
                  {"            "}<span className="token-string">"Data Analysis"</span>,&#10;
                  {"            "}<span className="token-string">"GenAI & Vector Search"</span>,&#10;
                  {"            "}<span className="token-string">"FastAPI Microservices"</span>,&#10;
                  {"            "}<span className="token-string">"Defensive Cybersecurity"</span>&#10;
                  {"        "}]{"\n\n"}
                  {"    "}<span className="token-keyword">def</span> <span className="token-function">current_philosophy</span>(<span className="token-self">self</span>):{"\n"}
                  {"        "}<span className="token-keyword">return</span> <span className="token-string">"Learn rigorously by building practical projects."</span>
                </code>
              </pre>
            </div>

            {/* Quick highlight bar */}
            <div className="terminal-footer">
              <div className="footer-metric">
                <Database size={15} className="metric-icon" />
                <span>Data &amp; SQL</span>
              </div>
              <div className="footer-metric">
                <Sparkles size={15} className="metric-icon" />
                <span>AI &amp; GenAI</span>
              </div>
              <div className="footer-metric">
                <ShieldCheck size={15} className="metric-icon" />
                <span>Cybersecurity</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
