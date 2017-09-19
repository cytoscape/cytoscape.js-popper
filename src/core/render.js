//Include helper functions and Popper
const helper = require('./helper.js');
import Popper from './popper.js';


//Generate a options object to wrap the given user options
module.exports.createPopperOptionsObject = function (userOptions) {
    var options = Object.assign({}, userOptions);

    //If id is undefined, created a unique id based on time
    if (!(userOptions.id)) {
        options.id = 'cy-popper-target-' + (Date.now() + Math.round(Math.random() + 10000));
    }

    return options;
};

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (cyElement) {
    //If popper object already exists, update its position
    if (cyElement.scratch('popper')) {
        return helper.updatePopperObjectPosition(cyElement);
    }
    //Otherwise create a new popper object
    else {
        //Determine element properties to determine hoe to draw popper object
        var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
        var iscyElement = !isCy;
        var isNode = iscyElement && cyElement.isNode();
        var cy = isCy ? cyElement : cyElement.cy();

        //Get Demensions for popper (Set Default to 3,3)
        var dim = helper.getPopperObjectDimensions(cyElement, isNode);

        //Define popper object
        var refObject = {
            getBoundingClientRect: function () {
                return helper.getPopperBoundingBox(cyElement, cy, isNode, dim);
            },
            get clientWidth() {
                return dim.w;
            },
            get clientHeight() {
                return dim.h;
            },
        };

        var popperOpts = cyElement.scratch('popper-opts');
        popperOpts.placement = popperOpts.placement || 'bottom';
        var targetOpt = cyElement.scratch('popper-target');
        var target = null;

        //Get target to bind popper to
        try{
        target = helper.getPopperObjectTarget(cyElement, targetOpt);
        }
        catch(e){
            //Stop creating a popper
            return;;
        }

        //Create and return actual popper object
        var popper = new Popper(refObject, target, popperOpts);
        return popper;
    }

};
