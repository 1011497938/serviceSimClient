import React from 'react';
import PaletteCtrler from './func/paletteCtrler.ts';
import './PaletteCanvas.css'
import { Card, Icon, List, Divider } from 'semantic-ui-react'
import * as go from 'gojs';
import COLOR from '../../data/Color';

const elm2subelms = {
    participant: ['Participant', 'ParticipantClass'],
    resource: ['ResourceClass', 'Resource', 'ResourceSet'],
    goal: ['Goal'],
    ability: ['Ability'],
    enviroment: ['Enviroment'],
}

export default class PaletteCanvas extends React.Component {
    // constructor(){

    // }
    componentDidMount() {
        for (let elm in elm2subelms) {
            const subelms = elm2subelms[elm].map(elm => { return { category: elm } })
            const ref = this.refs[elm]

            const paletteCtrler = new PaletteCtrler(ref)
            const { palette } = paletteCtrler
            palette.model = new go.GraphLinksModel(subelms, []);
        }

    }
    render() {
        // 
        return (
            <div className='palette'>
                {
                    Object.keys(elm2subelms).map(elm => {
                        return (
                            <List divided relaxed key={elm}>
                                <List.Item>
                                    {/* <List.Icon name='marker' /> */}
                                    <List.Content>
                                        <List.Header>{elm}:</List.Header>
                                        <List.Description>
                                            <div className='palette-canvas' ref={elm} style={{height: 95*elm2subelms[elm].length}}></div>
                                        </List.Description>
                                    </List.Content>
                                    <Divider />
                                </List.Item>
                            </List>
                        )
                    })
                }

            </div>
        )
    }
}