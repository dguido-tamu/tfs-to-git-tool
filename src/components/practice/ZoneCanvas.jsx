import { Folder, Inbox, Database, Archive, Cloud } from 'lucide-react';
import ZoneCard from './ZoneCard';
import styles from './ZoneCanvas.module.css';

export default function ZoneCanvas({ gitState, highlightZone }) {
  const currentBranch = gitState.localRepo.currentBranch;
  const localCommits = gitState.localRepo.commits.filter(c => c.branch === currentBranch);
  const remoteCommits = gitState.remote.commits.filter(c => c.branch === currentBranch);
  const remoteAhead = localCommits.length - remoteCommits.length;

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
            commits={localCommits}
            emptyMessage={`No commits on '${currentBranch}' yet. Use 'git commit'`}
            extraInfo={`Branch: ${currentBranch}`}
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
            commits={remoteCommits}
            emptyMessage={gitState.remote.connected ? `No pushed commits on '${currentBranch}'` : "Not connected"}
            extraInfo={gitState.remote.connected ? (remoteAhead > 0 ? `${remoteAhead} ahead` : 'Synced') : null}
          />
        </div>
      </div>
    </div>
  );
}
