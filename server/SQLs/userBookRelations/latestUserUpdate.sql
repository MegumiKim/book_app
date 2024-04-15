SELECT
    u.name,
    ubr.status,
    ubr.rating,
    ubr.created_at,
    b.google_book_id,
    b.title,
    b.imageurl,
    b.genre,
    b.author
FROM books b
INNER JOIN user_book_relationships ubr ON b.google_book_id = ubr.google_book_id 
INNER JOIN users u ON u.user_id = ubr.user_id 
ORDER BY ubr.created_at DESC
LIMIT 1;