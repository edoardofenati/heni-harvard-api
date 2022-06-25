import { getPrintsByPageSorted } from "../dataAccess/getPrintsData";
import { TPrints } from "../types";

export const getPrints = async (
    page: number,
    pageSize: number,
    projections?: Array<string>
): Promise<Array<TPrints>> => {
    try {
        if (page <= 0) {
            throw new Error("'page' should be a positive integer");
        }

        // this is th Harvard API range
        if (pageSize <= 0 || pageSize > 100) {
            throw new Error("'pageSize' should be a an integer between 1 and 100");
        }

        const rawData = await getPrintsByPageSorted(page, pageSize, projections);
        const totalNumber = rawData.info.totalrecords;
        const pageNumber = rawData.info.page;
        const pageSizeResult = rawData.info.totalrecordsperquery;
        const prints = rawData.records;

        prints.map((print: TPrints, i: number) => {
            print.number = (pageNumber - 1) * pageSizeResult + i + 1;
            print.totalNumber = totalNumber;
        });

        return prints;
    } catch (err) {
        return err;
    }
};
