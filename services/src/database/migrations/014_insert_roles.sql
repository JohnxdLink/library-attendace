-- Table        : roles
-- Defination   : Add super admin for the first role. 
-- Date         : 30-08-2026

INSERT INTO roles (name, description)
VALUES (
    'superadmin',
    'Full system administrator with complete access to all system features and resources.'
);