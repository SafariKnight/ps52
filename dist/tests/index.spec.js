"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
describe('Main', () => {
    it('creates new file', async () => {
        const response = await (0, supertest_1.default)(server_1.default).post('/data/test').send({
            message: 'Hello'
        });
        expect(response.status).toEqual(201);
    });
    it('reads file', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/data/test');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            message: 'Hello'
        });
    });
    it('searches for an unexistent file', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/data/test2');
        expect(response.status).toEqual(404);
    });
});
//# sourceMappingURL=index.spec.js.map