import React from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'

import './styles.css'


const DeathModal = props => {
    return <div>
        <button className="restart" onClick={restart}> RESTART </button>
    </div>
}

const restart = () => {
    window.location.reload(false); 
}
export default DeathModal