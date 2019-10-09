// 这里存了所有的模板
import * as go from 'gojs';
import COLOR from '../../../data/Color';
import { nodeMenuBottom } from './ElmTemplate.ts';
import { name2relation } from '../../../data/propety';
import { randomChoice } from '../../../manager/commonFunction';
import { linkStore } from '../../../manager/dataStore';
import stateManger from '../../../manager/stateManager';

const $ = go.GraphObject.make;

const linkSelectionAdornmentTemplate = //线选中之后的颜色
  $(go.Adornment, "Link",
    $(go.Shape,
      // isPanelMain declares that this Shape shares the Link.geometry
      { isPanelMain: true, fill: null, stroke: COLOR.WHITE, strokeWidth: 0 })  // use selection object's strokeWidth
  );

const linkContextMenu = $<go.Adornment>('ContextMenu',
  [
    nodeMenuBottom('编辑', {}, (e: go.InputEvent, obj: go.GraphObject) => {
      var contextmenu = obj.part;
      var part = contextmenu.adornedPart;
      stateManger.edit_link.set(part.data.key)
      // console.log(part,part.data,part.key, stateManger.edit_link.get())
    })
    // , ...Object.keys(name2relation).map(elm => nodeMenuBottom(elm, {},
    //   (e: go.InputEvent, obj: go.GraphObject) => {
    //     var contextmenu = obj.part;
    //     var part = contextmenu.adornedPart;
    //     // console.log(part.key, e, part, part.data)
    //     var { diagram } = contextmenu
    //     const click_postion = diagram.lastInput.viewPoint
    //     // console.error(.x, diagram.lastInput.viewPoint.y)
    //     diagram.model.startTransaction("change link category");
    //     diagram.model.setDataProperty(part.data, 'category', elm);
    //     diagram.model.commitTransaction("change link category");

    //     // console.log(part, part.data.key)
    //     linkStore.get(part.data.key).type = elm
    //   }),
    // ),
  ]   //问题是现在显示了所有的关系类型
)

const common_link_propety = () => [
  // new go.Binding("points").makeTwoWay(),
  { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
  { relinkableFrom: true, relinkableTo: true, reshapable: true },
  // 防止交叉
  {
    // routing: go.Link.AvoidsNodes,
    corner: 4,
    curve: go.Link.JumpGap,
    // curve: go.Link.Bezier,
    // curve: go.Link.Scale,
    reshapable: true,
    resegmentable: true,
    relinkableFrom: true,
    relinkableTo: true,
  },
  { contextMenu: linkContextMenu },
]

// 这里都是常用的连线
// 普通的连线
const commonLinkTemplate =
  $(go.Link,       // the whole link panel
    common_link_propety(),
    $(go.Shape, { fill: null, stroke: COLOR.WHITE, strokeWidth: 2 }),  //定义线的颜色
    // isPanelMain declares that this Shape shares the Link.geometry
    // { isPanelMain: true, fill: COLOR.WHITE, stroke: COLOR.WHITE, strokeWidth: 0 }
    // ),  // use selection object's strokeWidth  
    $(go.TextBlock,
      {
        textAlign: "center",
        font: "10pt helvetica, arial, sans-serif",
        stroke: COLOR.WHITE,
        margin: 2,
        minSize: new go.Size(10, NaN),
        // editable: true
      },
      // new go.Binding("text").makeTwoWay()，
      new go.Binding('text', '', data => {
        return data.category || '未设置'
      }),
    ),
    $(go.Shape,  // the arrowhead
      { fromArrow: "BackwardTriangle", stroke: COLOR.WHITE }
    ),
    $(go.Shape,  // the arrowhead
      { toArrow: "Triangle", stroke: COLOR.WHITE }
    ),
  );

const object2map = (object) => {
  var map = new go.Map<string, go.Node>();
  for (let key in object) {
    map.add(key, object[key])
  }
  return map
}

// 在画布上的要素模板
const panelLinkTemplate = object2map({
  '': commonLinkTemplate,
})

export {
  panelLinkTemplate
}
