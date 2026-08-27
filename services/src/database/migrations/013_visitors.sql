CREATE TABLE visitors (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    visitor_name VARCHAR(128) NOT NULL,
    visitor_type ENUM('Parent', 'Guardian', 'Alumni', 'Guest', 'Other') NOT NULL DEFAULT 'Other',
    contact_no VARCHAR(16) NULL,
    purpose VARCHAR(255) NOT NULL,
    person_to_visit VARCHAR(128) NULL,
    time_in TIME NOT NULL,
    time_out TIME NULL,
    visit_date DATE NOT NULL,
    remarks TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;