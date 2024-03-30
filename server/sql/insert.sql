INSERT INTO books (google_book_id, title, author, imageUrl, genre) VALUES


INSERT INTO users (name, password) VALUES
('UserOne', 'password1'),
('UserTwo', 'password2'),
('UserThree', 'password3');


INSERT INTO user_book_relationships (user_id, book_id, status, review, rating, read_date) VALUES
(1, 1, 'have read', 'A timeless classic that explores the essence of the American Dream.', 5, '2023-01-15'),
(2, 2, 'reading', NULL, NULL, NULL),
(3, 3, 'to read', NULL, NULL, NULL);