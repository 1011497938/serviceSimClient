
const COLOR = {
    YELLOW:  '#eda222',
    LIGHT_YELLOW: '#FFEB3B',
    LIGHT_GOLDEN: '#f6f2cf',

    LIGHT_BLUE: '#128fec',
    DARK_BLUE: '#03415a',

    DARK_GREEN: '#13634e',

    DARK_RED: '#cf5b28',

    BROWN: '#8a4d30',

    GRIEGE: '#e6e1c7',  //米灰色

    WHITE: '#fff',
    DIRTY_WHITE: '#fafafa',

    // UI背景底色
    PURE_BLACK: '#15191b',
    LIGHT_BLACK: '#2d2d2d',
    MAIN_DARK_GRAY: '#22252a',

}


// 属性类型=》颜色
const elmType2Color = {
    Participant: COLOR.DARK_BLUE,
    ParticipantClass: COLOR.LIGHT_BLUE,

    Resource: COLOR.YELLOW,
    ResourceClass: COLOR.LIGHT_YELLOW,
    ResourceSet: COLOR.YELLOW,

    Goal: COLOR.DARK_GREEN,

    Ability: COLOR.DARK_RED,

    Enviroment: COLOR.BROWN,

}
export default COLOR
export {
    elmType2Color,
    
}