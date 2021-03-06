
export function search(node, selector) {
  var result = [];

  if (typeof selector !== 'string') {
    throw new Error('selector must be a string');
  }

  var tagsArray = selector.replace(/\./g, ' ').trim().split(' ');

  var searchIterator = function (node) {

    if (typeof selector === 'string') {

      if (!node.__data__) {
        return;
      }

      for (var i = 0; i < tagsArray.length; i++) {
        if (node.__tags__.indexOf(tagsArray[i]) < 0) {
          return;
        }
      }
    } else {
      var keys = Object.keys(selector);

      for (var j = 0; j < keys.length; j++) {
        if (node[keys[j]] !== selector[keys[j]]) {
          return;
        }
      }
    }

    return result.push(node);
  };

  node.traverse(searchIterator);

  return result;
}

export function array(list) {
  return Array.prototype.slice.call(list);
}

function toObject(val) {
  if (val === null) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

export function assign(target, source) {
  var pendingException;
  
  var to = toObject(target);

  if (!source) {
    throw new Error('No source(s) provided to assign.');
  }

  for (var s = 1; s < arguments.length; s++) {
    var fromObj = arguments[s];
    var objKeys = Object.keys(Object(fromObj));

    for (var i = 0; i < objKeys.length; i++) {
      try {
        to[objKeys[i]] = fromObj[objKeys[i]];
      } catch (err) {
        if (pendingException === undefined) {
          pendingException = err;
        }
      }
    }
  }

  if (pendingException) {
    throw pendingException;
  }

  return to;
}
