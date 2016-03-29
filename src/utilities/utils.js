export const objectHasOwnValue = (obj, value) => {
  for(const prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      if(obj[prop] === value) {
        return true;
      }
    }
  }

  return false;
};
