CREATE TABLE club_password (
  password VARCHAR(255)
);

INSERT INTO club_password (
  password
) VALUES ( 'marcus' );

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  userid INTEGER,
  text VARCHAR(255),
  date VARCHAR(255),

);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  username VARCHAR(255),
  id INTEGER,
  password VARCHAR(255),
  member BOOLEAN,
);

CREATE TABLE IF NOT EXISTS user_type (
  
  id INTEGER,
  user_category VARCHAR(255),
);
INSERT INTO user_type (
  id,user_category
) VALUES ( 1,'admin' )(2,'common');

