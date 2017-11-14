const createBoundingBox = require('./createBoundingBox');

//Create a reference object for an element
module.exports.getRef = function (target, userOptions) {
    //Determine element position
    var position = userOptions.position;

    //Get Dimensions for popper (Set Default to 3,3)
    var dim = userOptions.getDimensions(target);

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
                userOptions.boundingBox = this.dim; 
                return createBoundingBox.getPopperBoundingBox(target, userOptions);
            },
            //Dynamically generate the dimension object for height and width
            get clientWidth() {
                var newDim = userOptions.getDimensions(this.cyElement);
                this.dim = newDim;
                return newDim.w;
            },
            get clientHeight() {
                var newDim = userOptions.getDimensions(this.cyElement);
                this.dim = newDim;
                return newDim.h;
            },
        };
    }

    return refObject;
};