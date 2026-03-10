
import createHttpError from "http-errors";
import Activity from '../models/activity.model.js';

export async function create(req, res) {

    const tripCurrent = req.trip;
    
    const activity = await Activity.create({ 
        title: req.body.title, 
        trip: tripCurrent.id,
        author: req.session.user.id
    });
    
    res.json({ success: true, data: {
        title: activity.title,
        trip: activity.trip,
        author: activity.author
    } });
}

export async function update(req, res) {

    const activity = await Activity.findById(req.params.activityId);

    if (!activity) throw createHttpError(404, "Activity not found");

    Object.assign(activity, { completed: !activity.completed });

    await activity.save();

    res.json({ success: true });
}

export async function remove(req, res) {
    
    await Activity.findByIdAndDelete(req.params.activityId);

    res.status(204).end();
}