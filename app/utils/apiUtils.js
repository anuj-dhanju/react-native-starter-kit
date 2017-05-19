import _ from 'lodash'

export function checkStatus(response) {
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function buildQueryString(params) {
  params = _.extend({}, params);
  return _.map(params, function(val, key) {
    if (typeof val === "object") {
      return _.map(val, function(v, k) {
        return key + "["+k+"]" + "=" + v;
      }).join('&');
    } else {
      return key + "=" + val;
    }
  }).join('&');
}

export function buildUrlWithQueryString (url, params) {
  var paramsQueryString = buildQueryString(params);
  if (_.isEmpty(paramsQueryString)) {
    return url;
  } else {
    if (url.indexOf('?') >= 0) {
      return url + '&' + paramsQueryString;
    } else {
      return url + '?' + paramsQueryString;
    }
  }
}

export function getApiUrl(){
  let env = getEnvironment();
  if(env==='staging'){
    return 'http://api.staging.leasing.clicksandbox.com';
  }
  else if(env==='qa'){
    return 'http://api.qa.leasing.clicksandbox.com';
  }
  else {
    return 'http://api.dev.leasing.clicksandbox.com:8080';
  }
}


export function getEnvironment(){
  let appUrl = '';
  if(appUrl==='staging.leasing.clicksandbox.com'){
    return 'staging';
  }
  else if(appUrl==='qa.leasing.clicksandbox.com'){
    return 'qa';
  }
  else {
    return 'dev';
  }
}

export function buildDownloadUrl (path, params){
  const API_ROOT = getApiUrl();
  const url = API_ROOT+path;
  params = {...params }
  return buildUrlWithQueryString (url, params)
}

export function callApi(path, params, config, request, onRequestSuccess, onRequestFailure) {
  const API_ROOT = getApiUrl();
  config = {
            ...config,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }}

  let url = API_ROOT+path;
  url = buildUrlWithQueryString(url, params);

  return dispatch => {
    dispatch(request());

    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        if (!json.success) {   // (response.status < 200 || response.status > 300)
          json.error &&
          
          dispatch(onRequestFailure(json));
        } else {
          json.message &&
          
          dispatch(onRequestSuccess(json));
        }
      }).catch((error) => {
          const exceptionMessage = {
            success: false,
            error: "Something went wrong!"
          }
          dispatch(onRequestFailure(exceptionMessage));
        });
  };
}

