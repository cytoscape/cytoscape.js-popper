const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');
const common = require('./common');

//Create a popper object (This is for use on the core)
module.exports.core = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = common.resolveUndefined(userOptions);
  userOptions = appendValues(cy, userOptions);
  userOptions.core = true;

  //Create popper object
  var popper = popperRenderer.createPopperObject(cy, userOptions);

  return popper;
};


//Create a reference object (This is for use on the core)
module.exports.coreRef = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = common.resolveUndefined(userOptions);
  userOptions = appendValues(cy, userOptions);
  userOptions.core = true;
  
  //Create popper object
  var popperRef = createReferenceObject.getRef(cy, userOptions);

  return popperRef;
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
   userOptions = common.getTargetInfo(target, userOptions);

  return userOptions;
}


