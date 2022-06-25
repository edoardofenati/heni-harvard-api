const validURLRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
    "i"
);

export class UrlBuilder {
    baseUrl: string;

    url: string;

    constructor(baseUrl: string) {
        if (!baseUrl) {
            throw new Error("Please provide a base URL");
        }

        if (!validURLRegex.test(baseUrl)) {
            throw new Error("Please provide a valid base URL");
        }

        this.baseUrl = baseUrl;
        this.url = this.baseUrl;
    }

    addQueryString(name: string, value: any) {
        const queryStringElement = `${name}=${encodeURIComponent(value)}`;
        const separator = this.url.indexOf("?") !== -1 ? "&" : "?";
        this.url += separator + queryStringElement;
    }

    addParam(name: string) {
        if (this.url.indexOf("?") !== -1) {
            throw new Error("Cannot add a new param after a query string");
        }
        this.url += `/${encodeURIComponent(name)}`;
    }

    getUrl() {
        return this.url;
    }
}
