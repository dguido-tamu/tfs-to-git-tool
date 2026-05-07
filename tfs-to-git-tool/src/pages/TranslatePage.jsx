import CommandTable from '../components/translate/CommandTable';
import MindsetCards from '../components/translate/MindsetCards';
import WorkflowComparison from '../components/translate/WorkflowComparison';
import styles from './TranslatePage.module.css';

export default function TranslatePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Translate TFS to Git</h1>
        <p>Use this guide to map your existing TFS knowledge directly to Git commands and concepts.</p>
      </header>
      
      <CommandTable />
      <MindsetCards />
      <WorkflowComparison />
    </div>
  );
}
