import React from 'react';
import { currentFocusList } from '../data/skills';
import { TrendingUp, Terminal, Database, BarChart, Cpu, Server, ShieldAlert, Sparkles } from 'lucide-react';

export default function CurrentFocus() {
  const getIcon = (tag) => {
    switch (tag) {
      case 'Core Foundation':
        return <Database size={20} />;
      case 'Analytics':
        return <TrendingUp size={20} />;
      case 'ML':
        return <Cpu size={20} />;
      case 'Generative AI':
        return <Sparkles size={20} />;
      case 'BI & Reporting':
        return <BarChart size={20} />;
      case 'Backend':
        return <Server size={20} />;
      case 'Security':
        return <ShieldAlert size={20} />;
      default:
        return <Terminal size={20} />;
    }
  };

  return (
    <section id="focus" className="section focus-section">
      <div className="container">

        <div className="section-header" data-reveal>
          <div className="section-tag">
            <span>02 // Continuous Growth</span>
          </div>
          <h2 className="section-title">
            Current <span className="gradient-text">Learning Focus</span>
          </h2>
          <p className="section-subtitle">
            Curated active areas of study and experimentation. Transparently tracking foundational
            milestones rather than asserting unearned senior claims.
          </p>
        </div>

        <div className="focus-grid">
          {currentFocusList.map((item, index) => (
            <div key={index} className="focus-card glass-card" data-reveal style={{ '--rd': `${(index % 3) * 110}ms` }}>
              <div className="focus-top">
                <div className="focus-icon-wrapper">
                  {getIcon(item.tag)}
                </div>
                <span className="focus-tag-chip">{item.tag}</span>
              </div>
              <h3 className="focus-title">{item.title}</h3>
              <p className="focus-description">{item.description}</p>
              <div className="focus-status">
                <span className="pulse-indicator"></span>
                <span>Active Learning &bull; 2025</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}