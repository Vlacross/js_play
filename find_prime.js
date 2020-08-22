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



function superPrimer(arr) {
  let superPrimes = [];
  for (let i = 0; i < arr.length; i++) {
    arr[arr[i]-1] !== undefined ?
      superPrimes.push(arr[arr[i]-1]) :
      null;
      continue;
  };

  return superPrimes;
};

  
/*
 accept arg to set number or superprimes to return - default to 20;
  Build prime number list
    check that list contains at least as many indexes as the value of the index that matches requested return quantity
  iterate through arr and pull vals

  set a check at the end of prime builder that says for any number after 11: iterate by 2 
*/
 
function superPrimerFinder(num = 20) {
  if(typeof(num) != 'number') {
      console.log("input must be an integer")
      return
  }
  num = Math.floor(num);
  if (num < 0) {
      num = 0 - num;
  }

  let i, j, k, tmp, triggered;
  let ps = 1;
  let sps = 0;
  let primes = [];
  let superPrimes = [];

  function buildSet(start, arr) {

      for(i=start; i < start + 20;  i < 11 ? i++ : i+=2) {
          if (i==1) { continue }
          j = 2;
          triggered = false;
          while (j <= (i/2)) {
              if (i % j == 0) {
                  triggered = true;
                  break;
              }
              j < 11 ? j++ : j+=2;
          }
      
          if (!triggered) {
              arr.push(i)
          }
      }
      ps = i;
      primes = arr;
  }

  while (primes.length < num) {
      buildSet(ps, primes)
  }

  tmp = primes[primes.length-1]
  while (primes.length < tmp) {
    buildSet(ps, primes)
  }
      
  for (k = sps; k < num; k++) {
    superPrimes.push(primes[primes[k]-1])
  }
  
  return superPrimes;
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


function realPrimeFinder(end, start = arguments.length === 2 ? start : 1) {

  if(arguments.length === 0) {
    return "Must contain at least one argument.\n If no \'start\' parameter entered: defaults to 1";
  }
  else if(typeof end !== 'number' || typeof start !== 'number') {
    return "expecting numerical input values.";
  }


  let range = Range(start, end);
  let PrimeArr = [];
  let i, j, triggered;

  for(i = 0; i < range.length; i++) {
    j = 2;
    triggered = false;

    while (j <= (range[i]/2)) {
      if (range[i] % j == 0) {
        triggered = true;
        break;
      }
      j++;
    }

    if(!triggered) {
      PrimeArr.push(range[i])
    }
  }

  return PrimeArr;

}







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