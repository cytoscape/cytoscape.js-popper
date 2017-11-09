const createBoundingBox = require('./createBoundingBox');

//Create a reference object for an element
module.exports.getRef = function (target, userOptions) {
    //Determine element position
    var position = userOptions.position;

    //Get Dimensions for popper (Set Default to 3,3)
    var dim = createBoundingBox.getPopperObjectDimensions(target, userOptions);

    //Define popper reference object and cy reference  object
    var cy = userOptions.cy;
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
                return createBoundingBox.getPopperBoundingBox(target, cy, position, this.dim, userOptions.boundingBox);
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