const { RESTDataSource } = require('apollo-datasource-rest')
const TOKEN = 'b52c270b9ac5b0bd37e84f7f41b3a2d620137ef8f22bb6818a3b9b11f26cfac7'

class ProductHuntAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://api.producthunt.com/v1/'

    /*  Keep in memory allowed parameters for a given endpoint
     *  This is a bit overkill since we only have 1 endpoint here
     *  but this could become useful when more endpoints are added
     */
    this.authorizedParameters = {
      'posts': {
        daysAgo: {
          qsKey: 'days_ago',
          validate: (daysAgo) => !isNaN(daysAgo) && parseInt(daysAgo) > 0
        }
      }
    }
  }

  /*  Ensure that params passed onto a given endpoint
   *  are allowed and chain them into a query string
   */
  addParamsToEndPoint (endpoint, params) {
    /*  We test each params: are they allowed for this endpoint
     *  and are they valid ? If so, chain them; otherwise ignore
     */
    const queryString = Object.keys(params).reduce((qs, paramKey) => {
      // Is the param authorized ?
      const authorizedParam = this.authorizedParameters[endpoint] &&
        this.authorizedParameters[endpoint][paramKey]

      // If its value is valid add it to the queryString
      const paramValue = params[paramKey]
      if (authorizedParam && authorizedParam.validate(paramValue)) {
        qs.push(`${authorizedParam.qsKey}=${paramValue}`)
      }

      return qs
    }, []).join('&')

    // Add `?` at the beginning if necessary
    return queryString.length
      ? `${endpoint}?${queryString}`
      : endpoint
  }

  /*  Set up outgoing request to fit
   *  ProductHunt API requirement + attach token
   */
  willSendRequest (request) {
    request.headers.set('Accept', 'application/json')
    request.headers.set('Content-Type', 'application/json')
    request.headers.set('Host', 'api.producthunt.com')
    request.headers.set('Authorization', `Bearer ${TOKEN}`)
  }

  /*  Get a list of posts
   */
  async getPosts (params) {
    const endpoint = this.addParamsToEndPoint('posts', params)

    const { posts } = await this.get(endpoint)
    return posts
  }
}

module.exports = {
  ProductHuntAPI
}