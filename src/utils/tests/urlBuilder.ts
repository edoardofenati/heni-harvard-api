import { UrlBuilder } from "../urlBuilder";

export {};

describe("Test urlBuilder", () => {
    it("Valid baseUrl - SUCCESS", async () => {
        const baseUrl = "http://example.com";
        const urlBuilder = new UrlBuilder(baseUrl);

        expect(urlBuilder.getUrl()).toEqual(baseUrl);
    });

    it("Missing baseUrl - FAIL", async () => {
        let expectedErr;

        try {
            // @ts-ignore
            // eslint-disable-next-line
            new UrlBuilder();
        } catch (err) {
            expectedErr = err;
        }

        expect(expectedErr.message).toEqual("Please provide a base URL");
    });

    it("Invalid baseUrl - FAIL", async () => {
        const invalidUrl = "blablabla";
        let expectedErr;

        try {
            // @ts-ignore
            // eslint-disable-next-line
            new UrlBuilder(invalidUrl);
        } catch (err) {
            expectedErr = err;
        }

        expect(expectedErr.message).toEqual("Please provide a valid base URL");
    });

    it("Adding queryString params - SUCCESS", async () => {
        const baseUrl = "http://example.com";
        const baseUrlWithQS = "http://example.com?test=newValue";
        const urlBuilder = new UrlBuilder(baseUrl);

        urlBuilder.addQueryString("test", "newValue");

        expect(urlBuilder.getUrl()).toEqual(baseUrlWithQS);
    });

    it("Adding param - SUCCESS", async () => {
        const baseUrl = "http://example.com";
        const baseUrlWithParam = "http://example.com/newParam";
        const urlBuilder = new UrlBuilder(baseUrl);

        urlBuilder.addParam("newParam");

        expect(urlBuilder.getUrl()).toEqual(baseUrlWithParam);
    });

    it("Adding param after queryString - FAIL", async () => {
        let expectedErr;

        const baseUrl = "http://example.com";
        const urlBuilder = new UrlBuilder(baseUrl);
        urlBuilder.addQueryString("test", "newValue");

        try {
            urlBuilder.addParam("newParam");
        } catch (err) {
            expectedErr = err;
        }

        expect(expectedErr.message).toEqual("Cannot add a new param after a query string");
    });
});
