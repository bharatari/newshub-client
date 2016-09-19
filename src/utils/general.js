import _ from 'lodash';

export default {
  calculatePages(total, limit) {
    return Math.ceil(total / limit);
  },
  getCurrentPage(limit, skip) {
    return Math.floor(skip / limit) + 1;
  },
  insert(array, insert, at) {
    array.splice(at, 0, insert);
  },
  toArray(csv) {
    if (csv) {
      let array = csv.split(',');
      
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
      }
      
      return array;
    }
    
    return [];
  },
  toCSV(array) {
    let csv = array[0];
    
    for (let i = 1; i < array.length; i++) {
      csv += ', ' + array[i];
    }
    
    return csv;
  },
  toObjectCSV(array) {
    let csv = array[0].name;
    
    for (let i = 1; i < array.length; i++) {
      csv += ', ' + array[i].name;
    }
    
    return csv;
  },
  trimAndLowercase(array) {
    for (let i = 0; i < array.length; i++) {
      if (_.isString(array[i])) {
        array[i].trim();
        array[i] = array[i].toLowerCase();        
      }
    }
    
    return array;
  },
  cleanEmptyStrings(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "") {
        array.splice(i, 1);
      }
    }
    
    return array;
  },
}
