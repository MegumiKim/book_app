
 -- Create tables
--   CREATE TABLE books (
--     book_id SERIAL PRIMARY KEY,
--     google_book_id VARCHAR(255) UNIQUE NOT NULL,
--     title VARCHAR(255),
--     author VARCHAR(255),
--     imageUrl TEXT,
--     isbn VARCHAR(13)
-- );
 -- Create tables
  CREATE TABLE books (
    google_book_id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    author VARCHAR(255),
    imageUrl TEXT
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create an ENUM type for the book status
CREATE TYPE book_status AS ENUM ('have read', 'reading', 'to read');


CREATE TABLE user_book_relationships (
    user_id INT NOT NULL,
    google_book_id VARCHAR(255) UNIQUE NOT NULL,
    status book_status NOT NULL, 
    review TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    read_date DATE,
    PRIMARY KEY (user_id, google_book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (google_book_id) REFERENCES books(google_book_id) ON DELETE CASCADE
);