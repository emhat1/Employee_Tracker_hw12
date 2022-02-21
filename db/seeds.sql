INSERT INTO department (id, name)
VALUES 
(1,'Dark Arts'),
(2,'Potions'),
(3,'Herbology'),
(4,'Transfiguration'),
(5,'Charms');

INSERT INTO role (title, salary, department_id)
VALUES
('Monster wrangler', 178000, 1),
('Ingredient collector', 167000, 2),
('Head gardener', 130000, 3),
('Professor', 140000, 4),
('Reversal lead', 110000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Harry', 'Potter', 1, 123),
('Ronald', 'Weasley', 2, 456),
('Hermione', 'Granger', 3, 789),
('Dudley', 'Dursley', 4, 012),
('Draco', 'Malfoy', 5, 345);
