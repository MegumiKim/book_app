INSERT INTO books (google_book_id, title, author, isbn) VALUES
('1A2B3C4D', 'The Great Gatsby', 'F. Scott Fitzgerald', '1234567890123'),
('2B3C4D5E', '1984', 'George Orwell', '2345678901234'),
('3C4D5E6F', 'To Kill a Mockingbird', 'Harper Lee', '3456789012345');

INSERT INTO users (name, password) VALUES
('UserOne', 'password1'),
('UserTwo', 'password2'),
('UserThree', 'password3');


INSERT INTO user_book_relationships (user_id, book_id, status, review, rating, read_date) VALUES
(1, 1, 'have read', 'A timeless classic that explores the essence of the American Dream.', 5, '2023-01-15'),
(2, 2, 'reading', NULL, NULL, NULL),
(3, 3, 'to read', NULL, NULL, NULL);