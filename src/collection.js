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

  //Set Defaults
  let defaults = {
    getDimensions: (target) => ({ w: target.width(), h: target.width() }),
    position: () => target.isNode() ? target.renderedPosition() : target.midpoint(),
    cy: target.cy()
  };

  //Create a user options object
  userOptions = assign( {}, defaults, userOptions );

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




