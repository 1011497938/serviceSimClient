
import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';


export default class ToolBar extends React.Component {
    render() {
        return (
            <Menu icon pointing  style={{ background: 'none', cursor: 'pointer', marginBottom:0, marginTop: 0 }}>
                <Menu.Item
                    name='gamepad'
                >
                    <Icon name='gamepad' inverted />
                </Menu.Item>

                <Menu.Item
                    name='video camera'
                >
                    <Icon name='video camera' inverted />
                </Menu.Item>

                <Menu.Item
                    name='video play'
                >
                    <Icon name='video play' inverted />
                </Menu.Item>

            </Menu>
        )
    }
}