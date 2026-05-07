import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>Texas A&M Technology Services</div>
          <p className={styles.tagline}>Git Shift</p>
        </div>
        
        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4>Resources</h4>
            <a href="https://docs.cloud.tamu.edu/github/index.html" target="_blank" rel="noopener noreferrer">
              TAMU GitHub Documentation
            </a>
            <a href="https://uidaholib.github.io/get-git/3workflow.html" target="_blank" rel="noopener noreferrer">
              Git Workflow Tutorial
            </a>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Internal Links</h4>
            <a href="https://www.it.tamu.edu/index.html" target="_blank" rel="noopener noreferrer">
              Texas A&M Technology Services
            </a>
            <a href="https://tamucs.sharepoint.com/sites/EASGitHubGovernance" target="_blank" rel="noopener noreferrer">
              EAS GitHub Governance
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {year} Texas A&M University Technology Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
