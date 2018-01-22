const { getBoundingBox } = require('./bb');

// Create a popper reference object
// https://popper.js.org/popper-documentation.html#referenceObject
function getRef(target, opts) {
  let { renderedDimensions } = opts;

  //Define popper reference object and cy reference  object
  let refObject = {
    getBoundingClientRect: function() {
      return getBoundingBox(target, opts);
    },

    get clientWidth() {
      return renderedDimensions(target).w;
    },

    get clientHeight() {
      return renderedDimensions(target).h;
    },
  };

  return refObject;
}

module.exports = { getRef };
