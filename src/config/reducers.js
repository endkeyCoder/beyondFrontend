const USERS_INITIAL_STATE = {
    infoUser: {
        user: '',
        name: '',
        token: '',
        email: ''
    }
}

export function userSession(state = USERS_INITIAL_STATE, action) {
    switch (action.type) {
        case 'OPEN_SESSION':
            return { ...state, infoUser: action.infoUser }

        default:
            return state
    }
}