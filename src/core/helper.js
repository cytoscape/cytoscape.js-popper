import Popper from './popper.js';

//Update popper position
function updatePopperObjectPosition(cyElement) {
    var popper = cyElement.scratch('popper');
    popper.scheduleUpdate();
    return popper;
}

//Return dimensions
function getPopperObjectDimensions(cyElement, isNode) {
    //Set Defaults
    var width = 3;
    var height = 3;

    //Overide with the outer-dimensions if the element is a node
    if (isNode) {
        width = cyElement.renderedOuterWidth();
        height = cyElement.renderedOuterHeight();
    }

    //Return a dimension object
    return { w: width, h: height };
}

//Return the bounding rectangle for the given element
function getPopperBoundingBox(cyElement, cy, isNode, dim) {
    var position;

    if (isNode) {
        position = cyElement.renderedPosition();
    }
    else {
        position = undefined;
    }

    var cyOffset = cy.container().getBoundingClientRect();

    //Exit if position is invalid
    if (!position || position.x == null || isNaN(position.x)){
        return;
    }

    //Return the bounding  box
    return {
        top: position.y + cyOffset.top + window.pageYOffset,
        left: position.x + cyOffset.left + window.pageXOffset,
        right: position.x + dim.w + cyOffset.left + window.pageXOffset,
        bottom: position.y + dim.h + cyOffset.top + window.pageYOffset,
        width: dim.w,
        height: dim.h,
    };
}

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
        return updatePopperObjectPosition(cyElement);
    }
    //Otherwise create a new popper object
    else {
        //Determine element properties to determine hoe to draw popper object
        var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
        var iscyElement = !isCy;
        var isNode = iscyElement && cyElement.isNode();
        var cy = isCy ? cyElement : cyElement.cy();

        //Get Demensions for popper (Set Default to 3,3)
        var dim = getPopperObjectDimensions(cyElement, isNode);

        //Define popper object
        var refObject = {
            getBoundingClientRect: function () {
                return  getPopperBoundingBox(cyElement, cy, isNode, dim);
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

        if (!targetOpt) {
            return;
        } else {
            if (typeof targetOpt === 'function') {
                target = document.getElementById(targetOpt(cyElement));
            } else if (typeof targetOpt === 'string') {
                target = document.getElementById(targetOpt.substr(1));
                if (target === null) {
                    return;
                }
            } else {
                return;
            }
        }
        var popper = new Popper(refObject, target, popperOpts);
        return popper;
    }

};
