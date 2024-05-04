CREATE TABLE veterinarian (
    veterinarian_id SERIAL PRIMARY KEY,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    role VARCHAR(50) NOT NULL
);