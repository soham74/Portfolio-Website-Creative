import React from 'react';
import { GroupBox, Button } from '../Win95Components';

const GitHubWindow = () => {
  const handleOpenGitHub = () => {
    window.open('https://github.com', '_blank');
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', textAlign: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        🐙 GitHub Profile
      </h3>
      
      <div style={{ 
        fontSize: 64, 
        marginBottom: 20
      }}>
        🐙
      </div>

      <GroupBox label="Repository Stats" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>🏗️ Public Repositories:</span>
            <span style={{ fontWeight: 'bold', color: '#000080' }}>25+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>⭐ Stars Earned:</span>
            <span style={{ fontWeight: 'bold', color: '#FFD700' }}>100+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🤝 Contributions:</span>
            <span style={{ fontWeight: 'bold', color: '#008000' }}>500+ commits</span>
          </div>
        </div>
      </GroupBox>

      <GroupBox label="Featured Technologies" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <p>💻 <strong>Languages:</strong> JavaScript, Python, TypeScript, Java</p>
          <p>⚛️ <strong>Frameworks:</strong> React, Node.js, Express, Django</p>
          <p>🗄️ <strong>Databases:</strong> MongoDB, PostgreSQL, MySQL</p>
          <p>☁️ <strong>Cloud:</strong> AWS, Docker, Kubernetes</p>
        </div>
      </GroupBox>

      <div style={{ marginTop: 20 }}>
        <Button onClick={handleOpenGitHub} style={{ fontSize: 14, padding: '8px 16px' }}>
          🔗 View GitHub Profile
        </Button>
      </div>

      <div style={{ 
        marginTop: 20, 
        padding: 12, 
        background: '#f0f0f0', 
        border: '1px inset #c0c0c0',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: 10, color: '#666' }}>
          💡 Check out my open-source contributions and latest projects!
        </p>
      </div>
    </div>
  );
};

export default GitHubWindow; 