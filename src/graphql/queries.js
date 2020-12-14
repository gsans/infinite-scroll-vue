/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      book
      id
      fullName
      name
      surname
      email
      phone
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        book
        id
        fullName
        name
        surname
        email
        phone
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listContactsByFullName = /* GraphQL */ `
  query ListContactsByFullName(
    $book: String
    $fullName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactsByFullName(
      book: $book
      fullName: $fullName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        book
        id
        fullName
        name
        surname
        email
        phone
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
