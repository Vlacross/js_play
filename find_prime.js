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


function findPrimes(end, start = arguments.length === 2 ? start : 1) {

  if(arguments.length === 0) {
    return "Must contain at least one argument.\n If no \'start\' parameter entered: defaults to 1";
  }
  else if(typeof end !== 'number' || typeof start !== 'number') {
    return "expecting numerical input values.";
  }

  let range = Range(start, end);
  let PrimeArr = [];
  
  for (let i = 1; i < range.length; i++) {
    if (range[i] === null) {
      continue;
    };

    for (let j=i; j < range.length; j+=range[i]) {
      if (j === i) {
        PrimeArr.push(range[j]);
        continue;
      }
      if (range[j] === null) {
        continue;
        }
      else {
        range[j] = null;
      };
      
    };
  
  };
  
  return PrimeArr;
};








/*
Didn't use: index conditions in switch
function loopEnd(index) {
    switch(i) {
      case start > end && direction === "-":
        return i > end;
        break;
      case start > end && end < 0:
          return i > end;
          break;
      case start > end && end > 0:
          return i > end;
          break; 
      case start > end && end > 0:
          return i > end;
          break;
    } 

*/