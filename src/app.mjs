function app(res) {
    let routes = {
        'GET': [],
        'POST': [],
        'PUT': [],
        'PATCH': [],
        'DELETE': [],
    };

    function get(path, cb) {
        routes['GET'].push({
            'path': path,
            'cb': cb,
        });
    }

    function handle(request) {
        // The find() method returns the first element in the provided array that satisfies the provided testing
        // function. If no values satisfy the testing function, undefined is returned.
        let route = routes[request.http.method].find((entry) => {
            return entry.path === request.http.path;
        });

        if (route && (typeof route.cb === 'function')) {
            route.cb(res);
        } else {
            res.send('Route not found', 404)
        }
    }

    return {
        'get': get,
        'handle': handle
    }
}

export { app };