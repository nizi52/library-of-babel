import { IconBook, IconBookOpen, IconCheck, IconTrash } from '../icons';

export default function BookItem({ book, onToggleRead, onDelete, onShowDetails }) {
  return (
    <li
      onClick={() => onShowDetails(book)}
      style={{
        background: 'white',
        border: '2px solid #dee2e6',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '220px',
          background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconBook size={64} color="white" />
        </div>
      )}

      <div style={{ padding: '1px 1px 1px', flex: 1, display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <h3 style={{ margin: 0, color: '#111', fontSize: '15px', lineHeight: 1.3 }}>
          {book.isRead
            ? <><IconCheck size={14} color="#28a745" />{' '}</>
            : <><IconBookOpen size={14} color="#ffc107" />{' '}</>
          }
          {book.title}
        </h3>
        <p style={{ margin: 0, color: '#616161', fontSize: '13px' }}>{book.author}</p>
        {book.description && (
          <p style={{
            margin: 0, fontSize: '12px', color: '#555',
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
          }}>
            {book.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
          <button
            onClick={e => { e.stopPropagation(); onToggleRead(book.id); }}
            style={{
              flex: 1, border: 'none', borderRadius: '6px',
              background: book.isRead ? '#28a745' : '#ffc107',
              color: 'white', padding: '7px', fontSize: '12px',
              fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}
          >
            {book.isRead
              ? <><IconCheck size={13} color="white" /> Прочитал</>
              : <><IconBookOpen size={13} color="white" /> В планах</>
            }
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(book.id); }}
            style={{
              background: '#dc3545', color: 'white', border: 'none',
              borderRadius: '6px', padding: '7px 10px', cursor: 'pointer',
            }}
          >
            <IconTrash size={14} color="white" />
          </button>
        </div>
      </div>
    </li>
  );
}