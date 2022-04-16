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

    function post(path, cb) {
        routes['POST'].push({
            'path': path,
            'cb': cb,
        });
    }

    function put(path, cb) {
        routes['PUT'].push({
            'path': path,
            'cb': cb,
        });
    }

    function patch(path, cb) {
        routes['PATCH'].push({
            'path': path,
            'cb': cb,
        });
    }

    function del(path, cb) {
        routes['DELETE'].push({
            'path': path,
            'cb': cb,
        });
    }

    function handle(request) {
        let routeParameters = [res];

        let route = routes[request.http.method].find((entry) => {
            let parsedPath = parseRoutePath(entry.path, request.http.path);
            if (parsedPath !== false) {
                routeParameters.push(parsedPath);
                return true;
            }

            return entry.path === request.http.path;
        });

        if (route && (typeof route.cb === 'function')) {
            route.cb(...routeParameters);
        } else {
            res.send('Route not found', 404)
        }
    }

    function parseRoutePath(route, path) {
        let routeParameters = [];
        let match = true;

        const routeParams = route.split('/');
        const pathParams = path.split('/');

        if (routeParams.length !== pathParams.length) {
            return false;
        }

        for (let i = 0; i < routeParams.length; i++) {
            if (routeParams[i] === pathParams[i]) {
                continue;
            } else if (routeParams[i].indexOf('{') !== -1) {
                routeParameters.push(pathParams[i]);
                continue;
            }

            match = false;
            break;
        }

        return match ? routeParameters : false;
    }

    return {
        'get': get,
        'post': post,
        'put': put,
        'patch': patch,
        'del': del,
        'handle': handle
    }
}

export { app };