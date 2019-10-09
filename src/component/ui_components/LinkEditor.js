import React from 'react';
import { Container, Segment, Button, Divider, Header, Input, Menu, Icon, Label, List, Dropdown } from 'semantic-ui-react';
import './ElmEditor.css'
import COLOR from '../../data/Color';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';
import { elmStore } from '../../manager/dataStore';
import { name2elm } from '../../data/object';
import { name2prop, name2relation } from '../../data/propety';

export default class LinkEditor extends React.Component {
    constructor(){
        super()
        this.state = {
            hi: false
        }
    }
    render(){
        const {relation} = this.props
        const { id, category, props, soruce: source, target } = relation
        return (
            <List>
            <List.Item>
                id:{id + '  '} 
                (
                <Dropdown
                    defaultValue={source}
                    selection
                    options={
                        [
                            {
                                key: source,
                                text: elmStore.get(source).getIdentifyName(),
                                value: source,
                                // description: elmStore.get(soruce).dscp,
                            }
                        ]
                    }
                />
                )-[
            <Dropdown
                    defaultValue={category}
                    selection
                    options={
                        Object.keys(name2relation).map((name, index) => {
                            return {
                                key: name,
                                text: name,
                                value: name,
                                description: name2relation[name].dscp,
                            }
                            // <Dropdown.Item key={index} text={elm} description={name2relation[elm].dscp} />
                        }).filter(elm=>{
                            const relation = name2relation[elm.value]
                            return relation.canLinkBetween(elmStore.get(source).class_name, elmStore.get(target).class_name)
                        })
                    }
                />
                ]->(
                <Dropdown
                    defaultValue={target}
                    selection
                    options={
                        [
                            {
                                key: target,
                                text: elmStore.get(target).getIdentifyName(),
                                value: target,
                                // description: elmStore.get(soruce).dscp,
                            }
                        ]
                    }
                />
                )
            </List.Item>
            {
                Object.keys(props).map(key => {
                    return (
                        <List.Item key={key}>
                            <Input defaultValue={key} />
                            <Input defaultValue={props[key]} style={{ marginLeft: 10 }} />
                            <Button icon
                                onClick={() => {
                                }}
                                style={{ marginLeft: 10 }}
                            >
                                <Icon name='delete' />
                            </Button>
                            <Button icon
                                onClick={() => {

                                }}
                                style={{ marginLeft: 10 }}
                            >
                                <Icon name='checkmark' />
                            </Button>
                        </List.Item>
                    )
                })
            }
            <List.Item>
                <Button icon fluid
                    onClick={() => {
                        relation.props[''] = undefined
                        this.setState({ hi: !this.state.hi })
                    }}
                >
                    <Icon name='add circle' />
                </Button>
                {/* <Input placeholder='propety name' />
                <Input placeholder='propett value' style={{marginLeft: 10}}/> */}
            </List.Item>
        </List>
        )
    }
}