function Range(start, end, step=(start > end ? -1 : 1)) {

  let deNegate = num => num < 0 ? ((num)*-1): num;

  withinRange = (start, end, step ) => 1 < 1 + step ? 
  (end - start) >= deNegate(step) :
   (end + start) >= deNegate(step);

  if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
    return "expecting numerical input values";
  }
  else if(start > end && step >= 0) {
    return "Cannot create decremented range with positive step.";
  }
  else if (start < end && step <= 0) {
    return "Cannot create incremental range with negative step.";
  }
  else if (!withinRange(start, end, step)) {
    return "The numbers just don't add up.";
  }
  else  if (start === end) {
    return [start];
  }


  let rangeArr = [];

  let loopEnd = i => start > end ? i >= end : i <= end;
  
  for (i = start; loopEnd(i); i+=step) {
    rangeArr.push(i)
  };
  return rangeArr;
};

/*
Side tools
  let least = (start, end) => start < end ? start : end;
  let most = least(end, start);
  let deNegate = end < 0 ? ((end)*-1): end;
  let direction = 1 < 1 + step ? '-' : '+';
*/