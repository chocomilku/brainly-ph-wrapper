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
        const res = data.questionSearch
        let final = [{length: res.count}]
        for (let i = 0; i < res.edges.length; i++) {
            const path = res.edges[i].node
            let push = []
            let question = []
            let answers = []
            question.push(exp.convertQuestion(path))
            push.push(question)
            for (let n = 0; n < path.answers.nodes.length; n++) {
                let ansPath = path.answers.nodes[n]
                let ansPush = []
                ansPush.push(exp.convertAnswer(ansPath))
                answers.push(ansPush)
            }
            final.push(push)
        }
        console.log(JSON.stringify(final))
    } catch (error) {
        console.error(new BrainlyError(error))
    }
}

Brainly('san mateo', 10)