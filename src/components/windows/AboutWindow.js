import React from 'react';
import { GroupBox } from '../Win95Components';
import './AboutWindow.css';

const AboutWindow = () => {
  return (
    <div className="about-window" style={{ textAlign: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        👤 About Me
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(45deg, #4ecdc4, #1e90ff)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            marginBottom: 12,
            border: '2px inset #c0c0c0',
          }}
        >
          👨‍💻
        </div>
        <h2 style={{ margin: 0, color: '#000080' }}>Soham Kolhe</h2>
        <p style={{ margin: '4px 0', fontStyle: 'italic' }}>
          Undergraduate • Computer Science & Mathematics
        </p>
      </div>

      <GroupBox label="Details" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8 }}>
          <p>
            <strong>📍 Location:</strong> Madison, Wisconsin
          </p>
          <p>
            <strong>🎓 Education:</strong> University of Wisconsin–Madison, BS in Computer
            Science and Mathematics (Aug 2025 – May 2028) • GPA 4.0/4.0
          </p>
          <p>
            <strong>🔗 Portfolio:</strong> soham-kolhe-portfolio.vercel.app
          </p>
          <p>
            <strong>✉️ Contact:</strong> sohamkolhe@outlook.com • 425-444-6321
          </p>
        </div>
      </GroupBox>

      <GroupBox label="Summary" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8, lineHeight: 1.4 }}>
          <p>
            I am an undergraduate focused on software systems, artificial
            intelligence, and applied algorithms. I enjoy building tools that are
            both intentional and practical—balancing performance, clarity, and
            reliability. My experience spans teaching, product prototyping, and
            independent research-style projects.
          </p>
        </div>
      </GroupBox>

      <GroupBox label="Highlights" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ padding: 8 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li>Instructor experience teaching Python, Java, Swift, and robotics</li>
            <li>Full‑stack development with React, Next.js, and Firebase</li>
            <li>Applied ML: sentiment analysis, search, and user modeling</li>
            <li>Competitive security background (USCC 2nd, picoCTF Top 25)</li>
          </ul>
        </div>
      </GroupBox>

      <div
        style={{
          marginTop: 20,
          padding: 12,
          background: '#f0f0f0',
          border: '1px inset #c0c0c0',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: 10, color: '#666' }}>
          🚀 Always open to building ambitious, well-crafted systems.
        </p>
      </div>
    </div>
  );
};

export default AboutWindow;