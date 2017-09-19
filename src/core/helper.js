
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
        var popper = cyElement.scratch('popper');
        popper.scheduleUpdate();
        return popper;
    }
    //Otherwise create a new popper object
    else {
        //Determine element properties to determine hoe to draw popper object
        var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
        var iscyElement = !isCy;
        var isNode = iscyElement && cyElement.isNode();
        var cy = isCy ? cyElement : cyElement.cy();

        //Get Demensions for popper (Set Default to 3,3)
        var dim = isNode ? {
            get w() {
                return cyElement.renderedOuterWidth();
            },
            get h() {
                return cyElement.renderedOuterHeight();
            }
        } : {
                w: 3,
                h: 3,
            };

        //Define popper object
        var refObject = {
            getBoundingClientRect: function () {
                var pos = isNode ? cyElement.renderedPosition() : undefined;
                var cyOffset = cy.container().getBoundingClientRect();
                if (!pos || pos.x === null || isNaN(pos.x)) {
                    return;
                }
                return {
                    top: pos.y + cyOffset.top + window.pageYOffset,
                    left: pos.x + cyOffset.left + window.pageXOffset,
                    right: pos.x + dim.w + cyOffset.left + window.pageXOffset,
                    bottom: pos.y + dim.h + cyOffset.top + window.pageYOffset,
                    width: dim.w,
                    height: dim.h,
                };
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
                console.log(targetOpt(cyElement));
                console.log('hi');
            } else if (typeof targetOpt === 'string') {
                target = document.getElementById(targetOpt.substr(1));
                if (target === null) {
                    return;
                }
            } else {
                return;
            }
        }
        console.log(targetOpt);
        console.log(refObject);
        console.log(target);
        console.log(popperOpts);
        var popper = new Popper(refObject, target, popperOpts);
        return popper;
    }

};
