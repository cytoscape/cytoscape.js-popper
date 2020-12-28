const assign = require('./assign');
const { getRef } = require('./ref');
const { getContent } = require('./content');

const popperDefaults = {};

const {createPopper} = require('@popperjs/core');

// Create a new popper object for a core or element target
function getPopper(target, opts) {
  let refObject = getRef(target, opts);
  let content = getContent(target, opts.content);
  let popperOpts = assign({}, popperDefaults, opts.popper);

  return createPopper(refObject, content, popperOpts);
}

module.exports = { getPopper };
