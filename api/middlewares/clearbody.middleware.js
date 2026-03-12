
import createHttpError from "http-errors";

export function clearBody(req, res, next) {

    if (!req.body && ['POST', 'PATCH', 'PUT'].includes(req.method)) {
        throw createHttpError(400, '¡No fields provided, body empty!');
    }
    
    delete req.body?._id;
    delete req.body?.createdAt;
    delete req.body?.updatedAt;

    next();
}