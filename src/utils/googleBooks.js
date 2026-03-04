export async function fetchBookFromGoogle(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Google Books API response:', data);

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const info = data.items[0].volumeInfo;
    return {
      description: info.description || 'Описание отсутствует',
      cover: info.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    };
  } catch (error) {
    console.error('Google Books error:', error);
    return null;
  }
}