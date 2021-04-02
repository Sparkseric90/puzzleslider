import React from 'react';
import Tile from './Tile';
import './mando.jpg';
import './App.css';




export default class Gameboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            originalLocation: [],
            currentLocation: [],
            picture: null,
            win: false
        }
        this.start = this.start.bind(this)
        this.result = this.result.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.locationCheck = this.locationCheck.bind(this)
        this.swapTiles = this.swapTiles.bind(this)
        this.checkWin = this.checkWin.bind(this)
        this.checkZero = this.checkZero.bind(this)
        this.clearPic = this.clearPic.bind(this)
    }
    // When the page is rendered on the screen, It initialize the size of the board, 
    // creates the index array used to tell the original location, and the currentLocation array used to map the divs. 
    // If there is a previous game already inplay, when the page reloads it rerenders on screen.
    componentDidMount() {
        let count = 0
        var newCurrent = []
        var subArr = []
        var indexArr = []
        let x
        // checking for localStorage
        if (localStorage.getItem('position') !== null) {
            x = localStorage.getItem('position').split(',')
            count = 0
            for (let i = 0; i < this.props.rows; i++) {
                for (let j = 0; j < this.props.columns; j++) {
                    subArr.push(Number(x[count]))
                    count++
                }
                newCurrent.push(subArr)
                subArr = []
            }
        } else if (localStorage.getItem('position') === null) {
            // build a 2D array, used as the board of the game.
            for (let i = 0; i < this.props.rows; i++) {
                for (let j = 0; j < this.props.columns; j++) {
                    subArr.push(count)
                    count++
                }
                newCurrent.push(subArr)
                subArr = []
            }
            count = 0
        }
        // creating my win array
        count = 0
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.columns; j++) {
                subArr.push(count)
                count++
            }
            indexArr.push(subArr)
            subArr = []
        }
        this.setState({
            originalLocation: indexArr,
            currentLocation: newCurrent
        })
    }

    componentDidUpdate() {
        localStorage.setItem('position', this.state.currentLocation)
    }
    // my function for completing the image
    result() {
        let count = 0
        var subArr = []
        var indexArr = []
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.columns; j++) {
                subArr.push(count)
                count++
            }
            indexArr.push(subArr)
            subArr = []
        }
        this.setState({
            currentLocation: this.state.originalLocation,
            originalLocation: indexArr
        })
    }

    // used in the Shuffle to find the position of the 0 index
    checkZero() {
        let x = [...this.state.currentLocation]
        let count = 0
        for (let row = 0; row < x.length; row++) {
            let subArr = x[row]
            for (let col = 0; col < subArr.length; col++) {
                let i = x[row][col]
                if (i === 0) {
                    return { row, col }
                }
            }
        }
    }

    // used to shuffle the picture, simulates a user click, by finding the index with zero, 
    // finding all possible moves, randomly choosing a move, and switching the two tiles, repeated 100 times. 
    start() {
        let count = 0
        while (count < 50) {

            let zero = this.checkZero()
            let poss = this.locationCheck(zero)[2]
            let random = Math.floor(Math.random() * poss.length)
            let move = poss[random].toString()

            if (move === 'below') {
                let zeroCheck = this.locationCheck(zero)
                let bottomMove = zeroCheck[0]
                let row = bottomMove.row + 1
                let col = bottomMove.col
                let loc = { row, col }
                this.swapTiles(loc, bottomMove)
            }
            if (move === 'right') {
                let zeroCheck = this.locationCheck(zero)
                let bottomMove = zeroCheck[0]
                let row = bottomMove.row
                let col = bottomMove.col + 1
                let loc = { row, col }
                this.swapTiles(loc, bottomMove)

            }
            if (move === 'above') {
                let zeroCheck = this.locationCheck(zero)
                let bottomMove = zeroCheck[0]
                let row = bottomMove.row - 1
                let col = bottomMove.col
                let loc = { row, col }
                this.swapTiles(loc, bottomMove)

            }
            if (move === 'left') {
                let zeroCheck = this.locationCheck(zero)
                let bottomMove = zeroCheck[0]
                let row = bottomMove.row
                let col = bottomMove.col - 1
                let loc = { row, col }
                this.swapTiles(loc, bottomMove)
            }
            count++
        }
    }

    // checks the location of the specific tile, looks at all its possible moves, and switched tiles if allowed.
    locationCheck(location) {
        let y = location.row
        let x = location.col
        let posibilities = 0
        let zeroLoc = location
        let moves = []

        if (y < this.props.rows - 1) {
            posibilities++
            moves.push('below')
            if (this.state.currentLocation[y + 1][x] === 0) {
                let row = (y + 1)
                let col = (x)
                let answer = ({ row, col })
                zeroLoc = answer
            }
        }
        if (y > 0) {
            posibilities++
            moves.push('above')
            if (this.state.currentLocation[y - 1][x] === 0) {
                let row = (y - 1)
                let col = (x)
                let answer = ({ row, col })
                zeroLoc = answer
            }
        }
        if (x > 0) {
            posibilities++
            moves.push('left')
            if (this.state.currentLocation[y][x - 1] === 0) {
                let row = (y)
                let col = (x - 1)
                let answer = ({ row, col })
                zeroLoc = answer
            }
        }
        if (x < this.props.columns - 1) {
            moves.push('right')
            posibilities++
            if (this.state.currentLocation[y][x + 1] === 0) {
                let row = (y)
                let col = (x + 1)
                let answer = ({ row, col })
                zeroLoc = answer
            }
        }

        return (
            [
                zeroLoc,
                posibilities,
                moves
            ]
        )
    }
    // checks to see if the index array is equal to the current position array.
    checkWin() {
        let one = [...this.state.currentLocation]
        let two = [...this.state.originalLocation]
        let check = false
        if (one.toString() === two.toString()) {
            check = true
        }
        if (check === true) {
            this.setState({
                win: true
            })
        } else {
            this.setState({
                win: false
            })
        }

        // swaps 2 selected tiles. 
    }
    swapTiles(loc, zero) {
        let zeroLoc = zero
        let current = [...this.state.currentLocation]
        let temp = current[loc.row][loc.col]
        current[loc.row][loc.col] = current[zeroLoc.row][zeroLoc.col]
        current[zeroLoc.row][zeroLoc.col] = temp
        this.setState({ currentLocation: current })
    }
    // click function put on every button
    handleClick(index, location) {
        
        let zeroLocation = this.locationCheck(location)[0]
       
        if (zeroLocation === { row: 0, col: 0 }) {
            
            this.swapTiles(location, zeroLocation)
        } else {
            this.swapTiles(location, zeroLocation)
            this.checkWin()
        }
    }
    // changes the picture state when a user uploads a picture.
    handleChange = (event) => {

        let x = event.target.files[0]
        // let url = URL.createObjectURL(event.target.files[0])

        this.setState({ picture : URL.createObjectURL(x)})
    }
    clearPic(){
        if(this.state.picture !== null){
            this.result()
            this.setState({
                picture:null
            })
        }
    }

    render() {
        const alert = this.state.win ? <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>WOW!</strong> Congrats!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> : null




        return (
            <>
                <div className='col-12 d-flex justify-content-around'>
                    <input id='picInput' type="file" onChange={this.handleChange} />
                    <button onClick={this.clearPic} class="btn btn-outline-primary">Clear Picture</button>
                </div>
                <div className='col-12 p-0 d-flex justify-content-around'>
                    {alert}
                </div>
                <div className='pt-3 d-flex justify-content-center container-fluid'>
                    <div className='board row'>
                        {this.state.currentLocation.map((row, rIndex) =>
                            row.map((column, cIndex) =>
                                <Tile width={this.props.columns} picture={this.state.picture} onClick={this.handleClick} index={row, column} key={row, column} row={rIndex} col={cIndex} />
                            ))}
                    </div>
                </div>
                <div className='offset-2 col-8 pt-3 pb-8 d-flex justify-content-around'>
                <button onClick={this.start} class="btn btn-outline-primary">Start!</button>
                <button onClick={this.result} class="btn btn-outline-primary">Solve!</button>
                </div>
            </>
        )
    }
}
