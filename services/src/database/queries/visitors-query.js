// CREATE
const CREATE_VISITOR = `
  INSERT INTO visitors (vistitor_name, visitor_type, contact_no, purpose, person_to_visit, time_in, time_out, visit_date, remarks)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

// READ - Get all records
const FIND_ALL_VISITORS = `
  SELECT
    v.id,
    v.visitor_name,
    v.visitor_type.
    v.contact_no,
    v.purpose,
    v.person_to_visit,
    v.time_in,
    v.time_out,
    v.visit_date,
    v.remarks,
    v.created_at,
    v.updated_at
  FROM visitors AS v
  ORDER BY v.id DESC
`;

// READ - Get record by ID
const FIND_VISITOR_BY_ID = `
  SELECT
    v.id,
    v.visitor_name,
    v.visitor_type,
    v.contact_no,
    v.purpose,
    v.person_to_visit,
    v.time_in,
    v.time_out,
    v.visit_date,
    v.remarks,
    v.created_at,
    v.updated_at
  FROM visitors AS v
  WHERE v.id = ?
`;

// UPDATE
const UPDATE_VISITOR = `
  UPDATE attendance_reports AS ar
  SET
    v.visitor_name = ?,
    v.visitor_type = ?,
    v.contact_no = ?,
    v.purpose = ?,
    v.person_to_visit = ?,
    v.time_in = ?,
    v.time_out = ?,
    v.visit_date = ?,
    v.remarks = ?
  WHERE v.id = ?
`;

// DELETE
const DELETE_VISITOR = `
  DELETE FROM visitors
  WHERE id = ?
`;

module.exports = {
  CREATE_VISITOR,
  FIND_ALL_VISITORS,
  FIND_VISITOR_BY_ID,
  UPDATE_VISITOR,
  DELETE_VISITOR,
};
