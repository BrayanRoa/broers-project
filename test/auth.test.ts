import request from "supertest";
import { app, server } from "../src/app"; // Importa app y server

describe("Auth Endpoints", () => {
    afterAll(() => {
        server.close(); 
    });
    console.log(server.listen()); 
    it("should log in a user and return a token", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login") 
            .send({
                email: "example@email.com",
                password: "mypassword",
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should return an error for invalid credentials", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login") 
            .send({
                email: "invalid@email.com",
                password: "wrongpassword",
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "invalid password");
    });
});
