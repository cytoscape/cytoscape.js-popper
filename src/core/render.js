//Include helper functions and Popper
//import Popper from 'popper.js';
const createBoundingBox = require('./createBoundingBox.js');
const createReferenceObject = require('./createReferenceObject.js');

//Fix Popper.js webpack import conflict (Use .default if using webpack)
let Popper = require('popper.js');
let EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
    Popper = Popper.default;
}

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (cyElement, userOptions) {
    //Define popper reference object
    var refObject = createReferenceObject.getRef(cyElement, userOptions);

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
        return;
    }

    //Create and return actual popper object
    var popper = new Popper(refObject, target, popperOpts);

    return popper;


};
