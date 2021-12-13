CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  passwd VARCHAR(100) NOT NULL,
  role INT NOT NULL DEFAULT 1,
  profile_pic VARCHAR(100),
  joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE listings (
  listing_id INT NOT NULL AUTO_INCREMENT,
  seller_id INT NOT NULL,
  filename VARCHAR(100) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  listing_date DATETIME NOT NULL,
  PRIMARY KEY (listing_id),
  FOREIGN KEY (seller_id) REFERENCES users(user_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE reviews (
  user_id INT NOT NULL,
  score INT NOT NULL,
  reviewer_id INT NOT NULL,
  unique_key INT NOT NULL,
  PRIMARY KEY (unique_key),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (reviewer_id) REFERENCES users(user_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  listing_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX index_reviews_unique_key ON reviews(unique_key);