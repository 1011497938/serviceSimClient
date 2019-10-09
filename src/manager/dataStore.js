import deepcopy from 'deepcopy'
import {ResourceSet, name2elm} from '../data/object'
import { createUniqueId, META } from '../data/metaData'
import Meta from 'antd/lib/card/Meta'

const resouce = new ResourceSet()
class DataStore {

}


var dataStore = new DataStore()

class Company {
    constructor(){
        this.id2obj = {}
        this.objs = new Set()
    }
    get(id){
        if(!this.id2obj[id]){
            console.error(id, '没有')
        }
        return this.id2obj[id]
    }
}
// 存储元素
class ElmStore extends Company{
    create(elm_name){
        // console.error(elm_name, META.ResourceSet)
        const elmClass = name2elm[elm_name]
        // console.error(META.ResourceSet ,elmClass, elm_name, name2elm)
        const elm = new elmClass(), unique_id = createUniqueId()
        elm.set({Name: unique_id})
        elm.id = unique_id
        this.id2obj[unique_id] = elm
        this.objs.add(elm)

        return elm
    }
}

class LinkStore extends Company{
    create(link_type, soruce_id, target_id, props){
        const unique_id = createUniqueId()
        const new_link = {
            id: unique_id,
            type: link_type,
            soruce: soruce_id,
            target: target_id,
            props: props
        }
        this.id2obj[unique_id] = new_link
        this.objs.add(new_link)
        return new_link
    }
}

const linkStore = new LinkStore(),
      elmStore = new ElmStore()

// console.error(elmStore.create('ResourceSet'))
export default dataStore
export {
    linkStore,
    elmStore,
}