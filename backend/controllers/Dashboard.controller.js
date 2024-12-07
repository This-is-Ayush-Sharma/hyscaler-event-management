const Register = require('../model/register');
const Event = require('../model/event');

exports.dashboard = async (req, res) => {
    try{
        let events = []
        const user = req.user._id;
        if(req.user.account_type === 'attendee'){
            events = await Register.find({user}).populate('event');
        }
        else if(req.user.account_type === 'organiser'){
            events = await Event.find({user});
        }
        return res.status(200).send(events);
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

