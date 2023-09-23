/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $userPoolSub: String
  ) {
    onCreateUser(filter: $filter, userPoolSub: $userPoolSub) {
      userPoolSub
      identityPoolId
      name
      userName
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $userPoolSub: String
  ) {
    onUpdateUser(filter: $filter, userPoolSub: $userPoolSub) {
      userPoolSub
      identityPoolId
      name
      userName
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $userPoolSub: String
  ) {
    onDeleteUser(filter: $filter, userPoolSub: $userPoolSub) {
      userPoolSub
      identityPoolId
      name
      userName
      mail
      createdAt
      updatedAt
      __typename
    }
  }
`;
