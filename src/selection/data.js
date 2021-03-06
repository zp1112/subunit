import Selection from '../Selection';
import { EnterNode } from './enter';
import constant from 'd3-selection/src/constant';

var keyPrefix = '$';

function bindIndex(parent, group, enter, update, exit, data) {
  var groupLength = group.length;
  var dataLength = data.length;

  var i = 0;
  var node;

  for (; i < dataLength; ++i) {
    if ((node = group[i])) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  for (; i < groupLength; ++i) {
    if ((node = group[i])) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var nodeByKeyValue = {};
  var groupLength = group.length;
  var dataLength = data.length;
  var keyValues = new Array(groupLength);
  
  var i;
  var node;
  var keyValue;

  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i])) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if ((node = nodeByKeyValue[keyValue])) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

export default function(value, key) {
  if (!value) {
    var data = new Array(this.size());

    var j = -1;

    this.each(function(d) { data[++j] = d; });

    return data;
  }

  var bind = key ? bindKey : bindIndex;
  var parents = this._parents;
  var groups = this._groups;

  if (typeof value !== 'function') value = constant(value);

  var m = groups.length;
  var enter = new Array(m);
  var update = new Array(m);
  var exit = new Array(m);

  for (j = 0; j < m; ++j) {
    var parent = parents[j];
    var group = groups[j];
    var groupLength = group.length;
    data = value.call(parent, parent && parent.__data__, j, parents);
    
    var dataLength = data.length;
    
    var enterGroup = enter[j] = new Array(dataLength);
    var updateGroup = update[j] = new Array(dataLength);
    var exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if ((previous = enterGroup[i0])) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  var updateSelection = new Selection(update, parents);
  updateSelection._enter = enter;
  updateSelection._exit = exit;
  return updateSelection;
}