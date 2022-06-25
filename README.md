# HENI API - Exercise - Edoardo Fenati

## Assumptions and considerations

-   I've been using typescript, expressJs and GraphQL for this exercise.
-   I created a specific Module called 'prints' where almost all the logic sits.
-   The module is divided in three main parts: dataAccess, businessLogic and GraphQL schemas/query (inside the
    Controllers folder). The dataAccess is where the Harvard API call happens and it is called from the businessLogic
    which does the relevant data transformation before returning the data to the handler (in this case the GraphQL
    query).
-   I normally call "controllers" those handlers that uses the businessLogic and return a result to the client. In this
    case it is a GraphQL query, but the same businessLogic could be used for example by a serverless function or a
    standard API route.
-   The prints query is in part hard-coded and in part configurable from GraphQL. I made configurable fields projection
    and the pagination, which are the fields I think it makes sense to control from the front-end.
-   Most of the input validation is done by the GraphQL schema. I only added a few extra checks on positive integers for
    the page size (max 100) and page number.
-   In order to build the Harvard Api request I used a builder design pattern (urlBuilder) to compose all queryString
    params to fetch the right data.
-   I added some e2e tests in the `__tests__` and also some unit the for the urlBuilder.
-   Enviroment variable are set to default values in the file `src/express/config/variables` but can be changed running
    the server with different values for the Env variables

## Available Scripts

In the project directory, you can run:

### `npm run compile`

Compile TS code

### `npm run test`

Run both e2e and unit tests

### `npm start`

Runs the api listening on port 3500

### `npm run build`

Compile, lint and format the code
