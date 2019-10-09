import React from 'react';
import './ElmInfo.css'
import { Dropdown, Input } from 'semantic-ui-react'
import COLOR from '../../data/Color';

const tagOptions = [
    {
        key: 'Important',
        text: 'Important',
        value: 'Important',
        label: { color: 'red', empty: true, circular: true },
    },
    {
        key: 'Announcement',
        text: 'Announcement',
        value: 'Announcement',
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: 'Cannot Fix',
        text: 'Cannot Fix',
        value: 'Cannot Fix',
        label: { color: 'black', empty: true, circular: true },
    },
]

// 选择正在看的模式
export default class ModeDropdown extends React.Component {
    render() {
        return (
            <Dropdown
                text='村淘模式'
                options={tagOptions} 
                // search
                fluid
                floating
                style={{color: COLOR.DIRTY_WHITE, marginTop: 15, fontSize: 20,marginLeft: 20, width: 120}}
            >
            </Dropdown>
        )
    }
}