import { IconBook, IconBookOpen, IconCheck, IconTrash } from '../icons';

export default function BookItem({ book, onToggleRead, onDelete, onShowDetails }) {
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
        cursor: 'pointer',
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
          }}>
            <IconBook size={28} color="white" />
          </div>
        )}

        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 5px 0',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            {book.isRead
              ? <IconCheck size={18} color="#28a745" />
              : <IconBookOpen size={18} color="#ffc107" />
            }
            {book.title}
          </h3>
          <p style={{ margin: 0, color: '#616161' }}>
            Автор: {book.author}
          </p>
          {book.description && (
            <p style={{
              margin: '5px 0 0 0',
              color: '#3b3b3b',
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {book.description.substring(0, 100)}...
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '500',
          }}
        >
          {book.isRead
            ? <><IconCheck size={15} color="white" /> Прочитал</>
            : <><IconBookOpen size={15} color="white" /> В планах</>
          }
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
            padding: '8px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconTrash size={17} color="white" />
        </button>
      </div>
    </li>
  );
}