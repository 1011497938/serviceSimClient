import React from 'react';
import './ElmInfo.css'
import { Card, Icon, List } from 'semantic-ui-react'

// 存属性的表
export default class ElmInfo extends React.Component {
    render() {
        return (
            <Card style={{marginTop: 20, zIndex: 31, opacity: 0.95}}>
                <Card.Content>
                    <Card.Header>村淘</Card.Header>
                </Card.Content>
                <Card.Content>
                    <div className='palatte-canvas' ref='p1'>
                        <List>
                            <List.Item>
                                <List.Icon name='folder'/>
                                <List.Content>
                                    <List.Header>State</List.Header>
                                    {/* <List.Description>Source files for project</List.Description> */}
                                    <List.List>
                                        <List.Item>
                                            <List.Icon name='folder' />
                                            <List.Content>
                                                <List.Header>
                                                    {/* <input/> */}
                                                    id:
                                                </List.Header>
                                                <List.Description>Your site's theme</List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='folder' />
                                            <List.Content>
                                                <List.Header>
                                                    {/* <input/> */}
                                                    id:
                                                </List.Header>
                                                {/* <List.Description>Your site's theme</List.Description> */}
                                            </List.Content>
                                        </List.Item>
                                    </List.List>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='folder'/>
                                <List.Content>
                                    <List.Header>Constrain</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='folder'/>
                                <List.Content>
                                    <List.Header>Reltion</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}