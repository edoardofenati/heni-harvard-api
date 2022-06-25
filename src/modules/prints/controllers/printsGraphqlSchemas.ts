import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { getPrints } from "../businessLogic/getPrints";

const graphqlFields = require("graphql-fields");

export const PrintQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        prints: {
            type: new GraphQLList(PrintType),
            args: {
                page: {
                    type: GraphQLInt,
                },
                pageSize: {
                    type: GraphQLInt,
                },
            },
            resolve: async (root, args, ctx, info) => {
                const projections = Object.keys(graphqlFields(info));
                const result = await getPrints(args.page, args.pageSize, projections);
                return result;
            },
        },
    }),
});

const PrintType = new GraphQLObjectType({
    name: "Print",
    description: "A Print from Harvard API",
    fields: () => ({
        title: { type: GraphQLString },
        id: { type: GraphQLInt },
        rank: { type: GraphQLInt },
        division: { type: GraphQLString },
        dated: { type: GraphQLString },
        medium: { type: GraphQLString },
        number: { type: GraphQLInt },
        provenance: { type: GraphQLString },
        technique: { type: GraphQLString },
        culture: { type: GraphQLString },
        dimensions: { type: GraphQLString },
        totalNumber: { type: GraphQLInt },
        images: { type: new GraphQLList(PrintImageType) },
    }),
});

const PrintImageType = new GraphQLObjectType({
    name: "Image",
    description: "A Print Image",
    fields: () => ({
        baseimageurl: {
            type: GraphQLString,
        },
    }),
});
