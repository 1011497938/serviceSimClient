import React from 'react';
import './ElmInfo.css'
import { Card, Icon, List, Table, Checkbox } from 'semantic-ui-react'
import { strSimply } from '../../manager/commonFunction';

// 存属性的表
export default class FilterCard extends React.Component {
    render() {
        const width = 500
        const elm_types = ['participant', 'resource', 'goal', 'ability', 'enviroment']
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        {
                            elm_types.map(elm =>
                                <Table.HeaderCell>{strSimply(elm, 3)}</Table.HeaderCell>
                            )
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        elm_types.map(elm =>
                            <Table.Row>
                                <Table.Cell>{strSimply(elm,4)}</Table.Cell>
                                {
                                    elm_types.map(elm =>
                                        <Table.Cell><Checkbox/></Table.Cell>
                                    )
                                }
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
        )
    }
}