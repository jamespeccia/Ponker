import {cookies} from "./cookies";

export function authHeader() {
    let token = cookies.get("user");
    return {'Authorization': 'Bearer ' + token};
}
