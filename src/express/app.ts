import { Router } from "express";

import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { IExpress, Express } from "./config/express";
import { PrintQueryType } from "../modules/prints/controllers/printsGraphqlSchemas";
import { PORT } from "./config/variables";

const express = require("express");

const expressServer: IExpress = new Express();
export const router: Router = express.Router();
const expressApp = expressServer.app;
const server = require("http").Server(expressApp);

const initRoutes = () => {
    expressApp.use(router);
    expressApp.use("/graphql", graphqlHTTP({ schema: new GraphQLSchema({ query: PrintQueryType }), graphiql: true }));
};

export const start = () => {
    expressApp.use(expressServer.handleErrors);
    initRoutes();

    server.listen(PORT, async () => {
        Express.consoleLogMessage(PORT);
    });
};

export const shutdown = () =>
    new Promise<void>((resolve) => {
        console.info("Closing app");
        server.unref();
        server.close(() => {
            console.info("App closed");
            resolve();
        });
    });
