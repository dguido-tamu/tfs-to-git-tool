import { useState } from 'react';
import styles from './WorkflowComparison.module.css';

const steps = [
  { tfs: 'Get Latest', git: 'git pull' },
  { tfs: 'Check Out file', git: '(just edit)' },
  { tfs: 'Edit code', git: 'Edit code' },
  { tfs: 'Check In', git: 'git add .' },
  { tfs: '(done)', git: 'git commit -m "..."' },
  { tfs: '(done)', git: 'git push' }
];

export default function WorkflowComparison() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(0); // Reset
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daily Workflow Comparison</h2>
        <button onClick={handleStep} className={styles.stepButton}>
          {currentStep < steps.length ? 'Step Through' : 'Reset'}
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>TFS</th>
              <th>Git</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, index) => {
              const isVisible = index < currentStep;
              const isActive = index === currentStep - 1;
              
              return (
                <tr 
                  key={index} 
                  className={`${styles.row} ${isVisible ? styles.visible : ''} ${isActive ? styles.active : ''}`}
                >
                  <td>{step.tfs}</td>
                  <td><code>{step.git}</code></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
