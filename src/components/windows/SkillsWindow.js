import React from 'react';
import { GroupBox } from '../Win95Components';
import './SkillsWindow.css';

const SkillsWindow = () => {
  const skillCategories = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React/Redux', level: 90, years: '4 years' },
        { name: 'JavaScript/ES6+', level: 95, years: '5 years' },
        { name: 'HTML5/CSS3', level: 95, years: '6 years' },
        { name: 'TypeScript', level: 85, years: '3 years' },
        { name: 'Vue.js', level: 75, years: '2 years' }
      ]
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'Node.js/Express', level: 88, years: '4 years' },
        { name: 'Python/Django', level: 82, years: '3 years' },
        { name: 'REST APIs', level: 90, years: '4 years' },
        { name: 'GraphQL', level: 70, years: '2 years' },
        { name: 'Microservices', level: 75, years: '2 years' }
      ]
    },
    {
      category: 'Database & Cloud',
      skills: [
        { name: 'MongoDB', level: 85, years: '3 years' },
        { name: 'PostgreSQL', level: 80, years: '3 years' },
        { name: 'AWS Services', level: 78, years: '2 years' },
        { name: 'Docker', level: 82, years: '2 years' },
        { name: 'Redis', level: 70, years: '1 year' }
      ]
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 92, years: '5 years' },
        { name: 'Webpack/Vite', level: 80, years: '3 years' },
        { name: 'Jest/Testing', level: 85, years: '3 years' },
        { name: 'CI/CD', level: 75, years: '2 years' },
        { name: 'Agile/Scrum', level: 88, years: '4 years' }
      ]
    }
  ];

  // No visual meters — just clean lists

  return (
    <div className="skills-window">
      <h3 className="skills-title">🛠️ Technical Skills</h3>

      {skillCategories.map((category, index) => (
        <GroupBox key={index} label={category.category} className="skill-category">
          <ul className="skill-list">
            {category.skills.map((skill, i) => (
              <li key={i} className="skill-item">
                <span className="skill-check">✔</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-years" aria-label="years of experience">{skill.years}</span>
              </li>
            ))}
          </ul>
        </GroupBox>
      ))}

      <GroupBox label="Currently Learning" className="skill-category">
        <div className="learning-tags">
          <span className="tag">Rust</span>
          <span className="tag">WebAssembly</span>
          <span className="tag">Machine Learning</span>
        </div>
      </GroupBox>
    </div>
  );
};

export default SkillsWindow; 