import * as go from 'gojs';
import { pallatteNodeTemplate } from '../template/paletteElmTemplate.ts';

const $ = go.GraphObject.make;
// 5月28日，创建一个可以切换的调色板
export default class PalatteCtrler{
    palette = undefined

    constructor(container){
        this.palette = $(go.Palette, container,  // must name or refer to the DIV HTML element{ // share the templates with the main Diagram
            {
              nodeTemplateMap: pallatteNodeTemplate,
            //   linkTemplateMap: this.palLinkTemplateMap,
            //   groupTemplateMap: this.palGroupTemplateMap,
              layout: $(go.GridLayout,{})
            }
        )
    }
}