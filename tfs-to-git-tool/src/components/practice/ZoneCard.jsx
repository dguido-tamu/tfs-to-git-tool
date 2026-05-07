import styles from './ZoneCard.module.css';

export default function ZoneCard({ title, icon: Icon, accentColor, files, commits, emptyMessage, extraInfo }) {
  return (
    <div className={styles.card} style={{ '--accent-color': accentColor }}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <Icon size={18} className={styles.icon} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        {extraInfo && <span className={styles.extraInfo}>{extraInfo}</span>}
      </div>
      
      <div className={styles.content}>
        {files && files.length > 0 && (
          <ul className={styles.list}>
            {files.map((file, i) => (
              <li key={i} className={styles.fileItem}>
                <span className={styles.fileName}>{file.name || file.id}</span>
                <span className={`${styles.badge} ${styles[file.status ? file.status.toLowerCase() : '']}`}>
                  {file.status || 'Stashed'}
                </span>
              </li>
            ))}
          </ul>
        )}
        
        {commits && commits.length > 0 && (
          <ul className={styles.list}>
            {commits.map((commit, i) => (
              <li key={i} className={styles.commitItem}>
                <span className={styles.commitHash}>{commit.hash}</span>
                <span className={styles.commitMsg}>{commit.message}</span>
              </li>
            ))}
          </ul>
        )}

        {(!files || files.length === 0) && (!commits || commits.length === 0) && (
          <div className={styles.emptyState}>
            {emptyMessage || 'Empty'}
          </div>
        )}
      </div>
    </div>
  );
}
