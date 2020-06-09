import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'
import './styles.css'

const getTileSprite = type => {
    switch(type) {
        case 0:
            return 'clear'
        case 2:
            return 'grass'
        case 3:
            return 'tree'
        case 4:
            return 'chest'
        case 5:
            return 'rock'
        case 6:
            return 'tree'
    }
}

const MapTile = props => {
    return <div
        className={`tile ${getTileSprite(props.tile)}`}
        style={{
            height: SPRITE_SIZE,
            width: SPRITE_SIZE
        }}/>
}

const MapRow = props => {
    return <div className="row">
            { props.tiles.map( tile => <MapTile tile={tile}/> ) }
        </div>
}

const Map = props => {
    return (<div
            style={{
                width: '800px',
                height: '480px',
                position: 'relative',
                top: '0px',
                left: '0px',
                border: '4px solid white'
            }}>
            { props.tiles.map( row => <MapRow tiles={row} /> ) }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tiles: state.map.tiles
    }
}

export default connect(mapStateToProps)(Map)