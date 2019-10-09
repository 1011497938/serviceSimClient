import * as go from 'gojs';
import stateManger from '../../../manager/stateManager';
import { panelNodeTemplate } from '../template/ElmTemplate.ts';
import { panelLinkTemplate } from '../template/LinkTemplate.ts';
import { elmStore, linkStore } from '../../../manager/dataStore';


const $ = go.GraphObject.make;


// 所有控制器的父类
export default class DiagramCtrler {
  diagram = undefined

  constructor(diagram) {
    this.diagram = diagram
  }


  // 初始化go，可以传入自定义的参数
  init(diagram_props = {}) {
    // 右键单击
    const diagramContextMenu = $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, '全选'),
        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
        {
          click: (e: go.InputEvent, obj: go.GraphObject) => {
            console.log(e, obj)
          }
        }
      )
    )

    // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
    const diagram = $(go.Diagram, this.diagram,  // must name or refer to the DIV HTML element
      Object.assign({
        // 右键弹框
        contextMenu: diagramContextMenu,
        // maxSelectionCount: 1,
        nodeTemplateMap: panelNodeTemplate,
        linkTemplateMap: panelLinkTemplate,
        // groupTemplateMap: groupTemplateMap,

        // linkingTool: new BPMNLinkingTool(), // defined in BPMNClasses.js
        // relinkingTool: new BPMNRelinkingTool(), // defined in BPMNClasses.js
        // 加格子
        // grid: $(go.Panel, "Grid",
        //   $(go.Shape, "LineH", { stroke: "#d3d3d3ab", strokeWidth: 0.5 }),
        //   $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5, interval: 10 }),
        //   $(go.Shape, "LineV", { stroke: "#d3d3d3ab", strokeWidth: 0.5 }),
        //   $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5, interval: 10 })
        // ),
        // "draggingTool.dragsLink": true,
        "draggingTool.isGridSnapEnabled": true,
        "linkingTool.isUnconnectedLinkValid": false,
        "linkingTool.portGravity": 40,
        "relinkingTool.isUnconnectedLinkValid": false,
        "relinkingTool.portGravity": 40,
        "relinkingTool.fromHandleArchetype":
          $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
        "relinkingTool.toHandleArchetype":
          $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
        "linkReshapingTool.handleArchetype":
          $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
        "rotatingTool.handleAngle": 270,
        "rotatingTool.handleDistance": 30,
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        "undoManager.isEnabled": true
      }, diagram_props)
    );


    // 拖入一个新的元素
    diagram.addDiagramListener("ExternalObjectsDropped", function (diagramEvent) {
      // console.log(diagramEvent.subject, diagramEvent)
      const { subject } = diagramEvent
      var it = subject.iterator;
      while (it.next()) {
        const item = it.value
        const { category, data } = item
        const new_elm = elmStore.create(category)
        const { id, props } = new_elm
        const { Name } = props

        // console.log(key,category)
        diagram.model.startTransaction("change" + id);
        diagram.model.setDataProperty(item.data, 'key', id);
        diagram.model.setDataProperty(item.data, 'name', Name);
        diagram.model.commitTransaction("change" + id);
        // console.log(it, it.value, item.key, item.data.key)
      }
      // subject.forEach(elm => {
      //   console.log(elm, elm.key, elm.data)
      // });

    });

    diagram.addDiagramListener("LinkDrawn", function (diagramEvent) {
      // console.log(diagramEvent.subject, diagramEvent)
      const { subject } = diagramEvent
      const { to, from, category } = subject.data
      const source = elmStore.get(from), target = elmStore.get(to)
      const new_link = linkStore.create(category, from, to, {})

      const { id, props } = new_link
      
      source.addFromRelation(new_link)
      target.addToRelation(new_link)

      diagram.model.startTransaction("change" + id);
      diagram.model.setDataProperty(subject.data, 'key', id);
      diagram.model.setDataProperty(subject.data, 'props', props);
      diagram.model.commitTransaction("change" + id);
      // console.error(subject.data.from, subject.data.target, subject.to)
      // console.log(source, target, new_link)
      // console.log(subject.data.category, subject.data) 
    });

    this.diagram = diagram
  }

}