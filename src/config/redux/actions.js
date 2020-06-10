export function setScheduling(scheduling) {
    return {
        type: 'SET_SCHEDULING',
        scheduling
    }
}

export function setUserAuthentication(user, permissions) {
    return {
        type: 'SET_DATA_AUTHENTICATION',
        user,
        permissions
    }
}

export function logout() {
    return {
        type: 'LOGOUT',
    }
}

export function setEntities(entities) {
    return {
        type: 'SET_ENTITIES',
        entities
    }
}

export function setGroup(group) {
    return {
        type: 'SET_GROUP',
        group,
    }
}

export function syncroGroups(groups) {
    return {
        type: 'SYNCRO_GROUPS',
        groups,
    }
}

export function setPermissionsGroup(permissions) {
    return {
        type: 'SET_PERMISSIONS_GROUP',
        permissions
    }
}

export function syncroSchedulings(schedulings) {
    return {
        type: 'SYNCRO_SCHEDULINGS',
        schedulings
    }
}

export function setExternalUsers(externalUsers){
    return {
        type: 'SET_EXTERNAL_USERS',
        externalUsers
    }
}
