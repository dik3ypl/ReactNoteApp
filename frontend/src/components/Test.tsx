import React, { Component } from 'react'

export default class Test extends Component {
    render() {
        const count = 0
        return (
            <div>
                {count && <h1>Text: {count}</h1>}
            </div>
        )
    }
}
