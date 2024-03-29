const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../server");

const Cart = require("../../database/schemas/Cart");

jest.mock("../../database/schemas/Cart", () => ({
  findById: jest.fn(),
}));

describe("/api/cart routes", () => {
  describe("GET /api/cart/", () => {
    describe('GET /users/:id', () => {
      it('should return user items when a valid user id is provided', async () => {
        const userId = 'validUserId';
        const mockUser = { _id: userId, items: [{item1: 1}, {item2: 2}] };
        Cart.findById.mockResolvedValue(mockUser);

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ items: mockUser.items });
      });

      it('should return 404 error when user is not found', async () => {
        const userId = 'nonExistentUserId';
        Cart.findById.mockResolvedValue(null);

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
      });

      it('should return 404 error when user cart is empty', async () => {
        const userId = 'userIdWithEmptyCart';
        const mockUser = { _id: userId, items: [] };
        Cart.findById.mockResolvedValue(mockUser);

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User Cart Empty');
      });

      it('should return 500 error when an unexpected error occurs', async () => {
        const userId = 'unexpectedErrorUserId';
        const mockError = new Error('Internal Server Error');
        Cart.findById.mockRejectedValue(mockError);

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal Server Error');
      });
    });
  });

// Closing database connection
  afterEach(async () => {
    await mongoose.connection.close();
  });
});