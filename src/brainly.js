const got = require('got')
const random = require('random-useragent')
const { graphql, site, isBlank } = require('./exports')
const error = require('./error')

const Brainly = async (query, count = 10) => {
    isBlank(query)

    const request = {
        prefixUrl: site[1],
        headers: {
            "user-agent": random.getRandom(),
            "origin": site[1],
            "sec-gpc": "1",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "batch": "true"
        }
    }

    const reqBody = (q, len) => {
        return [{
            operationName: "SearchQuery",
            query: graphql,
            variables: {
                len: len,
                query: q
            }
        }];
    }

    const search = async (question, length) => {
        try {
            const body = reqBody(question, length)
            const response = await request
        } catch (error) {

        }
    }
}