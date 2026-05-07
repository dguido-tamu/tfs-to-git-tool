import styles from './MindsetCards.module.css';

export default function MindsetCards() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Essential Mindset Shifts</h2>
      <div className={styles.cardList}>
        <details className={styles.card}>
          <summary className={styles.summary}>The Local Repository</summary>
          <div className={styles.content}>
            <div className={styles.columns}>
              <div className={styles.column}>
                <h4>TFS World</h4>
                <p>Your workspace is just a pointer to the server. You need a connection to see history or branch.</p>
              </div>
              <div className={styles.column}>
                <h4>Git World</h4>
                <p>You have the entire repository locally. You can commit, branch, and view history offline.</p>
              </div>
            </div>
            <div className={styles.codeBlock}>
              <code>git init # Creates full repo in .git/</code>
            </div>
          </div>
        </details>

        <details className={styles.card}>
          <summary className={styles.summary}>Commit ≠ Check In</summary>
          <div className={styles.content}>
            <div className={styles.columns}>
              <div className={styles.column}>
                <h4>TFS World</h4>
                <p>Check In immediately shares your code with the entire team.</p>
              </div>
              <div className={styles.column}>
                <h4>Git World</h4>
                <p>A Commit only saves locally. You must Push to share.</p>
              </div>
            </div>
            <div className={styles.codeBlock}>
              <code>git commit -m "Local save"<br/>git push # Now it's shared</code>
            </div>
          </div>
        </details>

        <details className={styles.card}>
          <summary className={styles.summary}>No File Locking</summary>
          <div className={styles.content}>
            <div className={styles.columns}>
              <div className={styles.column}>
                <h4>TFS World</h4>
                <p>You "Check Out" a file to lock it so others can't edit it.</p>
              </div>
              <div className={styles.column}>
                <h4>Git World</h4>
                <p>Optimistic concurrency. Everyone edits freely; conflicts are merged later.</p>
              </div>
            </div>
            <div className={styles.codeBlock}>
              <code>(just open the file and start typing)</code>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
