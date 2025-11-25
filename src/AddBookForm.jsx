import React from 'react';

function AddBookForm({ title, setTitle, author, setAuthor, addBook }) {
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
      <button color='pink' type='submit'>Добавить в список</button>
    </form>
  );
}

export default AddBookForm;