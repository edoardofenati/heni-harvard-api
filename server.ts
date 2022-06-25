import * as app from "./src/express/app";

const init = async () => {
    try {
        app.start();
    } catch (e) {
        console.log(e);
        throw e;
    }
};

init().then(() => {
    // console.log("initialised");
});
