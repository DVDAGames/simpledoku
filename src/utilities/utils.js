'use strict';

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

export const cloneArray = (arr) => {
  let copy;

  if(Array.isArray(arr)) {
      copy = arr.slice( 0 );

      for(let i = 0; i < copy.length; i++) {
          copy[i] = cloneArray(copy[i]);
      }

      return copy;
  } else if( typeof arr === 'object' ) {
      throw 'Cannot clone array containing an object!';
  } else {
      return arr;
  }
}
