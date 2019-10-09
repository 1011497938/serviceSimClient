
import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { relative } from 'path';
import FilterCard from './FilterCard';
import COLOR from '../../data/Color';


export default class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'ALL'
    }
  }

  handleClick(event, { name }) {
    const { activeItem } = this.state
    if (activeItem !== name)
      this.setState({ activeItem: name })
  }
  render() {
    const { activeItem } = this.state
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', }}>
        <Menu inverted pointing secondary style={{ margin: 0 }}>
        <Menu.Menu position='right'>
          <Menu.Item
            name='ALL'
            active={activeItem === 'ALL'}
            onClick={this.handleClick.bind(this)}
          />
          <Menu.Item
            name='UserCase'
            active={activeItem === 'UserCase'}
            onClick={this.handleClick.bind(this)}
          />
          <Menu.Item
            name='Participant'
            active={activeItem === 'Participant'}
            onClick={this.handleClick.bind(this)}
          />
          <Menu.Item
            name='SelfDefine'
            active={activeItem === 'SelfDefine'}
            onClick={this.handleClick.bind(this)}
          />
        </Menu.Menu>
        </Menu>
        {
          activeItem === 'SelfDefine' &&
          <div style={{ position: 'absolute', right: 20, top: 60 }}>
            <FilterCard />
          </div>
        }
      </div>
    )
  }
}