
CREATE DATABASE saudi_flix
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE saudi_flix;


CREATE TABLE users (
  user_id   INT AUTO_INCREMENT PRIMARY KEY,
  username  VARCHAR(50) NOT NULL UNIQUE,
  password  VARCHAR(100) NOT NULL
);


CREATE TABLE movies (
  movie_id   INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(100) NOT NULL,
  genre      VARCHAR(100),
  year       INT,
  duration   INT,
  description TEXT,
  image      VARCHAR(100),
  link       VARCHAR(255)
);


INSERT INTO movies (title, genre, year, duration, description, image, link) VALUES
('Superman', 'Superhero / Action', 2025, 130,
 'A new take on the classic hero as Clark Kent learns how to balance being human and a symbol of hope.',
 'superman.jpg',
 'https://www.youtube.com/results?search_query=superman+2025+trailer'),

('Top Gun: Maverick', 'Action / Drama', 2022, 131,
 'After more than 30 years of service, Maverick faces the past while training a new generation of elite pilots.',
 'topgun-maverick.jpg',
 'https://www.youtube.com/results?search_query=top+gun+maverick+trailer'),

('Encanto', 'Animation / Family', 2021, 102,
 'In a magical Colombian family, Mirabel discovers that she may be the only one who can save their home.',
 'encanto.jpg',
 'https://www.youtube.com/results?search_query=encanto+trailer');


CREATE TABLE ratings (
  rating_id    INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  movie_id     INT NOT NULL,
  rating_value DECIMAL(2,1) NOT NULL,
  CONSTRAINT fk_r_user  FOREIGN KEY (user_id)  REFERENCES users(user_id),
  CONSTRAINT fk_r_movie FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
  UNIQUE (user_id, movie_id)
);


CREATE TABLE watchlist (
  watchlist_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  movie_id     INT NOT NULL,
  added_date   DATE NOT NULL,
  CONSTRAINT fk_w_user  FOREIGN KEY (user_id)  REFERENCES users(user_id),
  CONSTRAINT fk_w_movie FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
  UNIQUE (user_id, movie_id)
);
