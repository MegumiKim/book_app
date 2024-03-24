UPDATE user_book_relationships SET status = "reading" WHERE user_id = 1 & book_id = 3 returning *;

UPDATE user_book_relationships 
SET status = 'reading' 
WHERE user_id = 1 AND book_id = 3 
RETURNING *;
