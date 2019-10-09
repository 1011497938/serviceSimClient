import { MetaObject } from "./metaData";
import { HasAbility,  Possess, GoalIs, Implement } from "./propety";

// 可以添加模板
class ResourceClass extends MetaObject {
    constructor(){
        super()
    }
}

class Resource extends ResourceClass{
    constructor(){
        super()
        this.addProp('Unit')
        this.addProp('Amount')
        this.addProp('ValidAmount')
    }
}

class ResourceSet extends MetaObject{
    constructor(){
        super()
    }
}

class ParticipantClass extends MetaObject{
    constructor(){
        super()
    }
}

class Participant extends MetaObject{
    constructor(){
        super()
    }
}

class Goal extends MetaObject{
    constructor(){
        super()
        this.addProp('GoalDescription')
    }
}

class Ability extends MetaObject{
    constructor(){
        super()
    }
}

class Value extends MetaObject{
    constructor(){
        super()
    }
}

class Enviroment extends MetaObject{
    constructor(){
        super()
    }
}

const name2elm = {
    ResourceClass: ResourceClass,
    Resource: Resource,
    ResourceSet: ResourceSet,
    Ability: Ability,
    Value: Value,
    Enviroment: Enviroment,
    Participant: Participant,
    ParticipantClass: ParticipantClass,
    Goal: Goal,
}

export{
    ResourceClass,
    Resource,
    ResourceSet,
    Ability,
    Value,
    Enviroment,
    Participant,
    ParticipantClass,
    Goal,

    name2elm,
}