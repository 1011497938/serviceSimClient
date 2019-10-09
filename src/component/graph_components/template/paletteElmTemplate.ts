
// 整理存着各种要素的模板

import * as go from 'gojs';
import 'gojs/extensions/Figures'
import COLOR, { elmType2Color } from '../../../data/Color';

const $ = go.GraphObject.make;
const custom_r = 40

const genForPalette = (shape, name) => {
    return (
        $(go.Node, 'Vertical',
            {
                locationObjectName: 'SHAPE',
                locationSpot: go.Spot.Center,
                selectionAdorned: false
            },
            shape,
            $(go.TextBlock,
                { margin: 5, text: name, stroke: 'white' },
                new go.Binding('text', 'text')
            )
        )
    )
}

// 所有控件都包含的属性
const common_node_propety = () => [

]

//一个普通的原型
const CircleNodeTemplate =
    $(go.Node, 'Vertical',
        {
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            selectionAdorned: false
        },
        $(go.Shape, "Ellipse",
            { //第一个图案样式
                width: custom_r,
                height: custom_r,
            },
            { fill: COLOR.DIRTY_WHITE, strokeWidth: 2 },
            new go.Binding('stroke', '', data => {
                const color = elmType2Color[data.category]
                return color || COLOR.GRIEGE
            }),
        ),
        $(go.TextBlock,
            { margin: 5, stroke: COLOR.PURE_BLACK, textAlign: 'center' },
            new go.Binding('text', '', data => data.category.replace('Resource', 'Resource\n').replace('Participant', 'Participant\n')),
        )
    )

const SetNodeTempplate =
    $(go.Node, 'Vertical',
        {
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            selectionAdorned: false
        },
        $(go.Panel, "Auto",
            $(go.Shape, "Rectangle",
                {
                    width: custom_r * 2, height: custom_r / 1.5, margin: 4
                },
                { fill: COLOR.DIRTY_WHITE, strokeWidth: 2 },
                new go.Binding('stroke', '', data => {
                    const color = elmType2Color[data.category]
                    return color || COLOR.GRIEGE
                }),
            ),
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
                    stroke: COLOR.PURE_BLACK,
                    text: '[      ...      ]',
                },
            ),
        ),
        $(go.TextBlock,
            { margin: 5, stroke: COLOR.PURE_BLACK, textAlign: 'center', text: 'Resource\nSet' },
            // new go.Binding('text', '', data => data.category.replace('_', '\n')),
        )
    )

// console.error('lll_ll')
const object2map = (object) => {
    var map = new go.Map<string, go.Node>();
    for (let key in object) {
        map.add(key, object[key])
    }
    return map
}

// 在画布上的要素模板
const pallatteNodeTemplate = object2map({
    '': CircleNodeTemplate,
    ResourceSet: SetNodeTempplate,
})

export {
    pallatteNodeTemplate
}
