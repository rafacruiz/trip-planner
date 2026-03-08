
export function clearBody(req, res, next) {
    
    delete req.body?._id;
    delete req.body?.createdAt;
    delete req.body?.updatedAt;

    next();
}