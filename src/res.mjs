function resFunction() {
    let response = {};

    function send(body, statusCode = 200) {
        response = {
            statusCode: statusCode,
            body: JSON.stringify(body),
        };
    }

    function getResponse() {
        return response;
    }

    return {
        'send': send,
        'getResponse': getResponse
    };
}

export const res = resFunction();