import React from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'

import './styles.css'

const endCombat = () => {
    store.dispatch({
        type: 'HIDE_MODAL',
        payload: {
            type: '',
            enemy: {}
        }
    })
    store.dispatch({
        type: 'TAKE_DAMAGE',
        payload: {
            ...store.getState().player,
            log: ""
        }
    })
}

const FightModal = props => {
    const monster = store.getState().monster.enemy
    return <div className="combatContainer">
        <div className={`monster ${monster.name}`} />
        <div className="hero" />
        <p className="combatInfo">
            Enemy Health: {monster.health} &nbsp;&nbsp;
            Your Health: {store.getState().player.health} &nbsp;&nbsp;
            <button className="actions" onClick={() => heal(monster)}>Heal</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="actions" onClick={() => attack(monster)}>Attack</button>
            <textarea
                className="log"
                value={store.getState().player.log}
                readonly
            />
        </p>
        
    </div>
}

const monsterDamage = (monster) => {
    switch(monster) {
        case 'treeMons':
            return Math.floor(Math.random()*2+1)
        case 'pumpkin':
            return Math.floor(Math.random()*4+2)
        case 'ghost':
            return Math.floor(Math.random()*3+2)
    }
}

const monsterAttack = (monster, prevLog) => {
    const dmg = monsterDamage(monster.name)
    store.dispatch({
        type: 'TAKE_DAMAGE',
        payload: {
            ...store.getState().player,
            health: store.getState().player.health-dmg,
            log: prevLog + " and took " + dmg + " damage"
        }
    })
    if (store.getState().player.health <= 0) {
        store.dispatch({
            type: 'SHOW_MODAL',
            payload: {
                type: 'YOU DIED',
            }
        })
    }
}

const damage = () =>  {
    return Math.floor(Math.random()*4+2)
}

const attack = (monster) => {
    const dmg = damage()
    store.dispatch({
        type: 'MONSTER',
        payload: {
            enemy: {...store.getState().monster.enemy,
                health: store.getState().monster.enemy.health-dmg
            }
        }
    })
    if (store.getState().monster.enemy.health <= 0) {
        store.dispatch({
            type: 'MONSTER_DEAD',
        })
        endCombat()
    } else {
        monsterAttack(monster, "You dealt " + dmg + " damage")
    }
}

const heal = (monster) => {
    const curHealth  = store.getState().player.health
    const dmg = damage()
    let health = (curHealth+dmg)
    health = health > 40 ? 40 : health
    if (curHealth < 40) {
        store.dispatch({
            type: 'TAKE_DAMAGE',
            payload: {
                ...store.getState().player,
                health
            }
        })
        monsterAttack(monster, "You healed " + dmg + " points of health")
    }
}

const mapStateToProps = state => {
    return {
      ...state
    }
  }


export default connect(mapStateToProps)(FightModal)