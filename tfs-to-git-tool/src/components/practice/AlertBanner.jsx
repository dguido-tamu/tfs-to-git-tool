import { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import styles from './AlertBanner.module.css';

const ALERT_TYPES = {
  success: { bg: 'var(--color-success)', icon: CheckCircle },
  info:    { bg: 'var(--color-info)', icon: Info },
  warning: { bg: 'var(--color-warning)', icon: AlertTriangle },
  error:   { bg: 'var(--color-error)', icon: XCircle },
};

export default function AlertBanner({ alerts, onDismiss }) {
  return (
    <div className={styles.container} aria-live="polite">
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function AlertItem({ alert, onDismiss }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const typeConfig = ALERT_TYPES[alert.type] || ALERT_TYPES.info;
  const Icon = typeConfig.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDismiss(alert.id);
    }, 200); // Wait for fadeOut animation
  };

  return (
    <div 
      className={`${styles.alert} ${isRemoving ? styles.removing : ''}`} 
      style={{ backgroundColor: typeConfig.bg }}
      role="alert"
    >
      <Icon size={20} className={styles.icon} />
      <span className={styles.message}>{alert.message}</span>
      <button onClick={handleDismiss} className={styles.closeBtn} aria-label="Dismiss alert">
        <X size={16} />
      </button>
    </div>
  );
}
