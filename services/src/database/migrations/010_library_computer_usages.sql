CREATE TABLE library_computer_usages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id BIGINT UNSIGNED NOT NULL,
    computer_id BIGINT UNSIGNED NOT NULL,
    usage_date DATE NOT NULL,
    time_in TIME NOT NULL,
    time_out TIME NULL,
    purpose VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_library_computer_usages_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_library_computer_usages_computer FOREIGN KEY (computer_id) REFERENCES library_computers(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;