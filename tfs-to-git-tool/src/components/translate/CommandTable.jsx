import { useState } from 'react';
import { X, Search } from 'lucide-react';
import commandMappings from '../../data/commandMappings';
import styles from './CommandTable.module.css';

export default function CommandTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMappings = commandMappings.filter(mapping => 
    mapping.tfsAction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.gitEquivalent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.keyDifference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>TFS to Git Translator</h2>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder="Search commands, actions, or concepts..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className={styles.clearButton} aria-label="Clear search">
            <X size={20} />
          </button>
        )}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>In TFS you'd...</th>
              <th>In Git, use...</th>
              <th>Key difference</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {filteredMappings.map(mapping => (
              <tr key={mapping.id}>
                <td className={styles.tfsCell}>{mapping.tfsAction}</td>
                <td className={styles.gitCell}>{mapping.gitEquivalent}</td>
                <td>{mapping.keyDifference}</td>
                <td><code>{mapping.example}</code></td>
              </tr>
            ))}
            {filteredMappings.length === 0 && (
              <tr>
                <td colSpan="4" className={styles.emptyState}>No results found for "{searchTerm}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
