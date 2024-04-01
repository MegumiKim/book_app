SELECT
    b.google_book_id,
    b.title,
    ubr.status,
    ubr.read_date,
    ubr.review,
    ubr.rating,
    ubr.created_at,
    b.imageurl,
    b.genre,
    b.author
FROM books b
INNER JOIN user_book_relationships ubr ON b.google_book_id = ubr.google_book_id 
INNER JOIN users u ON u.user_id = ubr.user_id 
WHERE u.user_id = $1;