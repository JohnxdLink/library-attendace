const db = require("../config/database.js");
const {
  CREATE_ROLE,
  FIND_ALL_ROLES,
  FIND_ROLE_BY_ID,
  FIND_ROLE_BY_NAME,
  UPDATE_ROLE,
  DELETE_ROLE,
} = require("../database/queries/role-query.js");

const createRole = async (name, description) => {
  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  const [result] = await db.query(CREATE_ROLE, [name, description]);

  return result;
};

const findAllRoles = async () => {
  const [rows] = await db.query(FIND_ALL_ROLES);

  return rows;
};

const findRoleById = async (id) => {
  if (!id) {
    throw new Error("Role ID is required.");
  }

  const [result] = await db.query(FIND_ROLE_BY_ID, [id]);

  return result[0] || null;
};

const findRoleByName = async (name) => {
  if (!name) {
    throw new Error("Name is required.");
  }

  const [result] = await db.query(FIND_ROLE_BY_NAME, [name]);

  return result[0] || null;
};

const updateRole = async (id, name, description) => {
  if (!id || !name || !description) {
    throw new Error("All role fields are required.");
  }

  const [result] = await db.query(UPDATE_ROLE, [name, description, id]);

  return result;
};

const deleteRole = async (id) => {
  if (!id) {
    throw new Error("Role ID is required.");
  }

  const [result] = await db.query(DELETE_ROLE, [id]);

  return result;
};

module.exports = {
  createRole,
  findAllRoles,
  findRoleById,
  findRoleByName,
  updateRole,
  deleteRole,
};
