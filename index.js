import { app as APP } from "./src/app.mjs"
import { res } from "./src/res.mjs";

let app = APP(res);

let devs = [
    {
        'id': 1,
        'firstname': 'Davide',
        'lastname': 'Dell\'Erba'
    },
    {
        'id': 2,
        'firstname': 'Gianluca',
        'lastname': 'Fabrizi'
    },
    {
        'id': 3,
        'firstname': 'Gianluca',
        'lastname': 'Benucci'
    },
    {
        'id': 4,
        'firstname': 'Paolo',
        'lastname': 'Romagnoli'
    },
    {
        'id': 5,
        'firstname': 'Andrea',
        'lastname': 'Grassi'
    },
    {
        'id': 6,
        'firstname': 'Simone',
        'lastname': 'Bellezza'
    }
];

app.get('/devs', (req, res) => {
    res.json(devs, 200);
});

// Create
app.post('/devs', (req, res) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    const ids = devs.map(dev => {
        return dev.id;
    });

    const maxId = Math.max(...ids);

    let dev = {
        'id': maxId + 1,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }

    devs.push(dev);

    res.json(dev, 200);
});

// Retrieve
app.get('/devs/{id}', (req, res, id) => {
    let dev = devs.find((entry) => {
        return entry.id === parseInt(id);
    });

    if (!dev) {
        res.json(`Dev ${id} not found`, 404);
    } else {
        res.json(dev, 200);
    }
});

// Update
app.put('/devs/{id}', (req, res, id) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    let updateIndex = devs.map(dev => dev.id).indexOf(parseInt(id));

    if (updateIndex !== -1) {
        devs[updateIndex].firstname = req.body.firstname;
        devs[updateIndex].lastname = req.body.lastname;
        res.json(devs[updateIndex], 200);
    } else {
        res.json(`Dev ${id} not found`, 404);
    }
});

// Delete
app.delete('/devs/{id}', (req, res, id) => {
    // In un mondo ideale, qui faremmo una validazione dei dati in input
    let removeIndex = devs.map(dev => dev.id).indexOf(parseInt(id));

    if (removeIndex !== -1) {
        res.json(devs[removeIndex], 200);
        devs.splice(removeIndex, 1);
    } else {
        res.json(`Dev ${id} not found`, 404);
    }
});

let handler = async (event, context) => {
    res.reset();
    app.handle(event);

    return res.getResponse();
};

export { handler };