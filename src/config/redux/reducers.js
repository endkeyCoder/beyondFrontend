
const INITIAL_STATE = {
    schedulings: [],
    authRoutes: [],
    user: {
        data: {},
        permissions: []
    },
    entities: [],
    groups: {
        data: [
            {
                name: null
            }
        ],
        permissions: []
    },
    externalUsers: []
}

export function schedulingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_SCHEDULINGS':
            return {
                ...state,
                schedulings: state.schedulings
            }
        case 'SET_SCHEDULING':
            return {
                ...state,
                schedulings: [...state.schedulings, action.scheduling],
            }
        case 'SYNCRO_SCHEDULINGS':
            return {
                ...state,
                schedulings: action.schedulings
            }

        default:
            return state
    }
}

export function authRoutesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_AUTH_ROUTES':
            return {
                ...state,
                authRoutes: state.authRoutes
            }

        default:
            return state;
    }
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_DATA_AUTHENTICATION':
            return {
                ...state,
                user: {
                    data: action.user,
                    permissions: action.permissions
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                user: {
                    data: {},
                    permissions: []
                }
            }
        default:
            return state;
    }
}

export function entitiesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTITIES':
            return {
                ...state,
                entities: action.entities
            }

        default:
            return state;
    }
}

export function groupsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_GROUP':
            return {
                ...state,
                groups: {
                    data: [...state.groups.data, action.group],
                    permissions: [...state.groups.permissions]
                }
            }
        case 'SYNCRO_GROUPS':
            return {
                ...state,
                groups: {
                    data: action.groups,
                    permissions: [...state.groups.permissions]
                }
            }
        case 'SET_PERMISSIONS_GROUP':
            return {
                ...state,
                groups: {
                    data: [...state.groups.data],
                    permissions: action.permissions
                }
            }

        default:
            return state;
    }
}

export function externalUsersReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_EXTERNAL_USERS':
            return {
                ...state,
                externalUsers: action.externalUsers
            }

        default:
            return state;
    }
}