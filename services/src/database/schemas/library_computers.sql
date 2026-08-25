CREATE TABLE library_computers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    computer_number VARCHAR(32) NOT NULL,
    status ENUM('Available', 'In Use', 'Under Maintenance', 'Damaged') NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_library_computers_number (computer_number)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;