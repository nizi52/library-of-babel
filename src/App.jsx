//App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetail from './BookDetail';
import BookList from './BookList';
 

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('my-reading-list');
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error);
      return [];
    }
  });
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('my-reading-list', JSON.stringify(books));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  }, [books]);

  const addBook = (e) => {
    e.preventDefault();
    if  (title.trim() === '' ||  author.trim() === '') {
      alert('Не заполнены поля');
      return;
    }
    const newBook = {
      id: Date.now(),
      title,
      author,
      isRead: false,
    };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
  } 

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/"><h1>Мой список книг</h1></Link>
          <Link to="/add">Добавить книгу</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BookList books={books} setBooks={setBooks} deleteBook={deleteBook} />} />
          <Route path="/add" element={  
            <AddBookForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              addBook={addBook}
            />
          } />
          <Route path="/book/:id" element={<BookDetail books={books} />} />
        </Routes>
      </div>
    </Router>
  );
}

function AddBookForm({title, setTitle, author, setAuthor, addBook}) {
  return (
    <form onSubmit={addBook}>
      <h2>Добавить новую книгу</h2>
      <div>
        <label htmlFor='title'>Название:</label>
        <input
        id='title'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='author'>Автор:</label>
        <input
        id='author'
        type='text'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type='submit'>Добавить в список</button>
    </form>
  );
}

export default App;