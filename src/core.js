const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');
const assign = require('./assign');


//Create a popper object (This is for use on the core)
module.exports.popper = function (userOptions) {
  return popperRenderer.createPopperObject(this, appendValues(this, userOptions));
};


//Create a reference object (This is for use on the core)
module.exports.popperRef = function (userOptions) {
  return createReferenceObject.getRef(this, appendValues(this, userOptions));
};

//Append element specific values to the options
function appendValues(target, userOptions) {
  
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
    cy : target
  };

  //Create a user options object
  userOptions = assign( {}, defaults, userOptions );

  return userOptions;
}


