DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    organization_id INT REFERENCES organization(organization_id)
);

CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO categories (name)
VALUES
('Education'),
('Health'),
('Environment');

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through volunteer construction projects.',
'info@brightfuturebuilders.org',
'brightfuture-logo.png'),

('GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education.',
'contact@greenharvest.org',
'greenharvest-logo.png'),

('UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service events.',
'hello@unityserve.org',
'unityserve-logo.png');

INSERT INTO projects (
    name,
    description,
    location,
    start_date,
    organization_id
)
VALUES
('Math Tutoring Program',
'Provides free tutoring for students in need.',
'Copiapó',
'2026-03-01',
1),

('Community Health Fair',
'Organizes health checkups and awareness events.',
'Caldera',
'2026-03-05',
2),

('Tree Planting Campaign',
'Promotes environmental restoration.',
'Tierra Amarilla',
'2026-03-10',
3);

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);