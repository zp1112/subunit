// import BaseSelection from './BaseSelection';
import filter from './selection/filter';
import data from './selection/data';
import sort from './selection/sort';
import enter from './selection/enter';
import merge from './selection/merge';
import select from './selection/select';
import attr from './selection/attr';
import tagged from './selection/tagged';
import on from './selection/on';
import append from './common/append';
import selectAll from './selection/selectAll';
import transition from './selection/transition';
import call from 'd3-selection/src/selection/call';
import nodes from 'd3-selection/src/selection/nodes';
import node from 'd3-selection/src/selection/node';
import size from 'd3-selection/src/selection/size';
import empty from 'd3-selection/src/selection/empty';
import each from 'd3-selection/src/selection/each';
import property from 'd3-selection/src/selection/property';
import datum from 'd3-selection/src/selection/datum';

// import data from './selection/data';
// import attr from './selection/attr';
// import transition from './selection/transition';
// import selectAll from './selection/selectAll';
// import select from './selection/select';
// import append from './common/append';


export default function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

// function selection() {
//   return new Selection([[document.documentElement]], root);
// }


// export default class Selection extends BaseSelection {
//   constructor(input) {
//     super(input);
//   }
// }

Selection.prototype.filter = filter;
Selection.prototype.property = property;
Selection.prototype.data = data;
Selection.prototype.datum = datum;
Selection.prototype.call = call;
Selection.prototype.sort = sort;
Selection.prototype.each = each;
Selection.prototype.empty = empty;
Selection.prototype.on = on;
Selection.prototype.size = size;
Selection.prototype.enter = enter;
Selection.prototype.merge = merge;
Selection.prototype.attr = attr;
Selection.prototype.append = append;
Selection.prototype.tagged = tagged;
Selection.prototype.select = select;
Selection.prototype.selectAll = selectAll;
Selection.prototype.transition = transition;
Selection.prototype.node = node;
Selection.prototype.nodes = nodes;

// Selection.prototype.data = data;
// Selection.prototype.attr = attr;
// Selection.prototype.transition = transition;
// Selection.prototype.selectAll = selectAll;
// Selection.prototype.select = select;
// Selection.prototype.append = append;
