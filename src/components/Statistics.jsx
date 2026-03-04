import { IconBarChart } from '../icons';

export default function Statistics({ books }) {
  const total = books.length;
  const read = books.filter((b) => b.isRead).length;
  const unread = total - read;
  const percentage = total > 0 ? Math.round((read / total) * 100) : 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #417049 0%, #178744 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      minHeight: '130px',
    }}>
      <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconBarChart size={22} color="white" /> Статистика
      </h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{total}</div>
          <div style={{ opacity: 0.9 }}>Всего книг</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{read}</div>
          <div style={{ opacity: 0.9 }}>Прочитано</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{unread}</div>
          <div style={{ opacity: 0.9 }}>Осталось</div>
        </div>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{percentage}%</div>
          <div style={{ opacity: 0.9 }}>Прогресс</div>
        </div>
      </div>
    </div>
  );
}