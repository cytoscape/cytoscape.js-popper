/* global cytoscape */

const coreImpl = require('./core');
const collectionImpl = require('./collection');

// registers the extension on a cytoscape lib ref
let register = function (cytoscape) {
  if (!cytoscape) { return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('core', 'popper', coreImpl.popper);  //Cytoscape Core
  cytoscape('collection', 'popper', collectionImpl.popper); //Cytoscape Collections
  cytoscape('core', 'popperRef', coreImpl.popperRef);  //Cytoscape Core for References
  cytoscape('collection', 'popperRef', collectionImpl.popperRef); //Cytoscape Collections for References

};

if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;
