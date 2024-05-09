-- help \? 
-- lit DB \l 
-- ctrl + l clear
-- Create database CREATE DATABASE db_name;
-- Connect DB \c db_name 
-- list table \d
-- see the table \d table_name
-- update table ALTER TABLE products ADD COLUMN featured boolean
--Insert data  INSERT INTO books(id, name, location, price_range) values (123, 'McDonalds', 'NY', 3);
-- SELECT * from table_name



CREATE TABLE user_book_relationships (
    user_id BIGINT NOT NULL,
    book_id INT NOT NULL,
    status book_status NOT NULL, 
    review TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    read_date DATE,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);


-- Create an ENUM type for the book status
CREATE TYPE book_status AS ENUM ('have read', 'reading', 'to read');

INSERT INTO reviews(books_id, name, comment, rating) values (1,'megumi', 'good', 3);
SELECT * FROM books WHERE id = 1;

UPDATE books SET name = 'Red Lobster', location = 'miami', price_range = 5 where id = 3;

select * from reviews where books_id =1;


select trunc(avg(rating),2) as average_review from reviews where books_id = 1;

select location, count(location) from books group by location;
select books_id, count(books_id) from reviews group by books_id;

select * books inner join reviews;

select * from books inner join reviews on books.id = reviews.books_id;
select * from books full outer join reviews on books.id = reviews.books_id;

select * from books left join 
  (select books_id, count(*), TRUNC(AVG(rating),1) as average_rating 
  from reviews group by books_id) reviews 
  on books.id = reviews.books_id;

select * from books left join 