
import createHttpError from "http-errors";

export function clearBody(req, res, next) {

    if (req.headers['content-type']?.includes('multipart/form-data')) {
        return next();
    }

    const hasBody = req.body && Object.keys(req.body).length > 0;

    if (!hasBody && ['POST', 'PATCH', 'PUT'].includes(req.method)) {
        throw createHttpError(400, '¡No fields provided, body empty!');
    }
    
    delete req.body?._id;
    delete req.body?.createdAt;
    delete req.body?.updatedAt;

    next();
}