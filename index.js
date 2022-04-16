import { app as APP } from "./src/app.mjs"
import { res } from "./src/res.mjs";

let app = APP(res);

let users = [
    {
        'id': 1,
        'firstname': 'John',
        'lastname': 'Doe'
    },
    {
        'id': 2,
        'firstname': 'Jane',
        'lastname': 'Doe'
    },
    {
        'id': 3,
        'firstname': 'Richard',
        'lastname': 'Benson'
    }
];

app.get('/users', (res) => {
    res.json(users, 200);
});

app.get('/users/{id}', (res, id) => {
    let user = users.find((entry) => {
        return entry.id === parseInt(id);
    });

    if (!user) {
        res.json('User not found', 404);
    } else {
        res.json(user, 200);
    }
});

app.get('/test', (res) => {
    res.json('Risposta da /test', 200);
});

let handler = async (event, context) => {
    app.handle(event.requestContext);

    return res.getResponse();
};

export { handler };