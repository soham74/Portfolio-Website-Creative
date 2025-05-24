import React from 'react';
import './ProjectsWindow.css';

const ProjectsWindow = () => {
  const handleLinkClick = (url) => {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="text-editor-container">
      <div className="text-body-container">
        <div className="text-editor-inner">
          <div className="text-container">
            <h1 className="project-title">Battle.us</h1>
            <p className="project-body">
              I am currently developing a multiplayer country guessing game Angular, Tailwind, 
              Node.js, Express.js, and AWS along with libraries such as D3.js, three.js, and 
              socket.io. Geospatial data was utilized to map countries onto the sphere. (Link: {` `}
              <a 
                href="https://www.battle.us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                www.battle.us
              </a>)
            </p>
            
            <hr className="text-editor-hr"/>

            <h1 className="project-title">Driver Sleep Prevention Device</h1>
            <p className="project-body">
              Collaborated with a partner to create an aftermarket sleep detection and prevention 
              system using OpenCV and dlib in Python. We competed in multiple invention competitions 
              and worked with a startup accelerator to further develop the product.
            </p>
            
            <hr className="text-editor-hr"/>
            
            <h1 className="project-title">PDF Reader</h1>
            <p className="project-body">
              Developed a website to automatically process the contents of a PDF using Optical 
              Character Recognition as opposed to the typical data extraction methods that are 
              typically much less reliable.
              <br/><br/>
              Built with Angular and Django and made use of the py-tesseract and OpenCV libraries 
              for OCR functionality.
            </p>
            
            <hr className="text-editor-hr"/>
            
            <h1 className="project-title">Pokedex Dashboard</h1>
            <p className="project-body">
              Created a fully interactive pokemon dashboard to filter and lookup pokemon. This was 
              used at my previous company as a skill assessment for new hires. The images of each 
              pokemon were web scraped using a python script and the beautiful soup library.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow; 