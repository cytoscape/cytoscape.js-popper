const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');

//Create a popper object (This is for use on the core)
module.exports.core = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = popperRenderer.resolveUndefined(userOptions);
  userOptions.core = true;

  //Create popper object
  var popper = popperRenderer.createPopperObject(cy, userOptions);

  return popper;
};


//Create a reference object (This is for use on the core)
module.exports.coreRef = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = popperRenderer.resolveUndefined(userOptions);
  userOptions.core = true;

  //Create popper object
  var popperRef = createReferenceObject.getRef(cy, userOptions);

  return popperRef;
};

