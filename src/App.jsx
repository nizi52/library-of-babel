import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetail from './BookDetail';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import 'antd/dist/reset.css';

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
      <div className="grid-background"></div>
      <div className="content">
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


export default App;