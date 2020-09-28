const input = {
    
    numberOfWalls:4,
    wallsProperties:
        [
            {
                length:8,
                width:0.75,
                height:11
            },
            {
                length:8,
                width:0.75,
                height:11
            },
            {
                length:8,
                width:0.75,
                height:11
            },
            {
                length:8,
                width:0.75,
                height:11
            }
        ],
    numberOfDoors:2,
    doorsProperties:
        [
            {
                length:3,
                width:0,
                height:8 
            },
            {
                length:3,
                width:0,
                height:8 
            }
        ],
    numberOfWindows:2,
    windowsProperties:
        [
            {
                length:3,
                width:0,
                height:4 
            },
            {
                length:3,
                width:0,
                height:4    
            }
        ],
    plasteringSurfaces:{
        ceilingPlasterThickness:10,
        innerWallPlasterThickness:12,
        outerWallPlasterThickness:20
    
    },
    innerWallCSRatio:{
        numerator:1,
        denominator:5
    },
    outerWallCSRatio:{
        numerator:1,
        denominator:6
    },
    ceilingCSRatio:{
        numerator:1,
        denominator:4
    }
    
}
const initialData = [
    {
        id: 'Cement',
        quantityRequired: 0,
        quantityUnit: 'bag(s)',
        cost: 0
    },
    {
        id: 'Sand',
        quantityRequired: 0,
        quantityUnit: 'unit(s)',
        cost: 0
    }
    ]
const initialState = {
loading: false,
data: initialData,
error: ''
}
const plasteringReducer = (state=initialState, action) => {
switch (action.type){
    case 'REQUEST':
        return{
            ...state,
            loading: true
        }
    case 'SUCCESS':
        return{
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
    case 'FAILURE':
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    default: return state;
}
}
// const input_One = {
//     numberOfWalls: 0,
//     wallsProperties: [],
//     numberOfDoors: 0,
//     doorsProperties: [],
//     numberOfWindows: 0,
//     windowsProperties: [],
//     plasteringSurfaces:{
//         ceilingPlasterThickness: 0,
//         innerWallPlasterThickness: 0,
//         outerWallPlasterThickness: 0
    
//     },
//     innerWallCSRatio:{
//         numerator: 0,
//         denominator: 0
//     },
//     outerWallCSRatio:{
//         numerator: 0,
//         denominator: 0
//     },
//     ceilingCSRatio: {
//         numerator: 0,
//         denominator: 0
//     }
//     }
export default plasteringReducer;