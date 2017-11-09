//Update popper position
module.exports.updatePopperObjectPosition = function (target) {
    var popper = target.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Wrap given bounding Box to match popper.js bounding box
module.exports.getPopperBoundingBox = function (target, cy, getPosition, boundingBox) {
    var position = getPosition(target);
    var cyOffset = cy.container().getBoundingClientRect();

    //Exit if position is invalid
    if (!position || position.x == null || isNaN(position.x)) {
        return;
    }

    //Return the bounding  box
    return {
        top: position.y + cyOffset.top + window.pageYOffset,
        left: position.x + cyOffset.left + window.pageXOffset,
        right: position.x + boundingBox.w + cyOffset.left + window.pageXOffset,
        bottom: position.y + boundingBox.h + cyOffset.top + window.pageYOffset,
        width: boundingBox.w,
        height: boundingBox.h,
    };
};

//Return Popper Target (The element to bind popper to)
module.exports.getPopperHtmlObject = function (target, content) {
    var contentObject = null;

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
