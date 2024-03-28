select * from users inner join user_book_relationships on users.user_id = user_book_relationships.user_id where users.user_id = 2;

SELECT
    b.google_book_id,
    b.title,
    ubr.status,
    ubr.read_date,
    b.imageurl,
    b.genre
FROM books b
INNER JOIN user_book_relationships ubr ON b.google_book_id = ubr.google_book_id 
INNER JOIN users u ON u.user_id = ubr.user_id 
WHERE u.user_id = 2;