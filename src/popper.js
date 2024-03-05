const { getRef } = require('./ref');
const { getContent } = require('./content');

// Create a new popper object for a core or element target
function getPopper(target, opts) {
  let refObject = getRef(target, opts);
  let content = getContent(target, opts.content);

  return target.popperFactory(refObject, content, opts.popper);
}

module.exports = { getPopper };
