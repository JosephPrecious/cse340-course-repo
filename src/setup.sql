DROP TABLE IF EXISTS project_volunteer;
DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

/*
 * ORGANIZATION
 */
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

/*
 * ROLES
 */
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

/*
 * USERS
 */
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

/*
 * PROJECTS
 */
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

/*
 * CATEGORIES
 */
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

/*
 * PROJECT ↔ CATEGORY
 */
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

/*
 * WEEK 6 - VOLUNTEERS (MANY TO MANY)
 */
CREATE TABLE project_volunteer (
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    volunteered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE
);

/*
 * ORGANIZATIONS DATA
 */
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders',
 'Community infrastructure nonprofit.',
 'info@brightfuturebuilders.org',
 'brightfuture-logo.png'),

('GreenHarvest Growers',
 'Urban farming collective.',
 'contact@greenharvest.org',
 'greenharvest-logo.png'),

('UnityServe Volunteers',
 'Volunteer coordination group.',
 'hello@unityserve.org',
 'unityserve-logo.png');

/*
 * ROLES DATA
 */
INSERT INTO roles (role_name, role_description)
VALUES
('user', 'Standard user'),
('admin', 'Administrator');

/*
 * PROJECTS DATA
 */
INSERT INTO project (organization_id, name, description, project_date, location)
VALUES
(1, 'Park Cleanup', 'Clean local parks', '2026-06-15', 'Riverside Park'),
(2, 'Food Drive', 'Distribute food', '2026-06-20', 'Community Center'),
(3, 'Tutoring', 'Help students', '2026-06-25', 'Youth Hall');

/*
 * CATEGORIES DATA
 */
INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

/*
 * PROJECT CATEGORY DATA
 */
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(1, 3),
(2, 3),
(3, 2);