export async function fetchBookFromGoogle(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${query}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) return null;

    const book = data.docs[0];
    const coverId = book.cover_i;

    return {
      description: book.first_sentence?.[0] || book.subject?.slice(0, 3).join(', ') || '',
      cover: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : null,
    };
  } catch (error) {
    console.error('Open Library error:', error);
    return null;
  }
}