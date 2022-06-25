export type TPrints = {
    id: number;
    rank: number;
    title: string;
    division: string;
    dimensions: string;
    technique: string;
    dated: string;
    medium: string;
    culture: string;
    provenance: string;
    totalNumber: number;
    number: number;
    images: Array<any>;
};

export type THarvardResponse = {
    info: any;
    records: Array<TPrints>;
};
