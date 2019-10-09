import { observable, action, computed } from "mobx";
import dataStore from "./dataStore";

class StateManager{
    edit_elm= observable.box(undefined)  //被选中的元素
    edit_link= observable.box(undefined)  //被选中的元素
}


var stateManger = new StateManager()
export default stateManger
