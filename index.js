import { app as APP } from "./src/app.mjs"
import { res } from "./src/res.mjs";

let app = APP(res);

app.get('/api', (res) => {
    res.send('Risposta da /api', 200);
});

app.get('/test', (res) => {
    res.send('Risposta da /test', 200);
});

let handler = async (event, context) => {
    app.handle(event.requestContext);

    return res.getResponse();
};

export { handler };