import React, { useState, useEffect } from 'react';

function AddBookForm({ onAddBook, loading }) {
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
      marginBottom: '30px'
    }}>
      <h2 style={{ marginTop: 0 }}>➕ Добавить книгу</h2>
      
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
            boxSizing: 'border-box'
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
            boxSizing: 'border-box'
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
          opacity: loading ? 0.8 : 1
        }}
      >
        {loading ? '⏳ Добавляем...' : '➕ Добавить в библиотеку'}
      </button> 
    </div>
  );
}

function BookItem({ book, onToggleRead, onDelete, onShowDetails }) {
  return (
    <li
      style={{
        height: '100%',
        background: 'white',
        border: '2px solid #dee2e6',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.2s',
        cursor: 'pointer'
      }}
      onClick={() => onShowDetails(book)}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={book.title}
            style={{
              width: '60px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        ) : (
          <div style={{
            width: '60px',
            height: '80px',
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            color: 'white',
            fontSize: '24px'
          }}>
            📚
          </div>
        )}
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 5px 0',
            color: book.isRead ? '#6c757d' : '#2c3e50',
            textDecoration: book.isRead ? 'line-through' : 'none'
          }}>
            {book.isRead ? '✅ ' : '📖 '}
            {book.title}
          </h3>
          <p style={{ margin: 0, color: '#6c757d' }}>
            Автор: {book.author}
          </p>
          {book.description && (
            <p style={{ 
              margin: '5px 0 0 0', 
              color: '#868e96',
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              📝 {book.description.substring(0, 100)}...
            </p>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleRead(book.id);
          }}
          style={{
            background: book.isRead ? '#28a745' : '#ffc107',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {book.isRead ? 'Прочитал' : 'В планах'}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(book.id);
          }}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

function BookDetailsModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <div style={{ display: 'flex', gap: '25px', marginBottom: '25px' }}>
          {book.cover ? (
            <img 
              src={book.cover.replace('http://', 'https://')} 
              alt={book.title}
              style={{
                width: '150px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            />
          ) : (
            <div style={{
              width: '150px',
              height: '200px',
              background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: 'white',
              fontSize: '48px'
            }}>
              📚
            </div>
          )}
          
          <div style={{ flex: 1 }}>
            <h2 style={{ marginTop: 0, marginBottom: '10px' }}>
              {book.title}
            </h2>
            <p style={{ fontSize: '18px', color: '#495057', marginBottom: '15px' }}>
              <strong>Автор:</strong> {book.author}
            </p>
            <p style={{ fontSize: '14px', color: '#868e96', marginBottom: '5px' }}>
              <strong>Дата добавления:</strong> {book.addedDate}
            </p>
            <p style={{ fontSize: '14px', color: '#868e96' }}>
              <strong>Статус:</strong> {book.isRead ? '✅ Прочитана' : '📖 В планах'}
            </p>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '10px' }}>Описание</h3>
          <div style={{
            color: 'black',
            background: '#cbcbcb99',
            padding: '15px',
            borderRadius: '6px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {book.description ? (
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                {book.description}
              </p>
            ) : (
              <p style={{ margin: 0, color: '#868e96', fontStyle: 'italic' }}>
                Описание отсутствует
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Statistics({ books }) {
  const total = books.length;
  const read = books.filter(b => b.isRead).length;
  const unread = total - read;
  const percentage = total > 0 ? Math.round((read / total) * 100) : 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px'
    }}>
      <h2 style={{ marginTop: 0 }}>📊 Статистика</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{total}</div>
          <div style={{ opacity: 0.9 }}>Всего книг</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{read}</div>
          <div style={{ opacity: 0.9 }}>Прочитано</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{unread}</div>
          <div style={{ opacity: 0.9 }}>Осталось</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{percentage}%</div>
          <div style={{ opacity: 0.9 }}>Прогресс</div>
        </div>
      </div>
    </div>
  );
}

function Media() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px'
    }}>
      <h2 style={{ marginTop: 0 }}>💻 Другие мои работы</h2>
      <div style={{ fontSize: '18px' }}>
        <a
          href='https://github.com/nizi52'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            opacity: 0.9,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.9'}
        >
          🔗 GitHub профиль
        </a>
      </div>
    </div>    
  );
}

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 Поиск по названию или автору..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #667eea',
          borderRadius: '8px',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
}

async function fetchBookFromGoogle(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Google Books API response:', data); // Для отладки

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const info = data.items[0].volumeInfo;
    return {
      description: info.description || 'Описание отсутствует',
      cover: info.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    };
  } catch (error) {
    console.error('Google Books error:', error);
    return null;
  }
}

export default function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('library-books');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('library-books', JSON.stringify(books));
  }, [books]);

  const addBook = async (title, author) => {
    setIsAdding(true);

    const googleData = await fetchBookFromGoogle(title, author);
    
    console.log('Fetched data:', googleData); // Для отладки

    const newBook = {
      id: Date.now(),
      title,
      author,
      isRead: false,
      addedDate: new Date().toLocaleDateString('ru-RU'),
      description: googleData?.description || '',
      cover: googleData?.cover || null,
    };
  
    setBooks(prev => [...prev, newBook]);
    setIsAdding(false);
  };

  const deleteBook = (bookId) => {
    if (window.confirm('Удалить книгу из библиотеки?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const toggleRead = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, isRead: !book.isRead } 
        : book
    ));
  };

  const showBookDetails = (book) => {
    setSelectedBook(book);
  };

  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ 
      minHeight: '100vh',
      margin: 0,
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(135deg, #354839 0%, #126500 100%)',
      boxSizing: 'border-box',
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#ffffff',
        fontSize: '52px',
        marginBottom: '40px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        📚 Моя библиотека
      </h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Statistics books={books} />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Media />
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <div>
          <AddBookForm onAddBook={addBook} loading={isAdding} />
        </div>
        
        {books.length > 0 && (
          <div>
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}
      </div>

      <div>
        <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>
          Книги ({filteredBooks.length})
          {searchQuery && ` - результаты поиска`}
        </h2>
        
        {books.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: '#ffffff'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📚</div>
            <h3>Ваша библиотека пуста</h3>
            <p>Добавьте первую книгу, чтобы начать!</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ffffff', fontSize: '18px' }}>
            😔 По запросу "{searchQuery}" ничего не найдено
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredBooks.map(book => (
              <BookItem
                key={book.id}
                book={book}
                onToggleRead={toggleRead}
                onDelete={deleteBook}
                onShowDetails={showBookDetails}
              />
            ))}
          </ul>
        )}
      </div>

      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </div>
  );
}