import React from 'react';
import './App.css';
import './mando.jpg';


export default class Tile extends React.Component {
    constructor(props){
        super(props)
    }
    render() {

        const num = this.props.index
        const col = this.props.col
        const row = this.props.row
        const actualLoc = { row, col }
        let x =num % 4
        let y = Math.floor(num/this.props.width)
        const imgY = y * -100
        const imgX = x * -100
        const myStyle = {
            marginTop: imgY,
            marginLeft: imgX
        }
        return (
            <div
                id={`${'tile' + this.props.index}`}
                className='border col-3 tile'
                
                onClick={() => this.props.onClick(this.props.index, actualLoc)}
            >
                <img style={myStyle} className='img' src={`${this.props.picture === null ? process.env.PUBLIC_URL + './logo.svg' : this.props.picture}`}
                ></img>
                {this.props.index}
            </div>
        )
    }
}
