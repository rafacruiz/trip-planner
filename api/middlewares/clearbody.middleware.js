
import createHttpError from "http-errors";

export function clearBody(req, res, next) {

    if (!req.body && req.method.includes(['POST', 'PATCH', 'PUT'])) {
        throw createHttpError(400, 'No fields provided for update');
    }
    
    delete req.body?._id;
    delete req.body?.createdAt;
    delete req.body?.updatedAt;

    next();
}