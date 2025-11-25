import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spin, Alert, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './BookDetail.css';

function BookDetail({ books }) {
  const { id } = useParams();
  const book = books.find(b => b.id === Number(id));
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!book) return;

    const fetchBookData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}+inauthor:${encodeURIComponent(book.author)}`
        );

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные о книге');
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const astEdition = data.items.find(item => 
            item.volumeInfo.publisher && 
            item.volumeInfo.publisher.toLowerCase().includes('аст')
          ) || data.items[0];
          
          setBookDetails(astEdition);
        } else {
          throw new Error('Книга не найдена в базе данных');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [book]);

  if (!book) {
    return <Alert message="Книга не найдена!" description="Попробуйте вернуться на главную страницу" type="error" showIcon></Alert>
  }

  return (
    <div style={{ padding: '24px' }}>
      <Link to="/">← Назад к списку</Link>

      <Card
        title={book.title}
        extra={<Tag color={book.isRead ? 'green' : 'blue'}>{book.isRead ? 'Прочитана' : 'К прочтению'}</Tag>}
        style={{ marginTop: 16 }}
      >
        <p><strong>Автор:</strong> {book.author}</p>

        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <p>Загружаем дополнительную информацию...</p>
          </div>
        )}

        {error && <Alert message={error} type="warning" showIcon />}

        {bookDetails && !loading && (
          <div className="book-detail-content">
            {bookDetails.volumeInfo.imageLinks?.thumbnail && (
              <div className="book-cover-container">
                <img
                  src={bookDetails.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                  alt={`Обложка книги ${book.title}`}
                  className="book-cover-image"
                />
                {bookDetails.volumeInfo.publisher && (
                  <p><strong>Издательство:</strong> {bookDetails.volumeInfo.publisher}</p>
                )}
              </div>
            )}
            {bookDetails.volumeInfo.description && (
              <div className="book-description">
                <h3>Описание:</h3>
                <p>{bookDetails.volumeInfo.description}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default BookDetail;