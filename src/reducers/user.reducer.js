export function users(state = {}, action) {
    switch (action.type) {
        case "GET_PROFILE_SUCCESS":
            return {user: action.user};

        default:
            return {}
    }
}