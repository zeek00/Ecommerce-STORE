const mongoose = require('mongoose');
const { EventEmitter } = require('events');

// Mock ObjectId
const mockObjectId = jest.fn().mockImplementation(() => {
  return {
    toString: jest.fn().mockReturnValue('mockObjectId'),
    equals: jest.fn().mockReturnValue(true)
  };
});

// Mock Schema and its Types including ObjectId
const mockSchema = jest.fn().mockImplementation((schemaDefinition) => {
  return {
    schemaDefinition,
    methods: {},
    statics: {},
    model: jest.fn(),
    index: jest.fn()
  };
});
mockSchema.Types = {
  ObjectId: mockObjectId
};

// Mock Model
const mockModel = jest.fn().mockImplementation((name, schema) => {
  return {
    name,
    schema,
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
});

// Mock the Mongoose connect function
mongoose.connect = jest.fn();

// Create an event emitter for the connection
const mockConnection = new EventEmitter();
mockConnection.close = jest.fn();

// Apply the mocks
mongoose.Schema = mockSchema;
mongoose.model = mockModel;
mongoose.Types = { ObjectId: mockObjectId };
mongoose.connection = mockConnection;

module.exports = mongoose;
