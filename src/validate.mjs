function validateBody (body = {}) {
    let isValid = (body.firstname && body.lastname);

    if (isValid) {
        isValid = isValid && (body.firstname.length !== 0);
        isValid = isValid && (body.lastname.length !== 0);
    }

    return isValid;
}

function validateUuid (uuid = '') {
    return uuid.length === 36;
}

export { validateBody, validateUuid };