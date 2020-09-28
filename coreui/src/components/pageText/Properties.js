const Properties = {
    plastering: {
        "plastering.heading" : "Plastering for one room",
        "number.walls" : "Number of walls :",
        "specify.dimensions.walls" : "Specify all inner walls dimensions and plastering thickness",
        "number.doors" : "Number of doors :",
        "specify.dimensions.doors" : "Specify all doors dimensions",
        "number.windows" : "Number of windows :",
        "specify.dimensions.windows" : "Specify all windows dimensions",
        "ioc.heading" : "Inner walls, Outer walls and Ceiling inputs"
    }
}
export const pageText = (process, key) => {
    
    return Properties[process][key];
    
}
export const createMarkup = theHtml => {
    return {
        __html: theHtml
    };
}