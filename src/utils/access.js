import _ from 'lodash';
import { configuration } from 'constants/routes';

export default {
  convertToPermission(url) {
    url = url.substring(5);
    
    const slash = url.indexOf('/');

    if (slash === -1) {
      return `${url}:view`;
    } else {
      const trailing = url.substring(slash + 1);
      const model = url.substring(0, slash);

      if (trailing === 'new') {
        return `${model}:create`;
      } else {
        return `${model}:view`;
      }
    }
  },
  has(roles, role) {
    if (_.includes(roles, 'master')) {
      return true;
    } else if (role) {
      if (_.includes(roles, role)) {
        if (_.includes(roles, this.createDenyPermission(role))) {
          return false;
        }

        return true;
      }

      return false;
    } else {
      return true;
    }
  },
  createDenyPermission(permission) {
    return `deny!${permission}`;
  },
  getRole(url) {
    const route = _.find(configuration.routes, (n) => {
      return n.url === url;
    });

    if (route) {
      return route.role;
    }
    
    return '';
  },
}
