import React from 'react';
import { skillGroups } from '../data/skills';

export default function SkillTicker() {
  const items = [...new Set(skillGroups.flatMap(group => group.skills.map(s => s.name)))];

  const renderRow = key => (
    <div className="ticker-row" key={key} aria-hidden={key === 'b'}>
      {items.map((name, idx) => (
        <span key={`${key}-${idx}`} className={`tech-pill ${idx % 4 === 0 ? 'highlight' : ''}`}>
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="skill-ticker" aria-label="Technology stack ticker">
      <div className="ticker-track">
        {renderRow('a')}
        {renderRow('b')}
      </div>
    </div>
  );
}
