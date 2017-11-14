//Include helper functions and Popper
//import Popper from 'popper.js';
const createBoundingBox = require('./createBoundingBox');
const createReferenceObject = require('./createReferenceObject');

//Fix Popper.js webpack import conflict (Use .default if using webpack)
let Popper = require('popper.js');
let EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
  Popper = Popper.default;
}

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (target, userOptions) {
  //Define popper reference object
  let refObject = createReferenceObject.getRef(target, userOptions);

  //Get values from user options
  let popperOpts = userOptions.popper;
  popperOpts.placement = popperOpts.placement || 'bottom';
  let targetOpt = userOptions.content;
  let content = null;

  //Get target to bind popper to
  try {
    content = createBoundingBox.getPopperHtmlObject(target, targetOpt);
  }
  catch (e) {
    //Stop creating a popper
    return;
  }

  //Create and return actual popper object
  let popper = new Popper(refObject, content, popperOpts);

  return popper;


};

