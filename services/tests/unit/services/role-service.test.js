//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const roleService = require("../../../src/services/role-service.js");

const {
  CREATE_ROLE,
  FIND_ALL_ROLES,
  FIND_ROLE_BY_ID,
  FIND_ROLE_BY_NAME,
  UPDATE_ROLE,
  DELETE_ROLE,
} = require("../../../src/database/queries/role-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createRole", () => {
  it("should create a role successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await roleService.createRole("Librarian", "Library staff member");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_ROLE, ["Librarian", "Library staff member"]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when name is missing", async () => {
    await expect(roleService.createRole(null, "Library staff member")).rejects.toThrow(
      "Name and description are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when description is missing", async () => {
    await expect(roleService.createRole("Librarian", null)).rejects.toThrow("Name and description are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllRoles", () => {
  it("should return all roles", async () => {
    const mockRows = [
      {
        role_id: 1,
        name: "Admin",
        description: "System administrator",
      },
      {
        role_id: 2,
        name: "Librarian",
        description: "Library staff member",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await roleService.findAllRoles();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ROLES);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no roles exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await roleService.findAllRoles();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ROLES);

    expect(result).toEqual([]);
  });
});

describe("findRoleById", () => {
  it("should return a role by ID", async () => {
    const mockRole = {
      role_id: 1,
      name: "Admin",
      description: "System administrator",
    };

    mockDb.query.mockResolvedValueOnce([[mockRole]]);

    const result = await roleService.findRoleById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ROLE_BY_ID, [1]);

    expect(result).toEqual(mockRole);
  });

  it("should return null when the role does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await roleService.findRoleById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ROLE_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(roleService.findRoleById()).rejects.toThrow("Role ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findRoleByName", () => {
  it("should return a role by name", async () => {
    const mockRole = {
      role_id: 1,
      name: "Admin",
      description: "System administrator",
    };

    mockDb.query.mockResolvedValueOnce([[mockRole]]);

    const result = await roleService.findRoleByName("Admin");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ROLE_BY_NAME, ["Admin"]);

    expect(result).toEqual(mockRole);
  });

  it("should return null when no role exists with the name", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await roleService.findRoleByName("Unknown");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ROLE_BY_NAME, ["Unknown"]);

    expect(result).toBeNull();
  });

  it("should throw an error when name is missing", async () => {
    await expect(roleService.findRoleByName()).rejects.toThrow("Name is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateRole", () => {
  it("should update a role successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await roleService.updateRole(1, "Librarian", "Updated library staff member");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_ROLE, ["Librarian", "Updated library staff member", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(roleService.updateRole(null, "Librarian", "Library staff member")).rejects.toThrow(
      "All role fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when name is missing", async () => {
    await expect(roleService.updateRole(1, null, "Library staff member")).rejects.toThrow(
      "All role fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when description is missing", async () => {
    await expect(roleService.updateRole(1, "Librarian", null)).rejects.toThrow("All role fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteRole", () => {
  it("should delete a role successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await roleService.deleteRole(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ROLE, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(roleService.deleteRole()).rejects.toThrow("Role ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no role was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await roleService.deleteRole(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ROLE, [999]);

    expect(result).toEqual(mockResult);
  });
});
