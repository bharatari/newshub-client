import _ from 'lodash';
import array from 'utils/array';

export default {
  getRemainingDevices(devices, selectedDevices) {
    const remaining = _.cloneDeep(devices);

    if (remaining) {
      for (let property in remaining) {
        if (remaining.hasOwnProperty(property)) {
          const type = _.filter(selectedDevices, function (o) {
            return o.type === property;
          });

          remaining[property] = _.differenceWith(remaining[property], type, function (a, b) {
            return a.id === b.id;
          });
        }
      }
    }

    return remaining;
  },
  groupDevices(devices) {
    return _.groupBy(devices, 'type');
  },
};
