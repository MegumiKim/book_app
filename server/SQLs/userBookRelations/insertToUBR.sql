INSERT INTO user_book_relationships(user_id, google_book_id, status, review, rating) 
VALUES ($1, $2, $3, $4, $5) 
ON CONFLICT (user_id, google_book_id) 
DO UPDATE SET status = EXCLUDED.status, review = EXCLUDED.review, rating = EXCLUDED.rating RETURNING *;