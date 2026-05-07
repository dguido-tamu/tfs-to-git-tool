import { useState } from 'react';
import referenceCommands from '../data/referenceCommands';
import glossary from '../data/glossary';
import styles from './ReferencePage.module.css';

export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState('core');

  const tabs = [
    { id: 'core', label: 'Core Commands' },
    { id: 'branching', label: 'Branching & Merging' },
    { id: 'remote', label: 'Remote Operations' },
    { id: 'advanced', label: 'Advanced Tools' },
    { id: 'glossary', label: 'Glossary' }
  ];

  const renderCommandTable = (categoryData) => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Git Command</th>
            <th>Description</th>
            <th>TFS Equivalent</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map(cmd => (
            <tr key={cmd.name}>
              <td><code>{cmd.name}</code></td>
              <td>{cmd.description}</td>
              <td>{cmd.tfsEquivalent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGlossary = () => (
    <div className={styles.glossaryList}>
      {glossary.map(item => (
        <div key={item.term} className={styles.glossaryItem}>
          <h3 className={styles.term}>{item.term}</h3>
          <p className={styles.definition}>{item.definition}</p>
          <div className={styles.tfsNote}>
            <strong>TFS Note:</strong> {item.tfsNote}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Reference Dictionary</h1>
        <p>Comprehensive command references and vocabulary translation for TFS developers.</p>
      </header>
      
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          {activeTab === 'core' && (
            <section className={styles.section}>
              <h2>Core Commands</h2>
              {renderCommandTable(referenceCommands.core)}
            </section>
          )}
          
          {activeTab === 'branching' && (
            <section className={styles.section}>
              <h2>Branching & Merging</h2>
              {renderCommandTable(referenceCommands.branching)}
            </section>
          )}
          
          {activeTab === 'remote' && (
            <section className={styles.section}>
              <h2>Remote Operations</h2>
              {renderCommandTable(referenceCommands.remote)}
            </section>
          )}
          
          {activeTab === 'advanced' && (
            <section className={styles.section}>
              <h2>Advanced Tools</h2>
              {renderCommandTable(referenceCommands.advanced)}
            </section>
          )}

          {activeTab === 'glossary' && (
            <section className={styles.section}>
              <h2>A-Z Glossary</h2>
              {renderGlossary()}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
