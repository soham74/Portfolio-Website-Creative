import React from 'react';
import { GroupBox } from '../Win95Components';

const AboutWindow = () => {
  return (
    <div style={{ height: '100%', overflow: 'auto', textAlign: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        👤 About Me
      </h3>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginBottom: 20 
      }}>
        <div style={{
          width: 80,
          height: 80,
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          marginBottom: 12,
          border: '2px inset #c0c0c0'
        }}>
          👨‍💻
        </div>
        <h2 style={{ margin: 0, color: '#000080' }}>John Doe</h2>
        <p style={{ margin: '4px 0', fontStyle: 'italic' }}>Full Stack Developer</p>
      </div>

      <GroupBox label="Personal Information" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8 }}>
          <p><strong>📍 Location:</strong> San Francisco, CA</p>
          <p><strong>🎓 Education:</strong> B.S. Computer Science</p>
          <p><strong>💼 Experience:</strong> 5+ years in web development</p>
          <p><strong>🌐 Languages:</strong> English (Native), Spanish (Conversational)</p>
        </div>
      </GroupBox>

      <GroupBox label="About" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8, lineHeight: 1.4 }}>
          <p>
            Welcome to my retro portfolio! I'm a passionate full-stack developer with a love 
            for creating innovative web applications. My journey in tech started with a 
            fascination for how things work behind the scenes, and it has evolved into a 
            career focused on building user-friendly, scalable solutions.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or enjoying the great outdoors. I believe in continuous 
            learning and staying up-to-date with the latest industry trends.
          </p>
        </div>
      </GroupBox>

      <GroupBox label="Fun Facts" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8 }}>
          <p>🎮 Huge fan of retro games (hence this Windows 95 theme!)</p>
          <p>☕ Coffee enthusiast - I can debug better with good coffee</p>
          <p>🏔️ Love hiking and photography in my spare time</p>
          <p>🎵 Play guitar and enjoy making music</p>
          <p>📚 Always reading tech blogs and experimenting with new frameworks</p>
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
          🚀 Ready to work together? Let's build something amazing!
        </p>
      </div>
    </div>
  );
};

export default AboutWindow; 