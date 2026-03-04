import { useState } from 'react';
import { IconPlus, IconHourglass } from '../icons';

export default function AddBookForm({ onAddBook, loading }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '' || author.trim() === '') {
      alert('Заполните все поля!');
      return;
    }
    onAddBook(title, author);
    setTitle('');
    setAuthor('');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
      padding: '20px',
      borderRadius: '8px',
    }}>
      <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconPlus size={22} color="white" /> Добавить книгу
      </h2>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Название:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: Идиот"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #dee2e6',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Автор:
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Например: Фёдор Достоевский"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #dee2e6',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: loading ? 'default' : 'pointer',
          fontWeight: 'bold',
          opacity: loading ? 0.8 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {loading
          ? <><IconHourglass size={18} color="white" /> Добавляем...</>
          : <><IconPlus size={18} color="white" /> Добавить в библиотеку</>
        }
      </button>
    </div>
  );
}