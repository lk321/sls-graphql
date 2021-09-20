module.exports = `
  type Song {
    id: ID!
    title: String
    artist: Artist
    duration: Int
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song
  }

  type Mutation {
    createSong(
      title: String!
      artist: String!
      duration: Int!
    ): Song
    updateSong(
      id: ID!
      title: String
      artist: String
      duration: Int
    ): Song
    deleteSong(
      id: ID!
    ): Song
  }
`;
