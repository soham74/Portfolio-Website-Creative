import React, { useState } from 'react';
import { GroupBox, Button, TextInput } from '../Win95Components';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { label: 'Email', value: 'sohamkolhe26@gmail.com', link: 'mailto:sohamkolhe26@gmail.com' },
    { label: 'LinkedIn', value: '/in/soham-kolhe', link: 'https://www.linkedin.com/in/soham-kolhe/' },
    { label: 'GitHub', value: '@soham74', link: 'https://github.com/soham74' }
  ];

  const handleContactClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#000080' }}>
        Contact Information
      </h3>
      
      <GroupBox label="Get In Touch" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          <p style={{ lineHeight: 1.4, marginBottom: 12 }}>
            I'm always interested in hearing about new opportunities, collaborations, 
            or just having a chat about technology! Feel free to reach out through any 
            of the following channels:
          </p>
          
          {contactInfo.map((contact, index) => (
            <div 
              key={index}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 8,
                padding: 4,
                cursor: 'pointer',
                border: '1px solid transparent'
              }}
              onClick={() => handleContactClick(contact.link)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
                e.target.style.border = '1px inset #c0c0c0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.border = '1px solid transparent';
              }}
            >
              <span style={{ fontWeight: 'bold', minWidth: 60, marginRight: 8 }}>
                {contact.label}:
              </span>
              <span style={{ color: '#000080', textDecoration: 'underline' }}>
                {contact.value}
              </span>
            </div>
          ))}
        </div>
      </GroupBox>

      <GroupBox label="Send a Message" style={{ marginBottom: 16 }}>
        <div style={{ padding: 8 }}>
          {isSubmitted ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 20,
              background: '#f0f0f0',
              border: '1px inset #c0c0c0'
            }}>
              <p style={{ margin: 0, color: '#008000', fontWeight: 'bold' }}>
                Message sent successfully!
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: 10, color: '#666' }}>
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                  Name:
                </label>
                <TextInput
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your name"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                  Email:
                </label>
                <TextInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                  Message:
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your project or just say hello!"
                  rows={4}
                  style={{ 
                    width: '100%', 
                    resize: 'vertical',
                    fontFamily: 'MS Sans Serif',
                    fontSize: '11px',
                    border: '1px inset #c0c0c0',
                    padding: '4px'
                  }}
                  required
                />
              </div>
              
              <Button type="submit" style={{ width: '100%' }}>
                Send Message
              </Button>
            </form>
          )}
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
          I typically respond within 24 hours during business days
        </p>
      </div>
    </div>
  );
};

export default ContactWindow; 