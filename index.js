// Grazie AWS per non voler supportare degnamente i moduli ESM
// https://github.com/aws/aws-sdk-js-v3/issues/3230
import AWS from "/var/runtime/node_modules/aws-sdk/lib/aws.js";

const { randomUUID } = await import('crypto');
import { app as APP } from "./src/app.mjs"
import { res } from "./src/res.mjs";
import { validateBody, validateUuid } from "./src/validate.mjs";

const docClient = new AWS.DynamoDB.DocumentClient();
let app = APP(res);
let dbParams;

app.get('/devs', async (req, res) => {
    try {
        let devs = await docClient.scan(dbParams).promise();
        res.json(devs.Items, 200);
    } catch (err) {
        res.json(err, 500);
    }
});

// Create
app.post('/devs', async (req, res) => {
    if (!validateBody(req.body)) {
        res.json('Input validation error!', 500);
        return;
    }

    dbParams.Item = {
        'uuid': randomUUID(),
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }

    try {
        await docClient.put(dbParams).promise();
        res.json(dbParams.Item, 200);
    } catch (err) {
        res.json(err, 500);
    }
});

// Retrieve
app.get('/devs/{uuid}', async (req, res, uuid) => {
    if (!validateUuid(uuid)) {
        res.json('Input validation error!', 500);
        return;
    }

    dbParams.Key = { 'uuid': uuid };

    try {
        let dev = await docClient.get(dbParams).promise();

        if (Object.keys(dev).length === 0) {
            res.json(`Dev ${uuid} not found`, 404);
        } else {
            res.json(dev, 200);
        }
    } catch (err) {
        res.json(err, 500);
    }
});

// Update
app.put('/devs/{uuid}', async (req, res, uuid) => {
    if (!validateBody(req.body) || !validateUuid(uuid)) {
        res.json('Input validation error!', 500);
        return;
    }

    dbParams.Key = { 'uuid': uuid };
    dbParams.UpdateExpression = 'set #FN = :fn, #LN = :ln';
    dbParams.ExpressionAttributeNames = {
        '#FN' : 'firstname',
        '#LN' : 'lastname',
    };
    dbParams.ExpressionAttributeValues = {
        ':fn' : req.body.firstname,
        ':ln' : req.body.lastname,
    }

    let dev = {
        'uuid': uuid,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }

    try {
        await docClient.update(dbParams).promise();
        res.json(dev, 200);
    } catch (err) {
        res.json(err, 500);
    }
});

// Delete
app.delete('/devs/{uuid}', async (req, res, uuid) => {
    if (!validateUuid(uuid)) {
        res.json('Input validation error!', 500);
        return;
    }

    dbParams.Key = { 'uuid': uuid };

    try {
        await docClient.delete(dbParams).promise();

        // P.S.: grazie anche a DynamoDB per non darci alcuna evidenza se l'elemento è stato eliminato o no
        res.json('OK', 200);
    } catch (err) {
        res.json(err, 500);
    }
});

let handler = async (event, context) => {
    res.reset();

    dbParams = {
        TableName : 'devs',
    }

    await app.handle(event);

    return res.getResponse();
};

export { handler };