-- Create the admin table
CREATE TABLE public.admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the habitat table (required by the animal table)
CREATE TABLE public.habitat (
    habitat_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    veterinarian_comment TEXT,
    images TEXT
);

-- Create the animal table with a foreign key to habitat
CREATE TABLE public.animal (
    animal_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    race VARCHAR(255) NOT NULL,
    images TEXT,
    habitat_id INTEGER,
    FOREIGN KEY (habitat_id) REFERENCES public.habitat(habitat_id)
);

-- Create the employee table (required by the consommation table)
CREATE TABLE public.employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the food table (required by the consommation table)
CREATE TABLE public.food (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

-- Create the consommation table with foreign keys to animal, employee, and food
CREATE TABLE public.consommation (
    consommation_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    grammage INTEGER NOT NULL,
    animal_id INTEGER,
    employee_id INTEGER,
    food_id INTEGER,
    FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id),
    FOREIGN KEY (employee_id) REFERENCES public.employee(employee_id),
    FOREIGN KEY (food_id) REFERENCES public.food(food_id)
);

-- Create the health_record table with foreign keys to animal and veterinarian
CREATE TABLE public.health_record (
    health_record_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    detail_etat TEXT NOT NULL,
    animal_id INTEGER,
    veterinarian_id INTEGER,
    food_offered TEXT,
    food_amount INTEGER,
    FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id),
    FOREIGN KEY (veterinarian_id) REFERENCES public.veterinarian(veterinarian_id)
);

-- Create the veterinarian table (required by the health_record table)
CREATE TABLE public.veterinarian (
    veterinarian_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the review table
CREATE TABLE public.review (
    review_id SERIAL PRIMARY KEY,
    pseudo VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) NOT NULL
);

-- Create the service table
CREATE TABLE public.service (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    images TEXT
);
