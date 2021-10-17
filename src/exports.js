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
                isClosed
                grade {
                    name
                  }
                  subject {
                    name
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
                answers {
                    nodes {
                        databaseId
                        content
                        isBest
                        created
                        rating
                        ratesCount
                        thanksCount
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

const convertAnswer = (data) => {
    const reAnswer = {
        id: data.databaseId,
        answer: data.content,
        bestAnswer: data.isBest,
        created: data.created,
        rating: data.rating,
        ratesCount: data.ratesCount,
        thanks: data.thanksCount,
        author: data.author.nick,
        authorId: data.author.databaseId,
        authorAvatar: data.author.avatar.url,
        authorRank: data.author.rank.name
    }
    return reAnswer
}

const convertQuestion = (data) => {
    const reQuestion = {
        id: data.databaseId,
        question: data.content,
        created: data.created,
        lastAct: data.lastActivity,
        closed: data.isClosed,
        grade: data.grade.name,
        subject: data.subject.name,
        author: data.author.nick,
        authorId: data.author.databaseId,
        authorAvatar: data.author.avatar.url,
        authorRank: data.author.rank.name,
    }
    return reQuestion
}

exports.site = site
exports.isBlank = isBlank
exports.graph = graphql
exports.random = random
exports.convertQuestion = convertQuestion
exports.convertAnswer = convertAnswer