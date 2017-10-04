const createBoundingBox = require('./createBoundingBox.js');

//Create a reference object for an element
module.exports.getRef= function (cyElement, userOptions) {
    //Determine element properties to determine how to generate a reference object
    var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
    var iscyElement = !isCy;
    var isNode = iscyElement && cyElement.isNode();
    var cy = isCy ? cyElement : cyElement.cy();

    //Get Dimensions for popper (Set Default to 3,3)
    var dim = createBoundingBox.getPopperObjectDimensions(cyElement, userOptions);

    //Define popper reference object
    var refObject;

    //Override if a reference override is provided
    if (userOptions.refObject) {
        refObject = userOptions.refObject;
    }
    else {
        refObject = {
            getBoundingClientRect: userOptions.boundingBox ? userOptions.boundingBox : function () {
                return createBoundingBox.getPopperBoundingBox(cyElement, cy, isNode, dim, userOptions.boundingBox);
            },
            get clientWidth() {
                return dim.w;
            },
            get clientHeight() {
                return dim.h;
            },
        };
    }

    return refObject;
};