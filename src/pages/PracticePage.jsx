import { useEffect, useState } from 'react';
import ZoneCanvas from '../components/practice/ZoneCanvas';
import Terminal from '../components/practice/Terminal';
import TutorialRail from '../components/practice/TutorialRail';
import AlertBanner from '../components/practice/AlertBanner';
import { useGitState } from '../hooks/useGitState';
import styles from './PracticePage.module.css';

export default function PracticePage() {
  const { state, dispatch } = useGitState();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightZone, setHighlightZone] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    dispatch({ type: 'INIT' });
  }, [dispatch]);

  const handleAlert = (alert) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [...prev, { ...alert, id }]);
  };

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className={styles.page}>
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />
      
      <header className={styles.header}>
        <h1>Practice Sandbox</h1>
        <p>Safely experiment with Git. Watch how commands affect the five core zones.</p>
      </header>
      
      <div className={styles.layout}>
        <TutorialRail 
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
          gitState={state}
          setHighlightZone={setHighlightZone}
        />
        
        <div className={styles.mainContent}>
          <div className={styles.zoneScroller}>
            <ZoneCanvas gitState={state} highlightZone={highlightZone} />
          </div>
          <Terminal onDispatch={dispatch} onAlert={handleAlert} gitState={state} />
        </div>
      </div>
    </div>
  );
}
