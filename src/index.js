//Get dependencies
const impl = require('./core/index.js');

// registers the extension on a cytoscape lib ref
let register = function( cytoscape ){
  if( !cytoscape ){ return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape( 'core', 'popper', impl.core );  //Cytoscape Core
  cytoscape( 'collection', 'popper', impl.collection); //Cytoscape Collections

};

if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
  register( cytoscape );
}

module.exports = register;
