import React from 'react';
import './SearchElm.css'
import { Input } from 'semantic-ui-react'

export default class SearchElm extends React.Component {
    render(){
        return(
            // <div className='search-elm'>
            //     <input/>
            // </div>
            <div >
                <Input fluid icon='search' placeholder='Search...' className='search-elm' />
            </div>
        )
    }
}