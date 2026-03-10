
import User from '../models/user.model.js';
import Session from '../models/session.model.js';
import createHttpError from "http-errors";

export async function create(req, res) {
    const userData = {
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'bio': req.body.bio,
        'avatar': req.body.avatar
    }

    const user = await User.create(userData);

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

  res.json({ success: true, data: user });
    
}

export async function logout(req, res) {
    await Session.findByIdAndDelete(req.session.id);

    res.status(204).end();
}

export async function verify(req, res) {
    res.json(req.session.user);
}

export async function detail(req, res) {
    if (req.params.id === 'me') {
        res.json(req.session.user);
    } else { 
        const user = await User.findById(req.params.id);

        if (!user) throw createHttpError(404, 'User not found');

        res.json({ success: true, data: user });
    } 
}