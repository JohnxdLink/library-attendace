//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const accountsService = require("../../../src/services/accounts-service.js");

const {
  CREATE_ACCOUNT,
  FIND_ALL_ACCOUNTS,
  FIND_ACCOUNT_BY_ID,
  FIND_ACCOUNT_BY_USERNAME,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} = require("../../../src/database/queries/accounts-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createAccount", () => {
  it("should create an account successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await accountsService.createAccount("john123", "password123");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_ACCOUNT, ["john123", "password123"]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when username or password is missing", async () => {
    await expect(accountsService.createAccount("", "password123")).rejects.toThrow(
      "Username and password are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllAccounts", () => {
  it("should return all accounts", async () => {
    const mockRows = [
      {
        id: 1,
        username: "john123",
        created_at: "2026-09-25",
        updated_at: "2026-09-25",
      },
      {
        id: 2,
        username: "jane123",
        created_at: "2026-09-25",
        updated_at: "2026-09-25",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await accountsService.findAllAccounts();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ACCOUNTS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no accounts exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await accountsService.findAllAccounts();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ACCOUNTS);

    expect(result).toEqual([]);
  });
});

describe("findAccountById", () => {
  it("should return an account by ID", async () => {
    const mockAccount = {
      id: 1,
      username: "john123",
      created_at: "2026-09-25",
      updated_at: "2026-09-25",
    };

    mockDb.query.mockResolvedValueOnce([[mockAccount]]);

    const result = await accountsService.findAccountById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACCOUNT_BY_ID, [1]);

    expect(result).toEqual(mockAccount);
  });

  it("should return null when the account does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await accountsService.findAccountById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACCOUNT_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(accountsService.findAccountById()).rejects.toThrow("Account ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAccountByUsername", () => {
  it("should return an account by username", async () => {
    const mockAccount = {
      id: 1,
      username: "john123",
      password: "password123",
      created_at: "2026-09-25",
      updated_at: "2026-09-25",
    };

    mockDb.query.mockResolvedValueOnce([[mockAccount]]);

    const result = await accountsService.findAccountByUsername("john123");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACCOUNT_BY_USERNAME, ["john123"]);

    expect(result).toEqual(mockAccount);
  });

  it("should return null when the username does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await accountsService.findAccountByUsername("unknown");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACCOUNT_BY_USERNAME, ["unknown"]);

    expect(result).toBeNull();
  });

  it("should throw an error when username is missing", async () => {
    await expect(accountsService.findAccountByUsername()).rejects.toThrow("Username is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateAccount", () => {
  it("should update an account successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await accountsService.updateAccount(1, "john_updated", "newpassword123");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_ACCOUNT, ["john_updated", "newpassword123", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when required fields are missing", async () => {
    await expect(accountsService.updateAccount(null, "john_updated", "newpassword123")).rejects.toThrow(
      "Account ID, username, and password are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteAccount", () => {
  it("should delete an account successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await accountsService.deleteAccount(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ACCOUNT, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when account ID is missing", async () => {
    await expect(accountsService.deleteAccount()).rejects.toThrow("Account ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no account was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await accountsService.deleteAccount(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ACCOUNT, [999]);

    expect(result).toEqual(mockResult);
  });
});
