function resFunction() {
    let response = {};

    function send(body, statusCode = 200) {
        response = {
            statusCode: statusCode,
            body: body,
        };
    }

    function json(body, statusCode = 200) {
        let json;

        try {
            json = JSON.parse(body);
        } catch (e) {
            json = JSON.stringify(body);
        }

        send(json, statusCode)
    }

    function getResponse() {
        return response;
    }

    return {
        'send': send,
        'json': json,
        'getResponse': getResponse
    };
}

export const res = resFunction();