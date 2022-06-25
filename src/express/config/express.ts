/**
 * Module dependencies.
 */

import * as express from "express";
import * as os from "os";
import { NODE_ENV } from "./variables";

const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const chalk = require("chalk");
const helmet = require("helmet");
const cors = require("cors");

export interface IExpress {
    app: express.Application;
    handleErrors: any;
}
export class Express implements IExpress {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.initMiddleware();
        this.initHelmetHeaders();
    }

    static consoleLogMessage(port: string | number) {
        // Logging initialization
        console.log("--");
        console.log(chalk.green(`Environment:\t\t\t\t ${NODE_ENV}`));
        console.log(chalk.green(`Hostname:\t\t\t\t ${os.hostname()}`));
        console.log(chalk.green(`Port:\t\t\t\t\t ${port}`));

        console.log("--");
    }

    private initMiddleware = () => {
        // Showing stack errors
        this.app.set("showStackError", true);

        // Enable jsonp
        this.app.enable("jsonp callback");

        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json({ limit: "30mb" }));
        this.app.use(expressSanitizer());
        this.app.use(
            cors({
                credentials: true,
                origin: [/http:\/\/.*\.*localhost:\d+/],
            })
        );
    };

    private initHelmetHeaders = () => {
        // Use helmet to secure Express headers
        const SIX_MONTHS = 15778476000;
        this.app.use(helmet.frameguard());
        this.app.use(helmet.xssFilter());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.ieNoOpen());
        this.app.use(
            helmet.hsts({
                maxAge: SIX_MONTHS,
                includeSubDomains: true,
                force: true,
            })
        );
    };

    // eslint-disable-next-line
    public handleErrors = (err: any, req: any, res: any, next: any) => {
        console.log(JSON.stringify(err));
        const env = process.env.NODE_ENV || "development";
        if (env !== "development") {
            return res.status(500).send();
        }

        return res.status(err.status || 500).send(err.message || "Something went wrong.");
    };
}
