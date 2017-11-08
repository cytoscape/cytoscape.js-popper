const createBoundingBox = require('./createBoundingBox');

//Create a reference object for an element
module.exports.getRef = function (target, userOptions) {
    //Determine element properties to determine how to generate a reference object
    var isCy = target.pan !== undefined && typeof target.pan === 'function';
    var iscyElement = !isCy;
    var isNode = iscyElement && target.isNode();
    var cy = isCy ? target : target.cy();

    //Get Dimensions for popper (Set Default to 3,3)
    var dim = createBoundingBox.getPopperObjectDimensions(target, userOptions);

    //Define popper reference object
    var refObject;

    //Override if a reference override is provided
    if (userOptions.refObject) {
        refObject = userOptions.refObject;
    }
    else {
        refObject = {

            //Store copies of dimensions and cyElement objects
            dim: dim,
            cyElement: target,

            //Define the bounding box for the popper target
            getBoundingClientRect: userOptions.boundingBox ? userOptions.boundingBox : function () {
                return createBoundingBox.getPopperBoundingBox(target, cy, isNode, this.dim, userOptions.boundingBox);
            },
            //Dynamically generate the dimension object for height and width
            get clientWidth() {
                var newDim = createBoundingBox.getPopperObjectDimensions(this.cyElement, {});
                this.dim = newDim;
                return newDim.w;
            },
            get clientHeight() {
                var newDim = createBoundingBox.getPopperObjectDimensions(this.cyElement, {});
                this.dim = newDim;
                return newDim.h;
            },
        };
    }

    return refObject;
};