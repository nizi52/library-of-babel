import { IconBook, IconBookOpen, IconCheck, IconClose, IconClock, IconNote } from '../icons';

export default function BookDetailsModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
          }}
        >
          <IconClose size={22} color="#666" />
        </button>

        <div style={{ display: 'flex', gap: '25px', marginBottom: '25px' }}>
          {book.cover ? (
            <img
              src={book.cover.replace('http://', 'https://')}
              alt={book.title}
              style={{
                width: '150px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          ) : (
            <div style={{
              width: '150px',
              height: '200px',
              background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
            }}>
              <IconBook size={52} color="white" />
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h2 style={{ marginTop: 0, marginBottom: '10px' }}>{book.title}</h2>
            <p style={{ fontSize: '18px', color: '#495057', marginBottom: '15px' }}>
              <strong>Автор:</strong> {book.author}
            </p>
            <p style={{ fontSize: '14px', color: '#868e96', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IconClock size={14} color="#868e96" />
              <strong>Дата добавления:</strong>&nbsp;{book.addedDate}
            </p>
            <p style={{ fontSize: '14px', color: '#868e96', display: 'flex', alignItems: 'center', gap: '5px' }}>
              {book.isRead
                ? <><IconCheck size={14} color="#28a745" /> <strong>Статус:</strong>&nbsp;Прочитана</>
                : <><IconBookOpen size={14} color="#ffc107" /> <strong>Статус:</strong>&nbsp;В планах</>
              }
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <IconNote size={17} color="#333" /> Описание
          </h3>
          <div style={{
            color: 'black',
            background: '#cbcbcb99',
            padding: '15px',
            borderRadius: '6px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {book.description ? (
              <p style={{ margin: 0, lineHeight: '1.6' }}>{book.description}</p>
            ) : (
              <p style={{ margin: 0, color: '#868e96', fontStyle: 'italic' }}>Описание отсутствует</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}