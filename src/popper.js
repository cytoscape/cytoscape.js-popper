const assign = require('./assign');
const { getRef } = require('./ref');
const { getContent } = require('./content');

const popperDefaults = {};

//Fix Popper.js webpack import conflict (Use .default if using webpack)
let Popper = require('popper.js');
let EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
  Popper = Popper.default;
}

// Create a new popper object for a core or element target
function getPopper(target, opts) {
  let refObject = getRef(target, opts);
  let content = getContent(target, opts.content);
  let popperOpts = assign({}, popperDefaults, opts.popper);

  return new Popper(refObject, content, popperOpts);
}

module.exports = { getPopper };
