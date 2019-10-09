import React from 'react';
import { Container, Segment, Button, Divider, Header, Input, Menu, Icon, Label, List, Dropdown } from 'semantic-ui-react';
import './ElmEditor.css'
import COLOR from '../../data/Color';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';
import { elmStore, linkStore } from '../../manager/dataStore';
import { name2elm } from '../../data/object';
import { name2prop, name2relation } from '../../data/propety';
import LinkEditor from './LinkEditor';
import PropertEditor from './PropetyEditor';

export default class ElmEditor extends React.Component {
    constructor() {
        super()
        this.state = {
            edit_elm: undefined,
            edit_link: undefined,
        }
    }

    componentDidMount() {
        const onSelectElmChange = autorun(() => {
            const edit_elm_key = stateManger.edit_elm.get()
            this.setState({ edit_elm: elmStore.get(edit_elm_key), edit_link: undefined })
        })
        const onSelectLinkChange = autorun(() => {
            const edit_link_key = stateManger.edit_link.get()
            console.log(edit_link_key)
            this.setState({ edit_link: linkStore.get(edit_link_key), edit_elm: undefined })
        })
    }


    randerPropConstrain(prop_name) {
        const { edit_elm, edit_link } = this.state
        const prop = name2prop[prop_name]
        console.log(prop_name, name2prop)
        if (!prop) {
            // console.error(this.state.edit_elm, prop_name, '不存在')
            return
        }
        const tags = []
        for (let key in prop) {
            const elm = prop[key]
            switch (key) {
                case 'values': break;
                case 'input_values': break;
                case 'class_name': break;
                case 'unique':
                    if (elm) {
                        tags.push(key)
                    }
                    break;
                    ;
                case 'dscp':
                    if (elm) {
                        tags.push(elm)
                    }
                    break;
                default:
                    if (elm) {
                        tags.push(key + ':' + elm)
                    }
                    ;
            }
        }
        return tags.map((elm, index) => {
            return (
                <Label as='a' tag key={index} style={{ marginLeft: 20, marginTop: 5 }}>
                    {elm}
                </Label>
            )
        })
    }
    render() {
        const { edit_elm, edit_link } = this.state
        // name2elm
        // name2prop
        // name2relation
        // horizontal 
        // style={{ background: COLOR.DIRTY_WHITE, color: COLOR.PURE_BLACK }}
        // 
        return edit_elm ? (
            <Segment style={{ background: COLOR.DIRTY_WHITE }} key={edit_elm.id}>
                <Menu icon>
                    <Menu.Item
                        header
                    // style={{fontSize: 30}}
                    >
                        Element:
                        {edit_elm.props.name}({edit_elm.id})
                    </Menu.Item>

                    <Menu.Menu position='right'
                        onClick={() => stateManger.edit_elm.set(undefined)}
                    >
                        <Menu.Item>
                            <Icon name='delete' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Divider />
                <Header as='h4'>propety:</Header>
                <Segment.Group>
                    {
                        Object.keys(edit_elm.props).map(key => {
                            const { props } = edit_elm
                            return (
                                <PropertEditor key={key} propety={key}  value={props[key]} elm={edit_elm}/>
                                // <Segment key={key}>
                                //     <Input label={key} placeholder={props[key]} />
                                //     {/* style={{width: 200}} */}
                                //     {this.randerPropConstrain(key)}
                                //     {/* 显示一些属性 */}
                                //     <Icon name='setting' size='large' as='a' className='setting'/>
                                // </Segment>
                            )
                        })
                    }
                </Segment.Group>

                <Divider />
                <Header as='h4'>relation:</Header>
                <Segment.Group>
                    <Segment>
                        {
                            [...edit_elm.relations].map(relation => {
                                const { id, category, props, soruce: source, target } = relation
                                return (
                                    <LinkEditor relation={relation} key={id} />
                                )
                            })

                        }
                    </Segment>
                    {
                        [...edit_elm.relations].length === 0 && <Segment />
                    }
                </Segment.Group>

                <Button.Group attached='top'>
                    <Button>Give Up</Button>
                    <Button.Or />
                    <Button>Save</Button>
                </Button.Group>
            </Segment>
        ) : (
                edit_link ? (
                    <Segment style={{ background: COLOR.DIRTY_WHITE }} key={edit_link.id}>
                        <Menu icon>
                            <Menu.Item
                                header
                            // style={{fontSize: 30}}
                            >
                                Relation:
                                {/* {edit_elm.props.name} */}
                                ({edit_link.id})
                    </Menu.Item>

                            <Menu.Menu position='right'
                                onClick={() => stateManger.edit_link.set(undefined)}
                            >
                                <Menu.Item>
                                    <Icon name='delete' />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <Divider />
                        <Header as='h4'>propety:</Header>
                        <LinkEditor relation={edit_link} />
                    </Segment>
                ) : <div></div>
            )
    }
}

// class propety