import { MetaRelation, META, MetaPropety, } from "./metaData";
import { ResourceSet, Participant, Ability, ResourceClass, Resource, ParticipantClass } from "./object";

// 这里存了所有的属性

// 关系
class PartOf extends MetaRelation{
    // name = 'PartOf'
    dscp = '是...的一部分'

    target_type = META.OBJECT

    is_transitive = true
    // domain = ResourceSet
}

class Possess extends MetaRelation{
    // name = 'Possess'
    dscp = '拥有资源'

    target_type = META.OBJECT
    // inverse_propety = PossessionOf
}

class GoalIs extends MetaRelation{
    // name = 'GoalIs'
    dscp = '目标是'

    target_type = META.OBJECT
}

class MemeberOf extends MetaRelation{
    dscp = '是集合的一部分'

    target_type = META.OBJECT

    domain = [ 'ResourceClass' ]
    range = [ 'ResourceSet' ]
}

class Implement extends MetaRelation{
    dscp = '概念是'
    target_type = META.OBJECT

    domain2range = [
        ['Resource','ResourceClass',],
        ['Participant','ParticipantClass']
    ]
}

class CanUse extends MetaRelation{
    dscp = '拥有使用权'

    target_type = META.OBJECT
    
    domain = [ 'Participant' ]
    range = [ 'Ability' ]
}

class AbilityInput extends MetaRelation{
    dscp = '消耗的资源'

    target_type = META.OBJECT

    domain = [ 'Ability' ]
    range = [ 'ResourceSet', 'Resource' ]
}

class AbilityOutPut extends MetaRelation{
    dscp = '产生的资源'

    target_type = META.OBJECT

    domain = [ 'ResourceSet', 'Resource' ]
    range = [ 'Ability' ]
}


// 属性

class Name extends MetaPropety{
    dscp = '名字是'

    target_type = META.VALUE
    input_value = META.LATERAL

    unique = true
}

class Step extends MetaPropety{
    dscp = '每次要做的'

    target_type = META.VALUE
    input_value = META.SCRIPT
}

// class Id extends MetaPropety{
//     dscp = 'id是'

//     target_type = META.VALUE
//     input_value = META.LATERAL

//     unique = true
// }

// 资源
class Unit extends MetaPropety{
    dscp = '资源的单位'
    target_type = META.VALUE
    input_value = META.LATERAL
}

class Amount extends MetaPropety{
    dscp = '资源的量'
    target_type = META.VALUE
    input_value = META.NUMERICAL
}
class ValidAmount extends MetaPropety{
    dscp = '可用量'
    target_type = META.VALUE
    input_value = META.NUMERICAL
}

// 角色


// 能力

// 目标
class GoalDescription extends MetaPropety{
    dscp = '描述'
    target_type = META.VALUE
    input_value = META.SCRIPT
}


const name2relation = {
    PartOf: new PartOf(),
    Possess: new Possess(),
    GoalIs: new GoalIs(),
    // HasAbility: HasAbility,
    AbilityInput: new AbilityInput(),
    AbilityOutPut: new AbilityOutPut(),

    MemeberOf: new MemeberOf(),
    Implement: new Implement(),
    CanUse: new CanUse(),
}

const name2prop = {
    Unit: new Unit(),
    Amount: new Amount(),
    ValidAmount: new ValidAmount(),
    // Id: new Id(),
    Name: new Name(),
    Step: new Step(),
    GoalDescription: new GoalDescription(),
}


export {
    name2prop,
    name2relation,

}