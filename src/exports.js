const { gql } = require('graphql-request')
const BrainlyError = require('./error')
const randomUserAgent = require('random-useragent')

const graphql = gql`
query SearchQuery($query: String!, $len: Int!) {
    questionSearch(query: $query, first: $len, after: null) {
        count
        edges {
            node {
                databaseId
                content
                created
                lastActivity
                attachments {
                    url
                }
                author {
                    databaseId
                    nick
                    points
                    isDeleted
                    avatar {
                        url
                    }
                    rank {
                        databaseId
                        name
                    }
                }
                canBeAnswered
                answers {
                    nodes {
                        databaseId
                        content
                        isBest
                        created
                        rating
                        ratesCount
                        thanksCount
                        attachments {
                            url
                        }
                        author {
                            databaseId
                            nick
                            points
                            isDeleted
                            avatar {
                                url
                            }
                            rank {
                                databaseId
                                name
                            }
                            receivedThanks
                            bestAnswersCount
                            helpedUsersCount
                        }
                    }
                }
            }
        }
    }
}`

const site = {
    code: "ph",
    url: "https://brainly.ph"
}

const isBlank = (str) => {
    if (str === "" || str === undefined) {
        throw new BrainlyError("Query cannot be blank")
    }
}

const random = () => {
    return randomUserAgent.getRandom()
}

exports.site = site
exports.isBlank = isBlank
exports.graph = graphql
exports.random = random