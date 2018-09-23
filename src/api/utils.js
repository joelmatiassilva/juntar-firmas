import axios from 'axios'

export const request = (method, uri, data = null) => {
  var url = ''
  if (!method) {
    console.error('API function call requires method argument')
    return
  }

  if (!uri) {
    console.error('API function call requires uri argument')
    return
  }

  if (process.env.API_BASE !== 'undefined') {
    url = process.env.API_BASE + uri
  } else {
    url = 'http://' + window.location.host + '/api' + uri
  }
  return axios({ method, url, data })
}

export const setAuthHeader = (request, authHeader) => {
  request.headers.Authorization = authHeader
}

export const setTrailingSpace = request => {
  var urlComponents = request.url.split('?')
  if (urlComponents[0][urlComponents[0].length - 1] !== '/') {
    urlComponents[0] = urlComponents[0] + '/'
  }
  if (1 in urlComponents) {
    request.url = urlComponents[0] + '?' + urlComponents[1]
  } else {
    request.url = urlComponents[0]
  }
}
