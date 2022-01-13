CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
)

INSERT INTO application_user (username, password) VALUES ('admin', crypt('admin', 'my_salt'))