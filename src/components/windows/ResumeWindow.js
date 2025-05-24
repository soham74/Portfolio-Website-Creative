import React from 'react';
import { GroupBox, Button } from '../Win95Components';

const ResumeWindow = () => {
  const handleDownload = () => {
    // In a real app, this would download the actual resume PDF
    alert('Resume download would start here!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, color: '#000080' }}>
          📄 Resume
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm" onClick={handleDownload}>
            💾 Download PDF
          </Button>
          <Button size="sm" onClick={handlePrint}>
            🖨️ Print
          </Button>
        </div>
      </div>

      <GroupBox label="Personal Information" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <h2 style={{ margin: '0 0 8px 0', color: '#000080' }}>John Doe</h2>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Full Stack Developer</p>
          <p style={{ margin: '4px 0' }}>📧 john.doe@email.com | 📱 (555) 123-4567</p>
          <p style={{ margin: '4px 0' }}>📍 San Francisco, CA | 🔗 linkedin.com/in/johndoe</p>
        </div>
      </GroupBox>

      <GroupBox label="Professional Summary" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8, lineHeight: 1.4 }}>
          <p>
            Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications 
            using modern technologies. Proven track record of delivering high-quality solutions in fast-paced 
            environments. Strong background in React, Node.js, and cloud technologies with a passion for 
            creating user-centric applications.
          </p>
        </div>
      </GroupBox>

      <GroupBox label="Work Experience" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 4px 0', color: '#000080' }}>Senior Full Stack Developer</h4>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>TechCorp Inc. | 2021 - Present</p>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Led development of microservices architecture serving 100k+ daily users</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Built responsive React applications with 99.9% uptime</li>
            </ul>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 4px 0', color: '#000080' }}>Full Stack Developer</h4>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>StartupXYZ | 2019 - 2021</p>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Developed RESTful APIs using Node.js and Express</li>
              <li>Created dynamic user interfaces with React and Redux</li>
              <li>Optimized database queries improving performance by 40%</li>
              <li>Collaborated with design team to implement pixel-perfect UIs</li>
            </ul>
          </div>

          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#000080' }}>Junior Web Developer</h4>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>WebSolutions LLC | 2018 - 2019</p>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>Built responsive websites using HTML5, CSS3, and JavaScript</li>
              <li>Maintained and updated existing web applications</li>
              <li>Participated in agile development processes</li>
            </ul>
          </div>
        </div>
      </GroupBox>

      <GroupBox label="Education" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <h4 style={{ margin: '0 0 4px 0', color: '#000080' }}>Bachelor of Science in Computer Science</h4>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>University of California, Berkeley | 2014 - 2018</p>
          <p style={{ margin: '4px 0' }}>GPA: 3.8/4.0 | Dean's List: Fall 2016, Spring 2017</p>
          <p style={{ margin: '4px 0' }}>Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development</p>
        </div>
      </GroupBox>

      <GroupBox label="Key Skills" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div>
              <h5 style={{ margin: '0 0 8px 0', color: '#000080' }}>Frontend</h5>
              <p style={{ margin: 0, fontSize: 10 }}>React, Redux, JavaScript, TypeScript, HTML5, CSS3, Vue.js</p>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0', color: '#000080' }}>Backend</h5>
              <p style={{ margin: 0, fontSize: 10 }}>Node.js, Express, Python, Django, REST APIs, GraphQL</p>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0', color: '#000080' }}>Database</h5>
              <p style={{ margin: 0, fontSize: 10 }}>MongoDB, PostgreSQL, MySQL, Redis</p>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0', color: '#000080' }}>Tools & Cloud</h5>
              <p style={{ margin: 0, fontSize: 10 }}>AWS, Docker, Git, Jenkins, Webpack, Jest</p>
            </div>
          </div>
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
          📄 This resume is also available as a downloadable PDF
        </p>
      </div>
    </div>
  );
};

export default ResumeWindow; 