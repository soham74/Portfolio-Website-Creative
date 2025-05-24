import React from 'react';
import './Win95Components.css';

export const Button = ({ children, onClick, className = '', size = 'normal', active = false, disabled = false, ...props }) => {
  const sizeClass = size === 'sm' ? 'win95-button-sm' : '';
  const activeClass = active ? 'win95-button-active' : '';
  const disabledClass = disabled ? 'win95-button-disabled' : '';
  
  return (
    <button
      className={`win95-button ${sizeClass} ${activeClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const Window = ({ children, className = '', ...props }) => {
  return (
    <div className={`win95-window ${className}`} {...props}>
      {children}
    </div>
  );
};

export const WindowHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`win95-window-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const WindowContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`win95-window-content ${className}`} {...props}>
      {children}
    </div>
  );
};

export const GroupBox = ({ label, children, className = '', ...props }) => {
  return (
    <div className={`win95-groupbox ${className}`} {...props}>
      <fieldset className="win95-fieldset">
        <legend className="win95-legend">{label}</legend>
        {children}
      </fieldset>
    </div>
  );
};

export const TextInput = ({ className = '', ...props }) => {
  return (
    <input
      className={`win95-text-input ${className}`}
      {...props}
    />
  );
};

export const List = ({ children, className = '', ...props }) => {
  return (
    <ul className={`win95-list ${className}`} {...props}>
      {children}
    </ul>
  );
};

export const ListItem = ({ children, onClick, className = '', ...props }) => {
  return (
    <li 
      className={`win95-list-item ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </li>
  );
};

export const Separator = ({ className = '', ...props }) => {
  return (
    <hr className={`win95-separator ${className}`} {...props} />
  );
}; 