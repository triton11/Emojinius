import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import api from '../api'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 30px;
    display: flex;
  	align-items: center;
  	justify-content: center;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class GamesHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            selectedGame: '',
            games: []
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGames().then(games => {
            this.setState({
                games: games.data.data,
                isLoading: false,
            })
        })
    }

    handleChangeInputCode = async event => {
        const code = event.target.validity.valid
            ? event.target.value
            : this.state.code

        this.setState({ code })
    }

    handleJoinGame = async () => {
        const { code, theme } = this.state

        await api.getAllGames().then(games => {
            const selected = games.data.data.filter(function(g) { return g.code === code; })[0]
            let selectedGame = ''

            if (selected !== undefined) {
                this.props.history.push(`/games/show/${selected._id}`);
            } else {
                window.alert(`No game found for that code.`)
            }
        })
    }

    render() {
    	const { games, code, selectedGame } = this.state
        return (
            <div>
                <Wrapper>
                    <h1 align="center"> Welcome to Sneaky Theater! </h1>
                </Wrapper>
                <Wrapper>
                    <div>
                    	<InputText
                            type="text"
                            placeholder="Enter code..."
                            value={code}
                            onChange={this.handleChangeInputCode}
                        />
                    </div>
                </Wrapper>
                <Wrapper>
                    <a href="#" onClick={this.handleJoinGame} className="nav-link">Join Game</a>
                    or
                    <Link to="/games/create" className="nav-link">
                        Create Game
                    </Link>
                </Wrapper>
                <Wrapper>
                    <a href="https://github.com/triton11/Sneaky-Theater"> Instructions </a>
                </Wrapper>
            </div>
        )
    }
}

export default GamesHome