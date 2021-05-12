import User from "../models/User.js";
import requestIp from "request-ip";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";

export const getContext = async (req) => {
    if(!req.user){
        return {}
    }
    const user = await User.findById(req.user._id).lean();
    delete user.password;

    const ip = requestIp.getClientIp(req); 
    const geo = geoip.lookup(ip);
    const md = new MobileDetect(req.headers['user-agent']);
    const context = {
        user,
        ip,
        geo,
        md,
    };
    return context
}