const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');
const assign = require('./assign');

//Create a popper object (This is for use on the core)
module.exports.popper = function (userOptions) {
  return popperRenderer.createPopperObject(this, createOptionsObject(this, userOptions));
};


//Create a reference object (This is for use on the core)
module.exports.popperRef = function (userOptions) {
  return createReferenceObject.getRef(this, createOptionsObject(this, userOptions));
};

//Create a options object with required default values
function createOptionsObject(target, userOptions) {
  
  //Set Defaults 
  let defaults = {
    boundingBox : {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3,
    },
    getDimensions : () => ({w: 3, h: 3}),
    position : () => target.renderedPosition(),
    popper : {},
    cy : target
  };

  //Create a user options object
  userOptions = assign( {}, defaults, userOptions );

  return userOptions;
}


