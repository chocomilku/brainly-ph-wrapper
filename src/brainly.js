const BrainlyError = require('./error')
const {GraphQLClient} = require('graphql-request')
const exp = require('./exports')
const client = new GraphQLClient(`${exp.site.url}/graphql/${exp.site.code}`, { headers: {"user-agent": exp.random()} })

const Brainly = async (query, count = 10) => {
    const variables = {
        query: query,
        len : count
    }
    try {
        exp.isBlank(query)

        const data = await client.request(exp.graph, variables)
        console.log(JSON.stringify(data))
    } catch (error) {
        console.error(new BrainlyError(error))
    }
}

Brainly('rizal', 10)