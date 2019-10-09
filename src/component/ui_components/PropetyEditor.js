import React from 'react';
import { Container, Segment, Button, Divider, Header, Input, Menu, Icon, Label, List, Dropdown, Modal, Checkbox } from 'semantic-ui-react';
import './ElmEditor.css'
import COLOR from '../../data/Color';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';
import { elmStore, linkStore } from '../../manager/dataStore';
import { name2elm } from '../../data/object';
import { name2prop, name2relation } from '../../data/propety';
import LinkEditor from './LinkEditor';
import { typeOf } from '../../manager/commonFunction';

export default class PropertEditor extends React.Component {
    render() {
        const { propety, elm, value } = this.props
        // style={{ marginLeft: 10 }} 
        return (
            <Segment key={propety}>
                <Input defaultValue={propety} disabled />
                {'  :  '}
                <Input defaultValue={value} />
                <PropetySetter propety={propety} key={propety.name}/>
                {/* style={{width: 200}} */}
                {/* {this.randerPropConstrain(key)} */}
                {/* 显示一些属性 */}
                {/* <Icon name='setting' size='large' as='a' className='setting' /> */}
            </Segment>
        )
    }
}

class PropetySetter extends React.Component {
    constructor(){
        super()
        this.state = {
            data : {

            }
        }
    }
    componentDidMount(){
        const propety = name2prop[this.props.propety]
        let {data} = this.state
        data = Object.assign(data, propety)
        this.setState({data: data})
    }
    render() {
        // const propety = name2prop[this.props.propety]
        // const { constrain_readonly } = propety
        const {data} = this.state
        const { constrain_readonly } = data

        return (
            <Modal
                trigger={
                    <Button icon
                        style={{ marginLeft: 10 }}
                    >
                        <Icon name='setting' />
                    </Button>
                }
            >
                <Modal.Header>{data.class_name}</Modal.Header>
                <Modal.Content>
                    {/* <Modal.Description>
                        description: {propety.dscp}
                    </Modal.Description> */}
                    {/* <Segment.Group style={{width: '50%'}}> */}
                        {
                            Object.keys(data).map((key,index) => {
                                const value = data[key]
                                let component = undefined

                                if(typeOf(value)==='boolean'){
                                    component = 
                                    <Checkbox key={key} toggle checked={value} label={key} style={{margin: 10}}/>
                                }else{
                                    component = <Input key={key} label={key} value={value} style={{margin: 10}}/>
                                }

                                if(index%2===0){
                                    
                                }
                                return (
                                    // <Segment key={key} compact>
                                        component
                                        // {/* <Input label={key} value={value} /> */}
                                    // </Segment>
                                )
                            })
                        }
                    {/* </Segment.Group> */}
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red'>
                        <Icon name='remove' /> No
                    </Button>
                    <Button>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}