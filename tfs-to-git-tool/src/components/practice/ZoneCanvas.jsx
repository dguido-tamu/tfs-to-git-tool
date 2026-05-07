import { Folder, Inbox, Database, Archive, Cloud } from 'lucide-react';
import ZoneCard from './ZoneCard';
import styles from './ZoneCanvas.module.css';

export default function ZoneCanvas({ gitState, highlightZone }) {
  return (
    <div className={styles.canvas}>
      <div className={styles.topRow}>
        <div className={`${styles.zoneWrapper} ${highlightZone === 'workingDirectory' ? styles.highlighted : ''}`}>
          <ZoneCard 
            title="Working Directory" 
            icon={Folder} 
            accentColor="#707070" 
            files={gitState.workingDirectory}
            emptyMessage="No files tracked. Try running 'git init'"
          />
        </div>
        
        <div className={`${styles.zoneWrapper} ${highlightZone === 'stagingArea' ? styles.highlighted : ''}`}>
          <ZoneCard 
            title="Staging Area" 
            icon={Inbox} 
            accentColor="#d19900" 
            files={gitState.stagingArea}
            emptyMessage="Nothing staged. Use 'git add'"
          />
        </div>
        
        <div className={`${styles.zoneWrapper} ${highlightZone === 'localRepo' ? styles.highlighted : ''}`}>
          <ZoneCard 
            title="Local Repository" 
            icon={Database} 
            accentColor="#500000" 
            commits={gitState.localRepo.commits}
            emptyMessage="No commits yet. Use 'git commit'"
            extraInfo={`Branch: ${gitState.localRepo.currentBranch}`}
          />
        </div>
      </div>
      
      <div className={styles.bottomRow}>
        <div className={`${styles.zoneWrapper} ${highlightZone === 'stash' ? styles.highlighted : ''}`}>
          <ZoneCard 
            title="Stash" 
            icon={Archive} 
            accentColor="#d6d3c4" 
            files={gitState.stash}
            emptyMessage="Stash is empty"
          />
        </div>
        
        <div className={`${styles.zoneWrapper} ${highlightZone === 'remote' ? styles.highlighted : ''}`}>
          <ZoneCard 
            title="Remote (Origin)" 
            icon={Cloud} 
            accentColor="#006494" 
            commits={gitState.remote.commits}
            emptyMessage={gitState.remote.connected ? "No pushed commits" : "Not connected"}
            extraInfo={gitState.remote.connected ? (gitState.remote.aheadBy > 0 ? `${gitState.remote.aheadBy} ahead` : 'Synced') : null}
          />
        </div>
      </div>
    </div>
  );
}
