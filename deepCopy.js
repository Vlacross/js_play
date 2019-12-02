function kopy(obj, lvl) {
  k_obj = lvl === undefined ? {} : k_obj;
  depth = lvl === undefined ? 0 : lvl;
  
    if (typeof obj != "object") {
        k_obj[depth] = "Error: not an object"
      }
  
    else if (Array.isArray(obj)) {
      k_obj[depth] = [];
      for(let i=0; i < obj.length; i++) {
        k_obj[depth].push(typeof obj[i] != "object" ? obj[i] : kopy(obj[i], depth+1))
        continue;
      }
    }
    else {
      k_obj[depth] = {};
      for (k in obj) {
        k_obj[depth][k] = typeof obj[k] != "object" ? obj[k] : kopy(obj[k], depth+1)
      }
      }
  
  if (depth > 0) {
    depth--;
    return k_obj[depth+1]
  } 
  else {
    return k_obj[depth]
  }
  
}