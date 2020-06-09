import store from '../../config/store'
import  { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

const handleMovement = player => {

    const monsters = [ {name:'treeMons', health:30}, 
                {name:'pumpkin', health:15}, 
                {name:'ghost', health:20} ]

    const getNewPosition = (oldPos, direction) => {
        switch(direction) {
            case 'WEST':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
            case 'EAST':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
        }
    }

    const getSpriteLocation = (direction, walkIndex) => {
        switch(direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
        }
    }

    const getWalkIndex = () => {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 8 ? 0 : walkIndex+1;

    }

    const observeBoundaries = (oldPos, newPos) => {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
                (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE);
    }

    const observeImpassable = (oldPos, newPos) => {
        const tiles  = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        if (nextTile == 4) {
            alert("Congratulations!")
        }
        return nextTile < 5
    }

    const dispatchMove = (direction, newPos) => {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                spriteLocation: getSpriteLocation(direction, walkIndex),
                direction,
                walkIndex,
                health: store.getState().player.health
            }
        })
    }

    const attemptMove = direction => {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)
        if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
            dispatchMove(direction, newPos)
            randomFight(newPos);
        }
    }

    const handleKeyDown = e => {
        switch(e.keyCode) {
            case 37:
                return attemptMove('WEST')
            case 38:
                return attemptMove('NORTH') 
            case 39:
                return attemptMove('EAST')
            case 40:
                return attemptMove('SOUTH')
            default:
                console.log(e.keyCode)
        }
    }

    const randomFight = (newPos) => {
        const fightChance = Math.random() * 10
        const tiles  = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        if( fightChance > 8 && nextTile == 2 ) {
            store.dispatch({
                type: 'MONSTER',
                payload: {
                    enemy: randomMonster()
                }
            })
            store.dispatch({
                type: 'SHOW_MODAL',
                payload: {
                    type: 'FIGHT',
                }
            })
        }
    }

    const randomMonster = () => {
        return monsters[Math.floor(Math.random()*monsters.length)]
    }

    window.addEventListener('keyup', (e) => {
        if (!store.getState().combat.visible) {
            handleKeyDown(e)
        }
    })

    return player
}

export default handleMovement