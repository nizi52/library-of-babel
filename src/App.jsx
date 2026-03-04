import { useState, useEffect } from 'react';

import AddBookForm      from './components/AddBookForm';
import BookItem         from './components/BookItem';
import BookDetailsModal from './components/BookDetailsModal';
import Statistics       from './components/Statistics';
import Media            from './components/Media';
import SearchBar        from './components/SearchBar';
import { IconBook, IconLibrary, IconSad } from './icons';
import { fetchBookFromGoogle } from './utils/googleBooks';

export default function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('library-books');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery]   = useState('');
  const [isAdding, setIsAdding]         = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('library-books', JSON.stringify(books));
  }, [books]);

  const addBook = async (title, author) => {
    setIsAdding(true);
    const googleData = await fetchBookFromGoogle(title, author);
    const newBook = {
      id: Date.now(),
      title,
      author,
      isRead: false,
      addedDate: new Date().toLocaleDateString('ru-RU'),
      description: googleData?.description || '',
      cover: googleData?.cover || null,
    };
    setBooks((prev) => [...prev, newBook]);
    setIsAdding(false);
  };

  const deleteBook = (bookId) => {
    if (window.confirm('Удалить книгу из библиотеки?')) {
      setBooks(books.filter((book) => book.id !== bookId));
    }
  };

  const toggleRead = (bookId) => {
    setBooks(books.map((book) =>
      book.id === bookId ? { ...book, isRead: !book.isRead } : book
    ));
  };

  const filteredBooks = books.filter((book) => {
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
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <img src='/src/icons/babel.png' alt='Babel' style={{height: '64px', width: '64px', objectFit: 'cover', borderRadius: '8px'}}/>
        Вавилонская библиотека
      </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '30px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Statistics books={books} />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Media />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px' }}>
        <AddBookForm onAddBook={addBook} loading={isAdding} />

        {books.length > 0 && (
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        )}
      </div>

      <div>
        <h2 style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBook size={22} color="white" />
          Книги ({filteredBooks.length})
          {searchQuery && ' — результаты поиска'}
        </h2>

        {books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#ffffff' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <IconLibrary size={80} color="rgba(255,255,255,0.7)" />
            </div>
            <h3>Ваша библиотека пуста</h3>
            <p>Добавьте первую книгу, чтобы начать!</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <p style={{
            textAlign: 'center', color: '#ffffff', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <IconSad size={24} color="white" />
            По запросу «{searchQuery}» ничего не найдено
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onToggleRead={toggleRead}
                onDelete={deleteBook}
                onShowDetails={setSelectedBook}
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