//Update popper position
module.exports.updatePopperObjectPosition = function (cyElement) {
    var popper = cyElement.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Return dimensions
module.exports.getPopperObjectDimensions = function (cyElement, userOptions) {
    //Set Defaults
    var width = cyElement.width();
    var height = cyElement.height();

    //Overide with the outer-dimensions if a bounding box is provided
    if (userOptions.boundingBox) {
        width = userOptions.boundingBox.w;
        height = userOptions.boundingBox.h;
    }

    //Return a dimension object
    return { w: width, h: height };
};

//Wrap given bounding Box to match popper.js bounding box
module.exports.getPopperBoundingBox = function (cyElement, cy, isNode, dim, boundingBox) {
    var position;

    //Create a bounding box if one isn't provided

    if (isNode) {
        position = cyElement.renderedPosition();
    }
    else {
        position = cyElement.midpoint();
    }

    var cyOffset = cy.container().getBoundingClientRect();

    //Exit if position is invalid
    if (!position || position.x == null || isNaN(position.x)) {
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
};

//Return Popper Target (The element to bind popper to)
module.exports.getPopperHtmlObject = function (cyElement, targetOpt) {
    var target = null;

    //If target option is invalid, return error
    if (!(targetOpt)) {
        throw new Exception("Error : NULL Target");
    }
    //Execute function if user opted for a dyanamic target
    else if (typeof targetOpt === 'function') {
        target = document.getElementById(targetOpt(cyElement));
    }
    //Treat target option as an ID if  user opted for a static target
    else if (typeof targetOpt === 'string') {
        target = document.getElementById(targetOpt);
    }
    //Target option is an HTML element
    else if (targetOpt instanceof HTMLElement){
        return targetOpt;
    }
    else {
        throw new Exception("Error : Target Does Not Exist");
    }

    //Check validity of parsed target
    if (target === null) {
        throw new Exception("Error : Target Could Not Be Found");
    } else {
        return target;
    }

};
