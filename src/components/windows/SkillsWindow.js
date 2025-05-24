import React from 'react';
import { GroupBox } from '../Win95Components';

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

  const getSkillColor = (level) => {
    if (level >= 90) return '#00ff00';
    if (level >= 80) return '#ffff00';
    if (level >= 70) return '#ff8000';
    return '#ff0000';
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        🛠️ Technical Skills
      </h3>
      
      {skillCategories.map((category, categoryIndex) => (
        <GroupBox 
          key={categoryIndex}
          label={category.category}
          style={{ marginBottom: 16, padding: 8 }}
        >
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} style={{ marginBottom: 12 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 4 
              }}>
                <span style={{ fontWeight: 'bold', fontSize: 11 }}>
                  {skill.name}
                </span>
                <span style={{ fontSize: 10, color: '#666' }}>
                  {skill.years} • {skill.level}%
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: 16,
                background: '#c0c0c0',
                border: '1px inset #c0c0c0',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: getSkillColor(skill.level),
                    transition: 'width 0.3s ease-in-out',
                    border: '1px outset #c0c0c0'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 'bold',
                    color: skill.level > 50 ? 'black' : 'white',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                  }}
                >
                  {skill.level}%
                </div>
              </div>
            </div>
          ))}
        </GroupBox>
      ))}

      <GroupBox label="Certifications & Learning" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <p>🏆 <strong>AWS Certified Solutions Architect</strong> (In Progress)</p>
          <p>📜 <strong>React Developer Certification</strong> - Meta (2023)</p>
          <p>🎓 <strong>Full Stack Web Development</strong> - freeCodeCamp (2022)</p>
          <p>📚 Currently learning: <strong>Rust, Web Assembly, and Machine Learning</strong></p>
        </div>
      </GroupBox>

      <div style={{ 
        marginTop: 20, 
        padding: 12, 
        background: '#f0f0f0', 
        border: '1px inset #c0c0c0',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: 10, color: '#666' }}>
          💡 Skill levels are based on professional experience and project complexity
        </p>
        <div style={{ marginTop: 8, fontSize: 10 }}>
          <span style={{ color: '#00ff00' }}>■</span> Expert (90%+) 
          <span style={{ margin: '0 8px', color: '#ffff00' }}>■</span> Advanced (80-89%) 
          <span style={{ margin: '0 8px', color: '#ff8000' }}>■</span> Intermediate (70-79%) 
          <span style={{ margin: '0 8px', color: '#ff0000' }}>■</span> Beginner (&lt;70%)
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow; 