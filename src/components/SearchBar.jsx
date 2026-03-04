import { IconSearch } from '../icons';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
      }}>
        <IconSearch size={18} color="#667eea" />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск по названию или автору..."
        style={{
          width: '100%',
          padding: '12px 12px 12px 40px',
          fontSize: '16px',
          border: '2px solid #667eea',
          borderRadius: '8px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}