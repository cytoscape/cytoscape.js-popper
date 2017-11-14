//Update popper position
module.exports.updatePopperObjectPosition = function (target) {
    let popper = target.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Wrap given bounding Box to match popper.js bounding box
module.exports.getPopperBoundingBox = function (target, userOptions) {

    let {position, cy, getDimensions} = userOptions;
    let cyOffset = cy.container().getBoundingClientRect();
    let dimensions = getDimensions(target);
    let renderedPosition = position(target);
    let scrollY = window.pageYOffset;
    let scrollX = window.pageXOffset;
   
    //Exit if position is invalid
    if (!renderedPosition || renderedPosition.x == null || isNaN(renderedPosition.x)) {
        return;
    }

    //Return the bounding  box
    return {
        top: renderedPosition.y + cyOffset.top + scrollY,
        left: renderedPosition.x + cyOffset.left + scrollX,
        right: renderedPosition.x + dimensions.w + cyOffset.left + scrollX,
        bottom: renderedPosition.y + dimensions.h + cyOffset.top + scrollY,
        width: dimensions.w,
        height: dimensions.h,
    };
};

//Return Popper Target (The element to bind popper to)
module.exports.getPopperHtmlObject = function (target, content) {
    let contentObject = null;

    //If target option is invalid, return error
    if (!(content)) {
        throw new Error("Error : NULL Target");
    }
    //Execute function if user opted for a dyanamic target
    else if (typeof content === 'function') {
        contentObject = document.getElementById(content(target));
    }
    //Treat target option as an ID if  user opted for a static target
    else if (typeof content === 'string') {
        contentObject = document.getElementById(content);
    }
    //Target option is an HTML element
    else if (content instanceof HTMLElement) {
        return content;
    }
    else {
        throw new Error("Error : Target Does Not Exist");
    }

    //Check validity of parsed target
    if (contentObject === null) {
        throw new Error("Error : Target Could Not Be Found");
    } else {
        return contentObject;
    }

};
