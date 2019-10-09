// 画了一个画布

import React from 'react';
import DiagramCtrler from './func/diagramCtrler.ts';
import * as go from 'gojs';
import * as d3 from 'd3';
import { randomChoice, toLoc } from '../../manager/commonFunction';
import ForceSimulation from './func/forceSimulation';
import './DrawCanvas.css'
import ElmInfo from '../ui_components/ElmInfo';
import SearchElm from '../ui_components/SearchElm';
import COLOR, { elmType2Color } from '../../data/Color';
import ElmEditor from '../ui_components/ElmEditor';
import ToolBar from '../ui_components/ToolBar';
import FilterBar from '../ui_components/FilterBar';
import ModeDropdown from '../ui_components/ModeDropdown';
import { Button, Segment } from 'semantic-ui-react'

export default class DrawCanvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const { diagramDiv } = this.refs
        const controller = new DiagramCtrler(diagramDiv)
        controller.init()

        const { diagram } = controller
        this.diagram = controller.diagram
        this.controller = controller


        // const nodes = new Array(20).fill(0).map((elm, index) => {
        //     return {
        //         category: randomChoice(Object.keys(elmType2Color)),
        //         key: index.toString(),
        //         // loc: "-570 -330",
        //         name: index.toString(),
        //     }
        // })
        // const links = new Array(70).fill(0).map(elm => {
        //     // console.log(randomChoice(nodes), randomChoice(nodes).key)
        //     return {
        //         from: randomChoice(nodes).key,
        //         to: randomChoice(nodes).key,
        //     }
        // })
        const nodes = [], links = []
        diagram.model = new go.GraphLinksModel(nodes, links);

        // 计算力引导
        // console.log(sim_nodes, sim_links, links)
        const forceSimulation = new ForceSimulation(nodes, links)

        forceSimulation.onTicks((nodes, links) => {
            diagram.model.startTransaction("forceSimulation");
            // console.log(nodes)
            diagram.model.nodeDataArray.forEach(elm => {
                const node = forceSimulation.find(elm)
                if (node) {
                    diagram.model.setDataProperty(elm, 'loc', toLoc(node));
                }
            })
            diagram.model.commitTransaction("forceSimulation");
        })

        // console.log(diagram.nodes)
        // diagram.model.nodeDataArray.forEach(element => {
        //     console.log(element)
        // });
        // diagram.addDiagramListener("ObjectSingleClicked", e => {
        //     var part = e.subject.part;
        //     const {x, y} = part.getDocumentPoint(go.Spot.Center)
        //     console.log(part.data, x, y)
        //     diagram.model.startTransaction("change" + part.key);
        //     diagram.model.setDataProperty(part.data, 'loc', (x+10) + ' ' + y);
        //     diagram.model.commitTransaction("change" + part.key);
        // });
    }

    render() {
        return (
            <div className='draw-canvas' style={{ background: COLOR.LIGHT_BLACK }}>
                <div className='main-part'>
                    <div className='tool-bar'>
                        <ModeDropdown />
                        <ToolBar />
                        <div/>
                        {/* <div/> */}
                        <FilterBar />
                    </div>
                    <div className='diagramDiv' ref="diagramDiv"></div>
                </div>
                <div className='elm-info-list'>
                    <SearchElm />
                    {/* <ElmInfo /> */}
                </div>
                <div className='elm-editor-part'>
                    {/* <Button fluid>仿真</Button> */}
                    <ElmEditor />
                </div>
            </div>
        )
    }
}