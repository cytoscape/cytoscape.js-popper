const { getBoundingBox } = require('./bb');

// Create a popper virtual element (aka popper v1 reference object)
// https://popper.js.org/docs/v2/virtual-elements/
function getRef(target, opts) {

  //Define popper reference object and cy reference  object
  let refObject = {
    getBoundingClientRect: function() {
      return getBoundingBox(target, opts);
    }
  };

  return refObject;
}

module.exports = { getRef };
