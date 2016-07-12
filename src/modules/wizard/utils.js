import _ from 'lodash';
import array from 'utils/array';

export default {
  getRemainingDevices(devices, selectedDevices) {
    return _.differenceWith(devices, selectedDevices, function (a, b) {
      return a.id === b.id;
    });
  }
};
