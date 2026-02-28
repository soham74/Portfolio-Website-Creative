import React, { useState, useEffect, useCallback } from 'react';
import './InstallWizard.css';

const STORAGE_KEY = 'sohamOS_installed';

const STATUS_MESSAGES = [
  'Copying files...',
  'Installing terminal...',
  'Loading research papers...',
  'Deploying AI models...',
  'Feeding desktop cat...',
  'Calibrating hackathon skills...',
  'Hiding easter eggs...',
  'Installation complete!',
];

const COMPONENTS = [
  { label: 'Core Portfolio Experience', note: 'Required' },
  { label: 'Terminal Emulator', note: 'Required' },
  { label: 'Games Collection', note: 'Required' },
  { label: 'Clippy Assistant', note: "You're welcome" },
  { label: 'Desktop Pet', note: 'Non-negotiable' },
  { label: 'Blog Posts', note: 'Actually good content' },
  { label: 'Easter Eggs', note: "Wouldn't you like to know" },
];

const EULA_TEXT = `END USER LICENSE AGREEMENT FOR SOHAM_OS v95.0

By proceeding, you agree to the following:

1. You acknowledge that Soham Kolhe is, in fact, pretty cool.
2. You will seriously consider hiring/collaborating with the developer.
3. You accept that any bugs encountered are actually features.
4. You will not hold the developer responsible for any sudden urges to learn Vim.
5. Any resemblance to actual operating systems, living or deprecated, is purely intentional.
6. The developer reserves the right to add more easter eggs without notice.
7. By clicking 'I Agree', you forfeit any right to say 'I could build this in a weekend.'
8. Time spent on this portfolio counts as productive work. Trust us.
9. Side effects may include: inspiration, career motivation, and spontaneous emailing.
10. This agreement is binding in all jurisdictions, including the metaverse.`;

const InstallWizard = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Show wizard on first visit
  useEffect(() => {
    const installed = localStorage.getItem(STORAGE_KEY);
    if (!installed) {
      setVisible(true);
    }
  }, []);

  // Listen for custom 'runSetupAgain' event
  useEffect(() => {
    const handler = () => {
      setStep(0);
      setEulaAccepted(false);
      setProgress(0);
      setStatusIndex(0);
      setVisible(true);
    };
    window.addEventListener('runSetupAgain', handler);
    return () => window.removeEventListener('runSetupAgain', handler);
  }, []);

  // Installation progress animation
  useEffect(() => {
    if (step !== 3) return;

    const totalDuration = 4000;
    const interval = 50;
    const increment = (100 / totalDuration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [step]);

  // Update status messages during installation
  useEffect(() => {
    if (step !== 3) return;

    const idx = Math.min(
      Math.floor(progress / (100 / STATUS_MESSAGES.length)),
      STATUS_MESSAGES.length - 1
    );
    setStatusIndex(idx);

    // Auto-advance when complete
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setStep(4);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, step]);

  const handleFinish = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }, []);

  const handleNext = useCallback(() => {
    if (step === 2) {
      // Reset progress before starting install
      setProgress(0);
      setStatusIndex(0);
    }
    setStep(prev => prev + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  if (!visible) return null;

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="install-wizard__step">
            <div className="install-wizard__step-body install-wizard__step-body--welcome">
              <div className="install-wizard__graphic" aria-hidden="true">
                <span role="img" aria-label="computer">&#128421;</span>
              </div>
              <div className="install-wizard__text">
                <h2 className="install-wizard__heading">Welcome to SohamOS 95 Setup</h2>
                <p>This wizard will install the SohamOS 95 experience on your browser.</p>
                <p className="install-wizard__subtext">Click Next to continue or Cancel to exit Setup.</p>
              </div>
            </div>
            <div className="install-wizard__buttons">
              <button className="install-wizard__btn" onClick={handleNext}>Next &gt;</button>
              <button className="install-wizard__btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="install-wizard__step">
            <div className="install-wizard__step-body">
              <h2 className="install-wizard__heading">License Agreement</h2>
              <p>Please read the following license agreement. Scroll down to see the full text.</p>
              <textarea
                className="install-wizard__eula"
                readOnly
                value={EULA_TEXT}
                rows={10}
              />
              <label className="install-wizard__checkbox-label">
                <input
                  type="checkbox"
                  checked={eulaAccepted}
                  onChange={(e) => setEulaAccepted(e.target.checked)}
                  className="install-wizard__checkbox"
                />
                I accept the terms of the License Agreement
              </label>
            </div>
            <div className="install-wizard__buttons">
              <button className="install-wizard__btn" onClick={handleBack}>&lt; Back</button>
              <button
                className="install-wizard__btn"
                onClick={handleNext}
                disabled={!eulaAccepted}
              >
                Next &gt;
              </button>
              <button className="install-wizard__btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="install-wizard__step">
            <div className="install-wizard__step-body">
              <h2 className="install-wizard__heading">Select Components</h2>
              <p>Select the components to install:</p>
              <div className="install-wizard__components">
                {COMPONENTS.map((comp, i) => (
                  <label key={i} className="install-wizard__checkbox-label install-wizard__checkbox-label--component">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="install-wizard__checkbox"
                    />
                    <span className="install-wizard__component-name">{comp.label}</span>
                    <span className="install-wizard__component-note">({comp.note})</span>
                  </label>
                ))}
              </div>
              <p className="install-wizard__space-info">Space required: 42 MB (nice)</p>
            </div>
            <div className="install-wizard__buttons">
              <button className="install-wizard__btn" onClick={handleBack}>&lt; Back</button>
              <button className="install-wizard__btn" onClick={handleNext}>Next &gt;</button>
              <button className="install-wizard__btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="install-wizard__step">
            <div className="install-wizard__step-body">
              <h2 className="install-wizard__heading">Installing SohamOS 95...</h2>
              <div className="install-wizard__progress-track">
                <div
                  className="install-wizard__progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="install-wizard__status">{STATUS_MESSAGES[statusIndex]}</p>
              <p className="install-wizard__percent">{Math.round(Math.min(progress, 100))}% complete</p>
            </div>
            <div className="install-wizard__buttons">
              <button className="install-wizard__btn" disabled>
                &lt; Back
              </button>
              <button className="install-wizard__btn" disabled>
                Next &gt;
              </button>
              <button className="install-wizard__btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="install-wizard__step">
            <div className="install-wizard__step-body install-wizard__step-body--complete">
              <div className="install-wizard__graphic" aria-hidden="true">
                <span role="img" aria-label="checkmark">&#9989;</span>
              </div>
              <div className="install-wizard__text">
                <h2 className="install-wizard__heading">SohamOS 95 Setup Complete!</h2>
                <p>The installation was successful. Your browser is now running SohamOS 95.</p>
                <p>Enjoy exploring the portfolio!</p>
              </div>
            </div>
            <div className="install-wizard__buttons">
              <button className="install-wizard__btn install-wizard__btn--finish" onClick={handleFinish}>
                Finish
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="install-wizard__overlay">
      <div className="install-wizard__dialog">
        <div className="install-wizard__titlebar">
          <span className="install-wizard__titlebar-text">SohamOS 95 Setup</span>
        </div>
        <div className="install-wizard__content">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default InstallWizard;
