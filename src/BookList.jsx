import { Link } from 'react-router-dom';
import { List, Button, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, ReadOutlined } from '@ant-design/icons';

function BookList({ books, setBooks, deleteBook }) {
  const data = books.map(book => ({
    ...book,
    key: book.id,
  }));

  return (
    <div>
      <h2>Все книги</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(book) => (
          <List.Item
            actions={[
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
              </Button>,
              <Button
                key="delete"
                danger
                icon={<DeleteOutlined/>}
                onClick={() => deleteBook(book.id)}
              >
                Удалить
              </Button>
            ]}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Tag color={book.isRead ? 'green' : 'blue'}>
                {book.isRead ? '✅' : '📖'}
              </Tag>
              <Link to={`/book/${book.id}`} style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {book.title}
              </Link>
              <span style={{ color: '#666' }}>Автор: {book.author}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default BookList;