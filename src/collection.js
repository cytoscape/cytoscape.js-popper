const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');

//Create a popper object for first element in a collection
module.exports.popper = function (userOptions) {
  var elements = this;
  var element = elements[0];
  userOptions = common.resolveUndefined(userOptions);
  userOptions = appendValues(element, userOptions);

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  //Create popper object
  var popper = popperRenderer.createPopperObject(element, userOptions);

  return popper; // chainability
};

//Create a reference object for a element in a collection
module.exports.popperRef = function (userOptions) {
  var elements = this;
  var element = elements[0];
  userOptions = common.resolveUndefined(userOptions);
  userOptions = appendValues(element,userOptions);
  
  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  //Create a reference object
  var popperRef = createReferenceObject.getRef(element, userOptions);

  return popperRef; // chainability
};

//Append element specific values to the options
function appendValues(target, userOptions) {
  userOptions = getTargetInfo(target, userOptions);
  return userOptions;
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


