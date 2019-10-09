// import { NameIs } from "./propety"
import deepcopy from 'deepcopy'

// 整理存儲元數據
const META = {
    OBJECT: 'OBJECT',
    VALUE: 'VALUE',
    SCRIPT: 'SCRIPT',
    ANNOTATION: 'ANNOTATION',

    FUNC: 'FUNC',
    INVERSE_FUNC: 'INVERSE_FUNC',
    TRANS: 'TRANS',
    SYMMETRIC: 'SYMMETRIC',

    NUMERICAL: 'NUMERICAL',
    ENUM: 'ENUM',
    LATERAL: 'LATERAL',

    Participant: 'Participant',

    Resource: 'Resource',
    ResourceClass: 'ResourceClass',
    ResourceSet: 'ResourceSet',

    Goal: 'Goal',

    Ability: 'Ability',

    Enviroment: 'Enviroment',
}

class MetaTriple {
    constructor(){
        this.class_name = this.constructor.name
    }
    name = undefined           //属性名，唯一
    id = undefined
    dscp = undefined           //属性注释

    cardinality = 1

    is_state = false       //是否是被考虑到模型的参数

    allValuesFrom = undefined
    someValuesFrom = undefined

    range = undefined      //对象
    domain = undefined     //作用域
    domain2range = undefined //两头的关系

    unique = false          //唯一的

    // 可以修改的
    constrain_readonly = false
    readonly = false

    required = false  //必须的
    checkValid(){
        return true
    }
}

// 只是用来验证关系
class MetaRelation extends MetaTriple{
    // constructor(){
    //     super()
    // }
    // propety_type = undefined   //函数属性(Functional Property)、 反函数属性(Inverse Functional Property)、传递属性(Transitive Property)、对称属性(Symmetric Property)

    is_transitive = false
    is_symmetric = false
    inverse_propety = undefined //对应的反函数属性

    source = undefined //
    target = undefined //{object: , prop: }
    props = {}

    read_only = false //不能修改

    canLinkBetween(source_type, target_type){
        if(this.range && !this.range.includes(target_type)){
            return false
        }
        if(this.domain && !this.domain.includes(source_type)){
            return false
        }

        const {domain2range} = this
        if(domain2range){
            for (let index = 0; index < domain2range.length; index++) {
                const [source, target] = domain2range[index];
                // console.log((source_type===source && target_type===target) , target_type, source, target, this.class_name)
                // debugger
                if( (source_type===source && target_type===target) || (target_type===source && source_type===target) ){
                    // debugger
                    return true
                }
            }
            return false            
        }
        return true
    }
}

class MetaPropety extends MetaTriple{
    target_type = undefined    //属性类型  Value、Script、Annotation

    input_value = undefined   // Lateral, Enum, Value, FloatValue（浮动的）, Array

    dispersed = false   //离散的

    values = []

    default = undefined
    checkValid(){
        return true
    }
}

class MetaObject{
    constructor(){
        this.addProp('Name')
        // this.addProp('Id')
        this.addProp('Step')
        this.class_name = this.constructor.name
    }

    // state = {}  //存状态
    id = undefined
    name = undefined
    from_relations = new Set()  //存关系
    to_relations = new Set()
    relations = new Set()
    props = {}   //存属性

    graph_state = {
        completed: false,
        wrong: false
    }  //存在图上的状态

    get state(){
        const state = {}
        for(let key in this.props){

        }
        // for(let key in this.from_relations){

        // }
        return state
    }

    // getProp(){

    // }

    set(props){
        const former_props = deepcopy(this.props)
        Object.assign(this.props, props)
        if(!this.checkValid){
            this.props = former_props
            console.error(props, this,'不符合要求')
        }
    }

    addProp(prop_name){
        if(this.props[prop_name])
            console.error(this, '已存在', prop_name, this.props[prop_name])
        this.props[prop_name] = []
    }

    addFromRelation(relation){
        this.from_relations.add(relation)
        this.addRelation(relation)
    }
    addToRelation(relation){
        this.to_relations.add(relation)
        this.addRelation(relation)
    }

    // {from: to: name: prop: }
    addRelation(relation){
        // this.addFromRelation()
        // this.addToRelation()
        this.relations.add(relation)
    }

    checkValid(){
        return true
    }

    // 实例化
    instantiate(){
        return 
    }

    getIdentifyName(){
        return this.props.Name + '(' + this.id + ')'
    }
}

const id_set = new Set()
var id_pointer = 0
const addUniqueId = id => {
    if(id_set.has(id))
        console.error(id, '已经被用到了')
    id_set.add(id)
}
const createUniqueId = ()=>{
    do {
        id_pointer++
    } while(id_set.has(id_pointer))
    addUniqueId(id_pointer)
    return id_pointer.toString()
}


export{
    MetaPropety,
    MetaRelation,
    MetaObject,
    META,

    addUniqueId,
    createUniqueId,
}
