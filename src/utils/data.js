import _ from 'lodash';
import { localStorageAuthToken } from 'constants/keys';
import feathers from 'feathers-client';
import io from 'socket.io-client';
import authentication from 'feathers-authentication/client';

export default {
  configure() {
    let socket = io('http://localhost:3030');
    let app = feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(socket))
      .configure(authentication());

    this.app = app;
  },
  base: __DEV__ ? 'http://localhost:3030' : '',
  getCurrentBase() {
    let url = window.location.protocol + '//' + window.location.hostname;
     
    if (window.location.port) {
      url += ':' + window.location.port;
    }
     
    return url;
  },
  apiRoot: '/api',
  options: {},

  /**
   * Dynamically constructs JSON API request.
   *
   * @param {string} dataType
   * @param {string} method
   * @param {Object} data
   * @param {string} id
   * @return {Promise}
   */
  request(dataType, method, id, query, body) {
    const url = this.processUrl(dataType, id, query);
    const options = this.processOptions(body, method);

    return fetch(url, options)
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return this.processResponse(data);
      });
  },

  /**
   * Dynamically constructs WebSockets request through
   * feathers-client and socket.io. Requires configure
   * function to be called before use.
   *
   * @param {string} dataType
   * @param {string} action
   * @param {Object} data
   * @param {string} id
   * @return {Promise}
   */
  on(dataType, action, cb) {
    if (this.app == null) {
      throw new Error('Must call configure before use.');
    }

    var service = this.app.service('api/' + dataType);
    service.on(action, cb);    
  },
  
  /**
   * Specifically for authentication requests with a Feathers backend.
   */
  authenticate(username, password) {
    if (this.app == null) {
      throw new Error('Must call configure before use.');
    }

    this.app.authenticate({
      'type': 'local',
      'email': username,
      'password': password,
    }).then(function (result) {
      console.log('Authenticated!', result);
    }).catch(function (error) {
      console.error('Error authenticating!', error);
    });
  },
  processUrl(dataType, id, query = '') {
    let url = this.base + this.apiRoot + '/' + dataType;

    if (id != null) {
      url += '/' + id;
    }
    
    if (query != null) {
      if (_.isString(query)) {
        url += query;
      } else {
        url += this.processQuery(query);
      }
    }
    
    return url;
  },
  processOptions(body, method) {
    let options = { 
      ...this.options
    };

    if (localStorage.getItem(localStorageAuthToken)) {
      options.headers = {
        'Authorization': 'Bearer ' + localStorage.getItem(localStorageAuthToken),
      };
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (method) {
      options.method = method;
    }

    return options;
  },
  processResponse(body) {
    if (body != null) {
      if (body.data) {
        return body.data;
      }
    }
   
    return body;
  },
  /**
   * Checks for error status.
   *
   * @param {Object} response
   * @return {Object}
   * @throws {Error}
   */
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },
  processQuery(data) {
    let ret = [];
    
    for (let d in data) {
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
      
    return '?' + ret.join("&");
  }
};
