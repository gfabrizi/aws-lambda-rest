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

app.get('/users', (req, res) => {
    res.json(users, 200);
});

// Create
app.post('/users', (req, res) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    const ids = users.map(user => {
        return user.id;
    });

    const maxId = Math.max(...ids);

    let user = {
        'id': maxId + 1,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }

    users.push(user);

    res.json(user, 200);
});

// Retrieve
app.get('/users/{id}', (req, res, id) => {
    let user = users.find((entry) => {
        return entry.id === parseInt(id);
    });

    if (!user) {
        res.json(`User ${id} not found`, 404);
    } else {
        res.json(user, 200);
    }
});

// Update
app.put('/users/{id}', (req, res, id) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    let updateIndex = users.map(user => user.id).indexOf(parseInt(id));

    if (updateIndex !== -1) {
        users[updateIndex].firstname = req.body.firstname;
        users[updateIndex].lastname = req.body.lastname;
        res.json(users[updateIndex], 200);
    } else {
        res.json(`User ${id} not found`, 404);
    }
});

// Delete
app.delete('/users/{id}', (req, res, id) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    let removeIndex = users.map(user => user.id).indexOf(parseInt(id));

    if (removeIndex !== -1) {
        res.json(users[removeIndex], 200);
        users.splice(removeIndex, 1);
    } else {
        res.json(`User ${id} not found`, 404);
    }
});

let handler = async (event, context) => {
    res.reset();
    app.handle(event);

    return res.getResponse();
};

export { handler };