INSERT INTO user_book_relationships(user_id, google_book_id, status, review, rating, read_date) 
VALUES ($1, $2, $3, $4, $5, $6) 
ON CONFLICT (user_id, google_book_id) 
DO UPDATE SET status = EXCLUDED.status, review = EXCLUDED.review, rating = EXCLUDED.rating, read_date = EXCLUDED.read_date RETURNING *;