import { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import styles from './Terminal.module.css';

export default function Terminal({ onDispatch, onAlert, gitState }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputLines, setOutputLines] = useState([{ type: 'system', text: 'TFS to Git Sandbox Terminal. Try typing "git init"' }]);
  const [tfsContext, setTfsContext] = useState('');
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { parseCommand } = useTerminal();

  const handleFocus = () => inputRef.current?.focus();

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = input.trim();
    if (!val) return;

    if (!val.startsWith('git ')) {
      val = 'git ' + val;
    }

    const newLines = [...outputLines, { type: 'input', text: `$ ~/project ${val}` }];
    let result = parseCommand(val);
    
    // Validate branch switching: prevent if workspace has uncommitted changes
    const isSwitchCommand = val.includes('git switch') || val.includes('git checkout');
    const hasUncommittedChanges = gitState && (gitState.workingDirectory.length > 0 || gitState.stagingArea.length > 0);
    
    if (isSwitchCommand && hasUncommittedChanges) {
      newLines.push({ type: 'output', text: 'error: Your local changes to the following files would be overwritten by checkout:' });
      if (gitState.workingDirectory.length > 0) {
        gitState.workingDirectory.forEach(f => {
          newLines.push({ type: 'output', text: `\t${f.name}` });
        });
      }
      if (gitState.stagingArea.length > 0) {
        gitState.stagingArea.forEach(f => {
          newLines.push({ type: 'output', text: `\t${f.name}` });
        });
      }
      newLines.push({ type: 'output', text: 'Please commit your changes or stash them before you switch branches.' });
      
      setOutputLines(newLines);
      setHistory([val, ...history]);
      setHistoryIndex(-1);
      setInput('');
      return; // Don't dispatch action, don't update state
    }

    // Enrich 'git branch' output with actual branches from state
    if (val === 'git branch' && gitState) {
      const branches = gitState.localRepo.branches;
      const currentBranch = gitState.localRepo.currentBranch;
      const branchLines = branches.map(branch => 
        branch === currentBranch ? `* ${branch}` : `  ${branch}`
      );
      result = {
        ...result,
        output: branchLines
      };
    }
    
    if (result.output && result.output.length > 0) {
      result.output.forEach(line => newLines.push({ type: 'output', text: line }));
    }
    
    setOutputLines(newLines);
    
    if (result.action && onDispatch) {
      onDispatch(result.action);
    }
    
    if (result.alert && onAlert) {
      onAlert(result.alert);
    }

    if (result.tfsContext) {
      setTfsContext(result.tfsContext);
    }

    setHistory([val, ...history]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx].replace(/^git /, ''));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInput(history[prevIdx].replace(/^git /, ''));
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLines]);

  return (
    <div className={styles.wrapper}>
      {tfsContext && (
        <div className={styles.tfsContextBox}>
          <strong>TFS Context:</strong> {tfsContext}
        </div>
      )}
      <div className={styles.terminal} onClick={handleFocus}>
        <div className={styles.outputArea} aria-live="polite">
          {outputLines.map((line, idx) => (
            <div key={idx} className={`${styles.line} ${styles[line.type]}`}>
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <span className={styles.prompt}>$ ~/project</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
