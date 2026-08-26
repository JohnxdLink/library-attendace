CREATE TABLE attendance_reports (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id BIGINT UNSIGNED NOT NULL,
    attendance_id BIGINT UNSIGNED NULL,
    reported_by BIGINT UNSIGNED NOT NULL,
    report_type ENUM('Frequent Visit', 'Possible Cutting Class', 'Unauthorized Visit', 'Other') NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'Reviewed', 'Resolved') NOT NULL DEFAULT 'Pending',
    report_date DATE NOT NULL,
    action_taken TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_library_attendance_reports_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_library_attendance_reports_attendance FOREIGN KEY (attendance_id) REFERENCES student_attendances(id) ON DELETE SET NULL,
    CONSTRAINT fk_library_attendance_reports_staff FOREIGN KEY (reported_by) REFERENCES staffs(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;