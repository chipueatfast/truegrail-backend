import { isProduction } from '~/util/environment';
 
export default function (req, res, next) {
    res.header("Access-Control-Allow-Origin", isProduction() ? "http://128.199.134.167:82" : "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PATCH")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS" || req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
}