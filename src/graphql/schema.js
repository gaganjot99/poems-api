const {gql} = require("apollo-server-express")

const typeDefs = gql`
type Poem {
    name: String!
    author: String!
    content: String!
    type: String!
}


type Author {
    name: String!
    poems: Boolean!
    stories: Boolean!
    content: [String]!
}

input poemInput {
    name: String
    author: String
    type: String
}

input newContent {
    name: String!
    author: String!
    type: String!
    content: String!
}

type Query {
    poem(input: String!): Poem
    allpoems(input: poemInput): [Poem]!
    allauthors: [Author]!
    randompoem: Poem
    randomstory: Poem
}

type Mutation {
    addcontent(input: newContent!): Poem!
}
`

module.exports = typeDefs