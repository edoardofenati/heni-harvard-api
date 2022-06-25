import axios from "axios";
import * as app from "../../src/express/app";

const rpc = axios.create({
    baseURL: "http://localhost:3500",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    proxy: false,
});

beforeAll(
    () =>
        new Promise<void>(async (resolve) => {
            app.start();
            resolve();
        })
);

afterAll(
    () =>
        new Promise<void>(async (resolve) => {
            await app.shutdown();
            resolve();
        })
);

describe("POST /graphql", () => {
    it("Get prints with (existing) projected fields - SUCCESS", async () => {
        const query = JSON.stringify({ query: "{prints(page: 1) {title dated division}}" });

        const response = await rpc.post("/graphql", query);
        expect(response.status).toEqual(200);
        expect(response.data.data.prints.length).toEqual(10);
        expect(response.data.data.prints[0]).toHaveProperty("title");
        expect(response.data.data.prints[0]).toHaveProperty("dated");
        expect(response.data.data.prints[0]).toHaveProperty("division");
    });

    it("Get prints with (existing) projected fields with page of size 30 - SUCCESS", async () => {
        const pageSize = 30;
        const query = JSON.stringify({ query: `{prints(page: 1, pageSize: ${pageSize}) {title dated division}}` });

        const response = await rpc.post("/graphql", query);
        expect(response.status).toEqual(200);
        expect(response.data.data.prints.length).toEqual(pageSize);
        expect(response.data.data.prints[0]).toHaveProperty("title");
        expect(response.data.data.prints[0]).toHaveProperty("dated");
        expect(response.data.data.prints[0]).toHaveProperty("division");
    });

    it("Get prints with the right number and total - SUCCESS", async () => {
        const pageSize = 10;
        const pageNumber = 2;
        const query = JSON.stringify({
            query: `{prints(page: ${pageNumber}, pageSize: ${pageSize}) {title dated division number totalNumber}}`,
        });

        const response = await rpc.post("/graphql", query);
        expect(response.status).toEqual(200);
        expect(response.data.data.prints[0].number).toEqual(11);
        expect(response.data.data.prints[0]).toHaveProperty("number");
        expect(response.data.data.prints[0]).toHaveProperty("totalNumber");
    });

    it("Get prints with (non-existing) projected fields - FAIL", async () => {
        const query = JSON.stringify({ query: "{prints(page: 1) {title dated division dummy}}" });

        let expectedErr;
        try {
            await rpc.post("/graphql", query);
        } catch (err) {
            expectedErr = err;
        }

        expect(expectedErr.response.status).toEqual(400);
    });

    it("Get prints with negative page - FAIL", async () => {
        const query = JSON.stringify({ query: "{prints(page: -1) {title dated division}}" });

        const response = await rpc.post("/graphql", query);

        expect(response.data.errors[0].message).toEqual("'page' should be a positive integer");
    });

    it("Get prints with negative page Size over 100 - FAIL", async () => {
        const query = JSON.stringify({ query: "{prints(page: 1, pageSize:150) {title dated division}}" });

        const response = await rpc.post("/graphql", query);

        expect(response.data.errors[0].message).toEqual("'pageSize' should be a an integer between 1 and 100");
    });
});
