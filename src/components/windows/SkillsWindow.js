import React from 'react';
import { GroupBox } from '../Win95Components';
import './SkillsWindow.css';

const SkillsWindow = () => {
  const skillCategories = [
    {
      category: 'Languages',
      skills: [
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'Java' },
        { name: 'C++' },
        { name: 'SQL' },
      ]
    },
    {
      category: 'AI / Machine Learning',
      skills: [
        { name: 'PyTorch' },
        { name: 'TensorFlow' },
        { name: 'scikit-learn' },
        { name: 'XGBoost' },
        { name: 'BERT / Transformers' },
        { name: 'ONNX Runtime' },
        { name: 'RAG Pipelines' },
        { name: 'LLMs' },
      ]
    },
    {
      category: 'Frameworks & Tools',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'FastAPI' },
        { name: 'Spring Boot' },
        { name: 'Node.js' },
        { name: 'spaCy' },
      ]
    },
    {
      category: 'Infrastructure & DevOps',
      skills: [
        { name: 'Docker' },
        { name: 'PostgreSQL' },
        { name: 'Git' },
        { name: 'AWS' },
        { name: 'GCP' },
        { name: 'Figma' },
      ]
    }
  ];

  return (
    <div className="skills-window">
      <h3 className="skills-title">Technical Skills</h3>

      {skillCategories.map((category, index) => (
        <GroupBox key={index} label={category.category} className="skill-category">
          <ul className="skill-list">
            {category.skills.map((skill, i) => (
              <li key={i} className="skill-item">
                <span className="skill-check">&#10004;</span>
                <span className="skill-name">{skill.name}</span>
              </li>
            ))}
          </ul>
        </GroupBox>
      ))}

      <GroupBox label="Awards & Competitions" className="skill-category">
        <ul className="skill-list">
          <li className="skill-item">
            <span className="skill-check">&#9733;</span>
            <span className="skill-name">1st Place -- MadData Hackathon (Qualcomm Track)</span>
          </li>
          <li className="skill-item">
            <span className="skill-check">&#9733;</span>
            <span className="skill-name">Best AI/ML Hack -- CalHacks (3,000+ participants)</span>
          </li>
          <li className="skill-item">
            <span className="skill-check">&#9733;</span>
            <span className="skill-name">1st Place -- US Cyber Challenge</span>
          </li>
          <li className="skill-item">
            <span className="skill-check">&#9733;</span>
            <span className="skill-name">1st Place -- CMU picoCTF</span>
          </li>
          <li className="skill-item">
            <span className="skill-check">&#9733;</span>
            <span className="skill-name">Top 3% -- USA Astronomy & Astrophysics Olympiad</span>
          </li>
        </ul>
      </GroupBox>
    </div>
  );
};

export default SkillsWindow;
