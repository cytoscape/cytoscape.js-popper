const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');

//Create a popper object (This is for use on the core)
module.exports.popper = function (userOptions) {
  return popperRenderer.createPopperObject(this, appendValues(this, userOptions));
};


//Create a reference object (This is for use on the core)
module.exports.popperRef = function (userOptions) {
  return createReferenceObject.getRef(this, appendValues(this, userOptions));
};

//Assign position and cy to user options
function getTargetInfo (target, userOptions) {
  userOptions.position = () => target.renderedPosition();
  userOptions.cy = target; 
  return userOptions;
};



//Append element specific values to the options
function appendValues(target, userOptions) {
  //Append bounding box functions
  if (!(userOptions.boundingBox)) {
    userOptions.boundingBox = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3,
    };
  }

  //Append cy and a position function
  userOptions = getTargetInfo(target, userOptions);

  return userOptions;
}


