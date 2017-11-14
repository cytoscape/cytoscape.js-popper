const createBoundingBox = require('./createBoundingBox');

//Create a reference object for an element
module.exports.getRef = function (target, userOptions) {
    //Get Dimensions for popper (Set Default to 3,3)
    let dim = userOptions.getDimensions(target);

    //Define popper reference object and cy reference  object
    let refObject = {

        //Store copies of dimensions and cyElement objects
        cyElement: target,

        //Define the bounding box for the popper target
        getBoundingClientRect: userOptions.boundingBox ? userOptions.boundingBox : function () {
            return createBoundingBox.getPopperBoundingBox(target, userOptions);
        },
        //Dynamically generate the dimension object for height and width
        get clientWidth() {
            let newDim = userOptions.getDimensions(this.cyElement);
            return newDim.w;
        },
        get clientHeight() {
            let newDim = userOptions.getDimensions(this.cyElement);
            return newDim.h;
        },
    };


    return refObject;
};