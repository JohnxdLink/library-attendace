// CREATE
const CREATE_LIBRARY_STAFF_DUTIES = `
  INSERT INTO library_staff_duties (staff_id, duty_date, time_in, time_out, remarks)
  VALUES (?, ?, ?, ?, ?)
`;

// READ - Get all records
const FIND_ALL_LIBRARY_STAFF_DUTIES = `
  SELECT
    lsd.id,
    lsd.staff_id,
    lsd.duty_date,
    lsd.time_in,
    lsd.time_out,
    lsd.remarks,
    lsd.created_at,
    lsd.updated_at
  FROM library_staff_duties AS lsd
  ORDER BY lsd.id DESC
`;

// READ - Get record by ID
const FIND_LIBRARY_STAFF_DUTIES_BY_ID = `
  SELECT
    lsd.id,
    lsd.staff_id,
    lsd.duty_date,
    lsd.time_in,
    lsd.time_out,
    lsd.remarks,
    lsd.created_at,
    lsd.updated_at
  FROM library_staff_duties AS lsd
  WHERE lsd.id = ?
`;

// UPDATE
const UPDATE_LIBRARY_STAFF_DUTIES = `
  UPDATE library_staff_duties AS lsd
  SET
    lsd.staff_id = ?,
    lsd.duty_date = ?,
    lsd.time_in = ?,
    lsd.time_out = ?,
    lsd.remarks = ?
  WHERE lsd.id = ?
`;

// DELETE
const DELETE_LIBRARY_STAFF_DUTIES = `
  DELETE FROM library_staff_duties
  WHERE id = ?
`;

module.exports = {
  CREATE_LIBRARY_STAFF_DUTIES,
  FIND_ALL_LIBRARY_STAFF_DUTIES,
  FIND_LIBRARY_STAFF_DUTIES_BY_ID,
  UPDATE_LIBRARY_STAFF_DUTIES,
  DELETE_LIBRARY_STAFF_DUTIES,
};
