import React from 'react'
import { connect } from 'react-redux'
import FightModal from './fight'
import DeathModal from  './dead'

import './styles.css'

function renderModal(props) {
    switch(props.type) {
        case 'FIGHT':
            return <FightModal />
        case 'YOU DIED':
            return <DeathModal />
    }
}

function Modal(props) {
    console.log("MODAL")
    return (
    <div
        style={{ display: props.visible ? 'block' : 'none' }}
        className='modal'>
        <h1>{props.type}!</h1>
        <div>{renderModal(props)}</div>
    </div>
    )
}

function mapStateToProps(state) {
  return {
    ...state.combat
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: (type) => {
      dispatch({type: 'OPEN_MODAL'})
    },
    closeModal: () => {
      dispatch({type: 'CLOSE_MODAL'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)