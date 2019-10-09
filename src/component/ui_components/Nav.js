import React from 'react';
import './Nav.css'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default class Nav extends React.Component {
    render() {

        return (
            <div className='nav'>
                <div className='system-title'>
                    {/* 天樞 */}
                </div>
                <div>
                    <Menu vertical fluid inverted icon>
                        <Menu.Item>
                            <Icon name='user secret' inverted />
                        </Menu.Item>
                        <Menu.Item>
                            <Icon name='chevron left' inverted />
                        </Menu.Item>
                    </Menu>
                </div>
                <div></div>
                <Menu vertical fluid inverted icon>
                    <Menu.Item>
                        <Icon name='grid layout' />
                    </Menu.Item>

                    <Menu.Item>
                        <Icon name='pencil alternate' />
                    </Menu.Item>


                    <Menu.Item>
                        <Icon name='globe' />
                    </Menu.Item>

                    {/* <Dropdown item text='杝' labeled  icon=''>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='edit' text='Edit Profile' />
                        </Dropdown.Menu>
                    </Dropdown> */}

                </Menu>
            </div>
        )
    }
}