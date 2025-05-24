import React from 'react';
import { GroupBox, Button } from '../Win95Components';

const LinkedInWindow = () => {
  const handleOpenLinkedIn = () => {
    window.open('https://linkedin.com/in/yourprofile', '_blank');
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', textAlign: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        💼 LinkedIn Profile
      </h3>
      
      <div style={{ 
        fontSize: 64, 
        marginBottom: 20,
        color: '#0077B5'
      }}>
        💼
      </div>

      <GroupBox label="Professional Network" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>🤝 Connections:</span>
            <span style={{ fontWeight: 'bold', color: '#0077B5' }}>500+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>📝 Recommendations:</span>
            <span style={{ fontWeight: 'bold', color: '#008000' }}>15+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🏆 Endorsements:</span>
            <span style={{ fontWeight: 'bold', color: '#FFD700' }}>100+</span>
          </div>
        </div>
      </GroupBox>

      <GroupBox label="Professional Summary" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8, textAlign: 'left' }}>
          <p style={{ lineHeight: 1.4, margin: '8px 0' }}>
            🚀 <strong>Full Stack Developer</strong> with 5+ years of experience
          </p>
          <p style={{ lineHeight: 1.4, margin: '8px 0' }}>
            💡 Passionate about creating innovative web solutions
          </p>
          <p style={{ lineHeight: 1.4, margin: '8px 0' }}>
            🎯 Specialized in React, Node.js, and cloud technologies
          </p>
          <p style={{ lineHeight: 1.4, margin: '8px 0' }}>
            📈 Proven track record of delivering scalable applications
          </p>
        </div>
      </GroupBox>

      <div style={{ marginTop: 20 }}>
        <Button onClick={handleOpenLinkedIn} style={{ fontSize: 14, padding: '8px 16px' }}>
          🔗 View LinkedIn Profile
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
          💼 Let's connect and explore opportunities together!
        </p>
      </div>
    </div>
  );
};

export default LinkedInWindow; 