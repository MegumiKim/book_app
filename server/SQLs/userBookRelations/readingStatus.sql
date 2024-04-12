SELECT
    ubr.status
FROM user_book_relationships ubr
WHERE ubr.google_book_id = $1 AND ubr.user_id = $2;