import axios from "axios";
import { HARVARD_API_KEY, HARVARD_API_URL } from "../../../express/config/variables";
import { UrlBuilder } from "../../../utils/urlBuilder";
import { THarvardResponse } from "../types";

// I picked the following as the possible and default projections
const defaultHarvardProjections = [
    "id",
    "rank",
    "title",
    "division",
    "dimensions",
    "technique",
    "dated",
    "medium",
    "culture",
    "provenance",
    "images",
];

const defaultPageSize = 10;

const sortBy = "rank";
const sortOrder = "desc";
const verificationLevel = 4; // This corresponds to the 'Best' standard

export const getPrintsByPageSorted = async (
    page: number,
    pageSize?: number,
    projections?: Array<string>
): Promise<THarvardResponse> => {
    pageSize = pageSize || defaultPageSize;

    // taking the intersection between the input projections which may contain computed fields (like number) and the defaultHarvardProjections
    if (projections?.length) {
        projections = defaultHarvardProjections.filter((x) => projections.includes(x));
    }

    const projectonsStr = projections ? projections.join(",") : defaultHarvardProjections.join(",");

    const queryBuilder = new UrlBuilder(HARVARD_API_URL);
    queryBuilder.addParam("object");
    queryBuilder.addQueryString("apikey", HARVARD_API_KEY);
    queryBuilder.addQueryString("classification", "Prints");
    queryBuilder.addQueryString("page", page);
    queryBuilder.addQueryString("size", pageSize);
    queryBuilder.addQueryString("sort", sortBy);
    queryBuilder.addQueryString("sortorder", sortOrder);
    // querystring parameter for querying prints with 'Best' standard and at least one image
    queryBuilder.addQueryString("q", `imagecount:>0 AND verificationlevel:${verificationLevel}`);
    queryBuilder.addQueryString("fields", projectonsStr);

    const url = queryBuilder.getUrl();

    try {
        const response = await axios.get(url);
        return response?.data || [];
    } catch (err) {
        throw new Error(`Error retrieving pages with params`);
    }
};
