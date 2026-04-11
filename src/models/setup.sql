DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS account CASCADE;

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

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(100) NOT NULL,
    account_lastname VARCHAR(100) NOT NULL,
    account_email VARCHAR(255) UNIQUE NOT NULL,
    account_password TEXT NOT NULL,
    account_type VARCHAR(20) NOT NULL DEFAULT 'Client'
);

INSERT INTO categories (name)
VALUES
('Education'),
('Health'),
('Environment');

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through volunteer construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service events.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

INSERT INTO projects (
    name,
    description,
    location,
    start_date,
    organization_id
)
VALUES
(
    'Math Tutoring Program',
    'Provides free tutoring for students in need.',
    'Copiapó',
    '2026-03-01',
    1
),
(
    'Community Health Fair',
    'Organizes health checkups and awareness events.',
    'Caldera',
    '2026-03-05',
    2
),
(
    'Tree Planting Campaign',
    'Promotes environmental restoration.',
    'Tierra Amarilla',
    '2026-03-10',
    3
);

INSERT INTO project_categories (
    project_id,
    category_id
)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);

INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    account_type
)
VALUES
(
    'Client',
    'User',
    'client@test.com',
    '$2b$10$I4QH3pZR9p9/BRcZ092gsufceRdn1r305Q4Yn3Vy2/.V0045P9jNG',
    'Client'
),
(
    'Employee',
    'User',
    'employee@test.com',
    '$2b$10$I4QH3pZR9p9/BRcZ092gsufceRdn1r305Q4Yn3Vy2/.V0045P9jNG',
    'Employee'
),
(
    'Admin',
    'User',
    'admin@test.com',
    '$2b$10$I4QH3pZR9p9/BRcZ092gsufceRdn1r305Q4Yn3Vy2/.V0045P9jNG',
    'Admin'
);
