SELECT
    ubr.review,
    ubr.rating,
    u.name
FROM user_book_relationships ubr
INNER JOIN users u ON u.user_id = ubr.user_id 
WHERE ubr.google_book_id = $1 AND ubr.status = 'have read';