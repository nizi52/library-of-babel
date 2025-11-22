import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('my-reading-list'));
    if (savedBooks && Array.isArray(savedBooks)) {
      setBooks(savedBooks);   
    }
  }, []);

  useEffect (() => {
    localStorage.setItem('my-reading-list', JSON.stringify(books));
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


  return (
    <Router>
      <div className="app">
        <h1>Мой список книг</h1>
        <p>В вашей библиотеке: <strong>{books.length}</strong> книг(и)</p>

        <BookList books={books} setBooks={setBooks} />
        <AddBookForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          addBook={addBook}
        />
      </div>
    </Router>
  );
}

function BookList({ books, setBooks }) {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <span>{book.isRead ? '✅ ' : '📖 '}</span>
          <strong>{book.title}</strong> - {book.author}
          <button onClick={() => {
            const updatedBooks = books.map(b =>
              b.id === book.id ? { ...b, isRead: !b.isRead } : b
            );
            setBooks(updatedBooks);
          }}>
            {book.isRead ? 'Не прочитана' : 'Прочитана'}
          </button>
        </li>
      ))}
    </ul>
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