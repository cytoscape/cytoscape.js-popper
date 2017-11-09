const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');
const assign = require('./assign');

//Create a popper object for first element in a collection
module.exports.popper = function (userOptions) {
  warn(this);
  return popperRenderer.createPopperObject(this[0], appendValues(this[0], userOptions));
};

//Create a reference object for a element in a collection
module.exports.popperRef = function (userOptions) {
  warn(this);
  return createReferenceObject.getRef(this[0], appendValues(this[0], userOptions));

};

//Append element specific values to the options
function appendValues(target, userOptions) {
  userOptions = userOptions ? assign(userOptions) : {};

  //Append dimensions function
  if (!(userOptions.dimensions)) {
    userOptions.getDimensions = (target) => ({ w: target.width() , h: target.width()});
  }

  userOptions = getTargetInfo(target, userOptions);
  return userOptions;
}

//Warn user about misuse of the plugin
function warn(elements) {
  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }
}

//Assign position and cy to user options
function getTargetInfo(target, userOptions) {
  var isCy = target.pan !== undefined && typeof target.pan === 'function';
  var iscyElement = !isCy;
  var isNode = iscyElement && target.isNode();
  var cy = isCy ? target : target.cy();

  //Assign cy
  userOptions.cy = cy;

  //Append a position function
  if (!(userOptions.position)) {
    userOptions.position = () => isNode ? target.renderedPosition() : target.midpoint();
  }
  return userOptions;
};


