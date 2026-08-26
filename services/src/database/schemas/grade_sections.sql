CREATE TABLE grade_sections (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    school_year_id BIGINT UNSIGNED NOT NULL,
    grade_n_strand_id BIGINT UNSIGNED NOT NULL,
    adviser_staff_id BIGINT UNSIGNED NULL,
    section_name VARCHAR(64) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_grade_sections (
        school_year_id,
        grade_n_strand_id,
        section_name
    ),

    KEY idx_grade_sections_grade_n_strand (grade_n_strand_id),
    KEY idx_grade_sections_adviser (adviser_staff_id),

    CONSTRAINT fk_grade_sections_school_year
        FOREIGN KEY (school_year_id)
        REFERENCES school_years(id),

    CONSTRAINT fk_grade_sections_grade_n_strand
        FOREIGN KEY (grade_n_strand_id)
        REFERENCES grade_n_strands(id),

    CONSTRAINT fk_grade_sections_adviser
        FOREIGN KEY (adviser_staff_id)
        REFERENCES staffs(id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;