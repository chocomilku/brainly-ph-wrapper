const {request, GraphQLClient} = require('graphql-request')
const random = require('random-useragent')
const { graphql, site, isBlank } = require('./exports')
const error = require('./error')

const Brainly = async (query, count = 10) => {
    isBlank(query)
}