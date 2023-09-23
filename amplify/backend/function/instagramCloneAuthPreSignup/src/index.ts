/* Amplify Params - DO NOT EDIT
	API_IGCLONEAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_IGCLONEAPI_GRAPHQLAPIIDOUTPUT
	API_IGCLONEAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@aws-sdk/protocol-http";

const GRAPHQL_ENDPOINT = process.env.API_IGCLONEAPI_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

async function graphql(
  query: string,
  variables = {},
  endpoint = new URL(GRAPHQL_ENDPOINT),
  region: string = AWS_REGION
) {
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: region,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(GRAPHQL_ENDPOINT, signed);

  let statusCode = 200;
  let body: any = {}
  try {
    const response = await fetch(request);
    body = await response.json();
    if (body.errors) {
      statusCode = 400;
      console.error(`error 400: body=${JSON.stringify(body)}`);
    }
  } catch (error) {
    statusCode = 500;
    body = { errors: [{ message: error.message }] };
    console.error(`error 500: body=${JSON.stringify(body)}`);
  }
  if (statusCode == 500 || statusCode == 400) {
    throw Error(
      `status_code=${statusCode} & body_errors=${JSON.stringify(body.errors)}`
    );
  }

  return {
    statusCode,
    body: body,
  };
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  const query = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
  console.log(event);
  const variables = {
    input: {
      mail: event.request.userAttributes.email,
      name: event.request.userAttributes.name,
      userName: event.request.userAttributes.nickname,
      userPoolSub: event.userName,
    },
  };

  const response = await graphql(query, variables);
  console.log(response)
  
  // Return to Amazon Cognito
  callback(null, event);
};
