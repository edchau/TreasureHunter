const initialState = {
    enemy: {}
}

const monsterReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'MONSTER':
            return {
                ...action.payload
            }
        case 'MONSTER_DEAD':
            return {
                enemy: {}
            }
        default:
            return state
    }
}

export default monsterReducer