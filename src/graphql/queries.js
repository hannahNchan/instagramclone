/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($userPoolSub: String!) {
    getUser(userPoolSub: $userPoolSub) {
      userPoolSub
      identityPoolId
      name
      userName
      mail
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userPoolSub: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userPoolSub: $userPoolSub
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userPoolSub
        identityPoolId
        name
        userName
        mail
        gender
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByUserName = /* GraphQL */ `
  query UsersByUserName(
    $userName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUserName(
      userName: $userName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userPoolSub
        identityPoolId
        name
        userName
        mail
        gender
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
