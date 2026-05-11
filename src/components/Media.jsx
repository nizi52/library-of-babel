import { IconMonitor, IconLink, IconGithub } from '../icons';

export default function Media() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      minHeight: '100%',
    }}>
      <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconMonitor size={22} color="white" /> Другие мои работы
      </h2>
      <div style={{ fontSize: '18px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <a
          href="https://nizi52.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#8fff6a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
        >
          <IconLink size={16} color="currentColor" /> Личный сайт
        </a>
        <a
          href="https://github.com/nizi52"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#8fff6a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
        >
          <IconGithub size={16} color="currentColor" /> Github профиль
        </a>
      </div>
    </div>
  );
}