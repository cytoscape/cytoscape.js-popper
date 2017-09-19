const popperRenderer = require('./render.js');

//Create a popper object (This is for use on the core)
module.exports = function(userOptions){
  //Get cytoscape object and container
  var cy = this;
  var container = cy.container();

  //Generate options and assign them on the scratchpad 
  var options = popperRenderer.createPopperOptionsObject(userOptions);
  cy.scratch('popper-opts', options.popper);
  cy.scratch('popper-target', options.target);

  //Create popper object
  var popper  = popperRenderer.createPopperObject(cy);
  cy.scratch('popper', popper);

  return this; 
};
