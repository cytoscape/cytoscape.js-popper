//Get dependencies
const impl = require('./core/index.js');
const collections = require('./core/collection.js');

// registers the extension on a cytoscape lib ref
let register = function( cytoscape ){
  if( !cytoscape ){ return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape( 'core', 'popper', impl );  //Cytoscape Core
  cytoscape( 'collection', 'popper', collections); //Cytoscape Collections

};

if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
  register( cytoscape );
}

module.exports = register;
