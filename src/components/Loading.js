import React, { Component } from 'react'
import loading from './load.gif'

export class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
               <img src={loading} alt="loading..." style={{width:"50px"}} />
            </div>
        )
    }
}

export default Loading
