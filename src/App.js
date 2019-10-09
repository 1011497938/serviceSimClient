import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown, Input, Search, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { autorun } from 'mobx';
import stateManger from './manager/stateManager';
import dataStore from './manager/dataStore';

import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import GoldenLayout from 'golden-layout';
import DrawCanvas from './component/graph_components/DrawCanvas';
import PaletteCanvas from './component/graph_components/PaletteCanvas';
import Nav from './component/ui_components/Nav';
import SearchElm from './component/ui_components/SearchElm';
import ModeDropdown from './component/ui_components/ModeDropdown';
import COLOR from './data/Color';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render(){
    return (
      <div className='app'>
        <div style={{background: COLOR.PURE_BLACK}}>
          <Nav/>
        </div>
        <div className='palette-div'  style={{background: COLOR.DIRTY_WHITE}}>
          {/* <ModeDropdown/> */}
          <PaletteCanvas/>
        </div>
        <DrawCanvas/>
      </div>
    )
  }
}

