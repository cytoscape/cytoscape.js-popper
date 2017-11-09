//Determine basic details about an cytoscape target
module.exports.getTargetInfo = function (target, userOptions) {
  var isCy = target.pan !== undefined && typeof target.pan === 'function';
  var iscyElement = !isCy;
  var isNode = iscyElement && target.isNode();
  var cy = isCy ? target : target.cy();

  //Assign cy
  userOptions.cy = cy;

  //Append a position function
  if (!(userOptions.position)) {
    userOptions.position = () => isNode ? target.renderedPosition() : target.midpoint();
  }
  return userOptions;
};

//Resolve undefined errors 
module.exports.resolveUndefined = function (userOptions) {
  if (!userOptions) {
    return {};
  }
  else {
    return userOptions;
  }
};


