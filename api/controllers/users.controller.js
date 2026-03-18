
import User from '../models/user.model.js';
import Session from '../models/session.model.js';
import createHttpError from "http-errors";
import { cloudinary } from '../config/multer.config.js';
import fs from "fs/promises";

export async function create(req, res) {
    
    const user = await User.create({
            'username': req.body.username,
            'email': req.body.email,
            'password': req.body.password,
            'bio': req.body.bio,
            'avatar': req.body.avatar
        });

    res.json({ success: true, data: user });
}

export async function login(req, res) {

    const { email, password } = req.body;

    if (!email || !password ) throw createHttpError(400, 'Fields required');

    const user = await User.findOne({ email });

    if (!user) throw createHttpError(401, 'Invalid email or password');

    const match = await user.checkPassword(password);

    if (!match) throw createHttpError(401, 'Invalid email or password');

    const session = await Session.create({ user: user.id });

    res.cookie("sessionId", session.id, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SECURE === "true" ? "none" : undefined,
    });

    res.json(user);   
}

export async function logout(req, res) {
    await Session.findByIdAndDelete(req.session.id);

    res.status(204).end();
}

export async function verify(req, res) {
    res.json(req.session.user);
}

export async function detail(req, res) {
    const id = (req.params.userId === 'me') ? req.session.user.id : req.params.userId;

    const user = await User.findById(id)
        .populate('trips')
        .populate('tripsJoined');

    if (!user) throw createHttpError(404, 'User not found');

    res.json(user);
}

export async function update(req, res) {

    delete req.body.email;
    delete req.body.username;

    const criteria = {};

    if (req.body.bio) criteria.bio = req.body.bio;
    if (req.body.password) criteria.password = req.body.password;

    Object.assign(req.session.user, criteria);

    if (req.file) {
        const result = await cloudinary.uploader
        .upload(
            req.file.path, {
                public_id: `avatar_${ req.session.user.id }`,
                overwrite: true
           }
        );

        req.session.user.avatar = result.url;

        await fs.unlink(req.file.path);
    }

    await req.session.user.save();
    
    res.json(req.session.user);
}