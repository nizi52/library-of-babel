// BookList.js
import { Link } from 'react-router-dom';
// Импортируем компоненты Ant Design
import { List, Button, Tag, Space } from 'antd';
import { CheckOutlined, ReadOutlined } from '@ant-design/icons';
import App from './App';

function BookList({ books, setBooks }) {
  // Преобразуем наши книги в формат, подходящий для компонента List
  const data = books.map(book => ({
    ...book,
    // List будет использовать это свойство как ключ
    key: book.id,
  }));

  return (
    <div>
      <h2>Все книги</h2>
      {/* Заменяем <ul> на компонент List из Ant Design */}
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(book) => (
          <List.Item
            actions={[
              // Кнопка теперь будет стилизованной
              <Button 
                type={book.isRead ? "default" : "primary"} 
                icon={book.isRead ? <ReadOutlined /> : <CheckOutlined />}
                onClick={() => {
                  const updatedBooks = books.map(b =>
                    b.id === book.id ? { ...b, isRead: !b.isRead } : b
                  );
                  setBooks(updatedBooks);
                }}
              >
                {book.isRead ? 'Не прочитана' : 'Прочитана'}
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                // Используем Tag для отображения статуса
                <Tag color={book.isRead ? 'green' : 'blue'}>
                  {book.isRead ? '✅' : '📖'}
                </Tag>
              }
              // Заголовок теперь является ссылкой на детальную страницу
              title={<Link to={`/book/${book.id}`}>{book.title}</Link>}
              description={`Автор: ${book.author}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default BookList;