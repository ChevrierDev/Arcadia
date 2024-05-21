-- Insert data into admin table
INSERT INTO public.admin (email, password, role) VALUES
('marie.dupont@hotmail.com', 'Azerty-123', 'superadmin'),
('jean.martin@hotmail.com', 'Azerty-123', 'admin');

-- Insert data into habitat table
INSERT INTO public.habitat (name, description, veterinarian_comment, images) VALUES
('Savane', 'Une grande zone ouverte avec de l\'herbe et peu d\'arbres.', 'Needs regular maintenance.', 'savane1.jpg'),
('Forêt Tropicale', 'Une forêt dense et tropicale avec une humidité élevée.', 'Monitor for mold.', 'foret_tropicale1.jpg');

-- Insert data into animal table
INSERT INTO public.animal (name, race, images, habitat_id) VALUES
('Leo', 'Lion', 'leo1.jpg,leo2.jpg', 1),
('Rayures', 'Tigre', 'rayures1.jpg,rayures2.jpg', 2);

-- Insert data into employee table
INSERT INTO public.employee (first_name, last_name, email, password, role) VALUES
('Julien', 'Dupuis', 'julien.dupuis@hotmail.com', 'Azerty-123', 'employer'),
('Sophie', 'Lefevre', 'sophie.lefevre@hotmail.com', 'Azerty-123', 'employer');

-- Insert data into food table
INSERT INTO public.food (name, type, quantity) VALUES
('Gigot', 'Viande', 100),
('Bambou', 'Plante', 200);

-- Insert data into consommation table
INSERT INTO public.consommation (date, heure, grammage, animal_id, employee_id, food_id) VALUES
(CURRENT_DATE, CURRENT_TIME, 10, 1, 1, 1),
(CURRENT_DATE, CURRENT_TIME, 20, 2, 2, 2);

-- Insert data into health_record table
INSERT INTO public.health_record (date, content, detail_etat, animal_id, veterinarian_id, food_offered, food_amount) VALUES
( CURRENT_TIMESTAMP, 'Leo montre des signes de fatigue.', 'Fatigue', 1, 1, 'Viande', 5),
( CURRENT_TIMESTAMP, 'Rayures semble en bonne santé.', 'Bonne condition physique', 2, 2, 'Bambou', 10);

-- Insert data into veterinarian table
INSERT INTO public.veterinarian (first_name, last_name, email, password, role) VALUES
('Paul', 'Durand', 'paul.durand@hotmail.com', 'Azerty-123', 'veterinaire'),
('Claire', 'Moreau', 'claire.moreau@hotmail.com', 'Azerty-123', 'veterinaire');

-- Insert data into review table
INSERT INTO public.review (pseudo, description, created_at, approved, email) VALUES
('julien92', 'Très bonne expérience au zoo, les animaux sont bien entretenus.', CURRENT_TIMESTAMP, TRUE, 'julien92@hotmail.com'),
('sophie29', 'Les habitats sont très propres et bien conçus.', CURRENT_TIMESTAMP, FALSE, 'sophie29@hotmail.com');

-- Insert data into service table
INSERT INTO public.service (name, description, images) VALUES
('Visite Guidée', 'Une visite guidée du zoo avec un guide expert.', 'visite_guidee.jpg'),
('Atelier Enfant', 'Un atelier éducatif pour les enfants.', 'atelier_enfant.jpg');
