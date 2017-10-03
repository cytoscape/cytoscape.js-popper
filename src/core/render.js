//Include helper functions and Popper
import Popper from 'popper.js';
const createBoundingBox = require('./createBoundingBox.js');

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (cyElement, userOptions) {
    //Determine element properties to determine hoe to draw popper object
    var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
    var iscyElement = !isCy;
    var isNode = iscyElement && cyElement.isNode();
    var cy = isCy ? cyElement : cyElement.cy();

    //Get Demensions for popper (Set Default to 3,3)
    var dim = createBoundingBox.getPopperObjectDimensions(cyElement, userOptions);


    //Define popper reference object
    var refObject;

    //Override if a reference override is provided
    if (userOptions.refObject) {
        refObject = userOptions.refObject;
    }
    else {
        var refObject = {
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

    //Get Values from scratchpad
    var popperOpts = userOptions.popper;
    popperOpts.placement = popperOpts.placement || 'bottom';
    var targetOpt = userOptions.target;
    var target = null;

    //Get target to bind popper to
    try {
        target = createBoundingBox.getPopperHtmlObject(cyElement, targetOpt);
    }
    catch (e) {
        //Stop creating a popper
        return;;
    }

    //Create and return actual popper object
    var popper = new Popper(refObject, target, popperOpts);

    return popper;


};
