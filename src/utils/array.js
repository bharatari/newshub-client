import _ from 'lodash';

export default {
  getFromArray(collection, compare) {
    let object = _.find(collection, function (item) {
      return _.isEqual(item, compare);
    });

    return object;
  },
  getFromArrayById(collection, id) {
    let object = _.find(collection, function (item) {
      return item.id === id;
    });

    return object;
  },
  updateById(collection, id, object) {
    // Deleting and then re-adding object so that the array
    // causes a rerender in React.
    collection = this.deleteFromArrayById(collection, id);

    const updatedCollection = [
      ...collection,
      object,
    ];

    return updatedCollection;
  },
  getDifferenceById(all, selected) {
    if (!_.isNil(all)) {
      if (!_.isNil(selected)) {
        let array = _.difference(_.pluck(all, 'id'), _.pluck(selected, 'id'));

        for (let i = 0; i < array.length; i++) {
          array[i] = this.getFromArrayById(all, array[i]);
        }

        return array;
      } else {
        return all;
      }
    } else {
      return [];
    }
  },
  deleteFromArray(array, item) {
    const index = _.findIndex(array, (arrayItem) => {
      return _.equals(item, arrayItem);
    });

    array.splice(index, 1);

    return array;
  },
  deleteFromArrayById(array, id) {
    const index = _.findIndex(array, (item) => {
      return item.id === id;
    });

    array.splice(index, 1);

    return array;
  },
  existsById(array, id) {
    const index = _.findIndex(array, (item) => {
      return item.id === id;
    });

    if (!_.isNil) {
      return true;
    } else {
      return false;
    }
  },
  isObjectArray(array) {
    if (array) {
      if (array[0]) {
        if (_.isPlainObject(array[0])) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
