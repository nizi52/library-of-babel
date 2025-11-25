// BookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spin, Alert, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function BookDetail({ books }) {
  const { id } = useParams();
  const book = books.find(b => b.id === Number(id));
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Эффект для загрузки данных из API
  useEffect(() => {
    // Если книга не найдена, не делаем запрос
    if (!book) return;

    // Функция для выполнения запроса
    const fetchBookData = async () => {
      setLoading(true);
      setError(null); // Сбрасываем ошибку перед новым запросом
      try {
        // Формируем запрос к Google Books API
        // Ищем по названию и автору для большей точности
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}+inauthor:${encodeURIComponent(book.author)}&maxResults=1`
        );

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные о книге');
        }

        const data = await response.json();

        // Если API вернул результаты, берем первую найденную книгу
        if (data.items && data.items.length > 0) { // ИСПРАВЛЕНО: lehgth -> length
          setBookDetails(data.items[0]);
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
  }, [book]); // Эффект зависит от объекта book

  if (!book) {
    return <Alert message="Книга не найдена!" description="Попробуйте вернуться на главную странцую" type="error" showIcon></Alert>
  }

  return (
    <div style={{ padding: '24px' }}>
      <Link to="/">← Назад к списку</Link>

      <Card
        title={book.title} // Заголовок карточки
        // Верхний правый угол карточки: цветной тег со статусом
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
          <div>
            {bookDetails.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={bookDetails.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')} // Меняем протокол на https
                alt={`Обложка книги ${book.title}`}
                style={{ float: 'left', marginRight: '16px', marginBottom: '16px', maxHeight: '200px' }}
              />
            )}
            {bookDetails.volumeInfo.description && (
              <div>
                <h3>Описание:</h3>
                <p dangerouslySetInnerHTML={{ __html: bookDetails.volumeInfo.description }} />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default BookDetail;