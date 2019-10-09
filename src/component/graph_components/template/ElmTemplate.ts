// 整理存着各种要素的模板

import * as go from 'gojs';
import 'gojs/extensions/Figures'
import COLOR, { elmType2Color } from '../../../data/Color';
import stateManger from '../../../manager/stateManager';

// 定义状态
// 选中的（有框）/未选中的
// 重点突出的(灰度)/没有重点突出的
// 填完的(虚线框，没有颜色)/没有填完的



const $ = go.GraphObject.make;
const custom_r = 50

// 右键下拉框
const nodeMenuBottom = (name, props = {},onClick = (e: go.InputEvent, obj: go.GraphObject)=>{}) =>
    $('ContextMenuButton',
        $(go.TextBlock, name,
            { margin: 8, },
        ),
        props,
        {
            click: onClick,
        }
    )
const nodeContextMenu = $<go.Adornment>('ContextMenu',
    nodeMenuBottom('编辑', {}, 
        (e: go.InputEvent, obj: go.GraphObject)=>{
            var contextmenu = obj.part;  // the Button is in the context menu Adornment
            var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
            // console.log(part.key, e, part, part.data)
            stateManger.edit_elm.set(part.key)
        }
    ),
    nodeMenuBottom('复制', {}, (e: go.InputEvent, obj: go.GraphObject)=>{}),
    nodeMenuBottom('删除', {}, (e: go.InputEvent, obj: go.GraphObject)=>{}),
    // nodeMenuBottom('', {}, (e: go.InputEvent, obj: go.GraphObject)=>{}),
)

const reText = () => [
    $(go.TextBlock,
        // new go.Binding("text", "key"),
        {
            font: "10pt Helvetica, Arial, sans-serif",
            margin: 10,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            fromLinkable: false,
            toLinkable: false,
            // editable: true,
            stroke: "#fff"
        },
        new go.Binding("text", 'name').makeTwoWay()
    )
]

// 所有控件都包含的属性
const common_node_propety = () => [
    // new go.Binding("location", "location").makeTwoWay(),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("portId").makeTwoWay(),
    new go.Binding('key', "id").makeTwoWay(),
    {
        fromLinkable: true,
        cursor: 'pointer',
        toLinkable: true,
        locationObjectName: 'SHAPE', locationSpot: go.Spot.Center,


        fromLinkableDuplicates: true,
        toLinkableDuplicates: true,

        fromSpot: go.Spot.AllSides,    // coming out from top side -- BAD!
        toSpot: go.Spot.AllSides,
    },
    { contextMenu: nodeContextMenu },
]

const outter_props = { //第一个图案样式
    width: custom_r,
    height: custom_r,
    stroke: null,
    fill: COLOR.LIGHT_YELLOW
}
const inner_props = { //第一个图案样式
    width: custom_r - 10,
    height: custom_r - 10,
    stroke: null,
    fill: COLOR.LIGHT_YELLOW
}

//一个普通的原型
const CircleNodeTemplate =
    $(go.Node, 'Auto',
        $(go.Panel, "Auto",
            $(go.Shape, "Ellipse",
                outter_props,
                { fill: COLOR.LIGHT_BLACK, strokeWidth: 2 },
                new go.Binding('stroke', '', data => {
                    const color = elmType2Color[data.category]
                    return color || COLOR.GRIEGE
                }),
            )
        ),
        // 内部圆
        // $(go.Panel, "Auto",
        //     $(go.Shape, "Ellipse",
        //         inner_props,
        //         { fill: COLOR.LIGHT_BLUE }
        //     )
        // ),
        common_node_propety(),
        reText()
    )

const SetNodeTempplate =
    $(go.Node, 'Auto',
        $(go.Panel, "Auto",
            $(go.Shape, "Rectangle",
                {
                    width: custom_r * 2, height: custom_r / 1.5, margin: 4,
                },
                { fill: COLOR.LIGHT_BLACK, strokeWidth: 2 },
                new go.Binding('stroke', '', data => {
                    const color = elmType2Color[data.category]
                    return color || COLOR.GRIEGE
                }),
            ),
        ),
        common_node_propety(),
        $(go.TextBlock,
            // new go.Binding("text", "key"),
            {
                font: "10pt Helvetica, Arial, sans-serif",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                fromLinkable: false,
                toLinkable: false,
                // editable: true,
                stroke: "#fff"
            },
            new go.Binding("text", 'name').makeTwoWay()
        )
    )

const object2map = (object) => {
    var map = new go.Map<string, go.Node>();
    for (let key in object) {
        map.add(key, object[key])
    }
    return map
}

// 在画布上的要素模板
const panelNodeTemplate = object2map({
    '': CircleNodeTemplate,
    // participant: CircleNodeTemplate,

    // resource_class: CircleNodeTemplate,
    // resource_instance: CircleNodeTemplate,
    ResourceSet: SetNodeTempplate,

    // goal: CircleNodeTemplate,

    // ability: CircleNodeTemplate,

    // enviroment: CircleNodeTemplate,
})

export {
    panelNodeTemplate,
    nodeMenuBottom
}
