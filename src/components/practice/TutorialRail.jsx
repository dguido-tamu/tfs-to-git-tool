import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import tutorialSteps from '../../data/tutorialSteps';
import styles from './TutorialRail.module.css';

export default function TutorialRail({ currentStepIndex, setCurrentStepIndex, gitState, setHighlightZone }) {
  const [showHint, setShowHint] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const step = tutorialSteps[currentStepIndex];
  const lastEvaluatedStepRef = useRef(currentStepIndex);
  const isCompleteRef = useRef(false);

  // Evaluate success condition safely
  useEffect(() => {
    try {
      // Use new Function instead of eval to avoid bundler warnings
      const evaluateCondition = new Function('return ' + step.successCondition)();
      const currentlySuccess = evaluateCondition(gitState);
      
      // If we just navigated to a new step manually, reset tracking and don't auto-advance
      if (lastEvaluatedStepRef.current !== currentStepIndex) {
        lastEvaluatedStepRef.current = currentStepIndex;
        isCompleteRef.current = currentlySuccess;
        return;
      }

      // If we are on the same step, and the user's action just made it complete
      if (currentlySuccess && !isCompleteRef.current && currentStepIndex < tutorialSteps.length - 1) {
        isCompleteRef.current = true;
        const timer = setTimeout(() => {
          handleNext();
        }, 1500); // give them 1.5s to see the success
        return () => clearTimeout(timer);
      }
      
      isCompleteRef.current = currentlySuccess;
    } catch (e) {
      console.error('Failed to evaluate success condition:', e);
    }
  }, [gitState, currentStepIndex, step]);

  useEffect(() => {
    setHighlightZone(step.highlightZone);
  }, [step, setHighlightZone]);

  const handleNext = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setShowHint(false);
    }
  };

  return (
    <>
      <button 
        className={styles.mobileToggle} 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Tutorial"
      >
        {isMobileOpen ? <ChevronLeft /> : <ChevronRight />}
        <span>Tutorial</span>
      </button>

      {isMobileOpen && <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />}

      <aside className={`${styles.rail} ${isMobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.progressText}>
            Lesson {currentStepIndex + 1} of {tutorialSteps.length}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentStepIndex + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{step.title}</h2>
          <div className={styles.tfsBadge}>TFS: {step.tfsEquivalent}</div>
          
          <p className={styles.description}>{step.description}</p>
          
          <div className={styles.tipBox}>
            <Lightbulb size={16} className={styles.tipIcon} />
            <p>{step.tip}</p>
          </div>

          <div className={styles.hintSection}>
            {showHint ? (
              <div className={styles.commandHint}>
                <span>Type this:</span>
                <code>{step.command}</code>
              </div>
            ) : (
              <button onClick={() => setShowHint(true)} className={styles.hintBtn}>
                Show Hint
              </button>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button 
            onClick={handlePrev} 
            disabled={currentStepIndex === 0}
            className={styles.navBtn}
          >
            <ChevronLeft size={20} /> Prev
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentStepIndex === tutorialSteps.length - 1}
            className={styles.navBtn}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </aside>
    </>
  );
}
