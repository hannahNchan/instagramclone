"use strict";
/* Amplify Params - DO NOT EDIT
    API_IGCLONEAPI_GRAPHQLAPIENDPOINTOUTPUT
    API_IGCLONEAPI_GRAPHQLAPIIDOUTPUT
    API_IGCLONEAPI_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var signature_v4_1 = require("@aws-sdk/signature-v4");
var credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
var sha256_js_1 = require("@aws-crypto/sha256-js");
var protocol_http_1 = require("@aws-sdk/protocol-http");
var GRAPHQL_ENDPOINT = process.env.API_IGCLONEAPI_GRAPHQLAPIENDPOINTOUTPUT;
var AWS_REGION = process.env.AWS_REGION || "us-east-1";
function graphql(query, variables, endpoint, region) {
    if (variables === void 0) { variables = {}; }
    if (endpoint === void 0) { endpoint = new URL(GRAPHQL_ENDPOINT); }
    if (region === void 0) { region = AWS_REGION; }
    return __awaiter(this, void 0, void 0, function () {
        var signer, requestToBeSigned, signed, request, statusCode, body, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = new signature_v4_1.SignatureV4({
                        credentials: (0, credential_provider_node_1.defaultProvider)(),
                        region: region,
                        service: "appsync",
                        sha256: sha256_js_1.Sha256
                    });
                    requestToBeSigned = new protocol_http_1.HttpRequest({
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            host: endpoint.host
                        },
                        hostname: endpoint.host,
                        body: JSON.stringify({ query: query, variables: variables }),
                        path: endpoint.pathname
                    });
                    return [4 /*yield*/, signer.sign(requestToBeSigned)];
                case 1:
                    signed = _a.sent();
                    request = new Request(GRAPHQL_ENDPOINT, signed);
                    statusCode = 200;
                    body = {};
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch(request)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    body = _a.sent();
                    if (body.errors) {
                        statusCode = 400;
                        console.error("error 400: body=".concat(JSON.stringify(body)));
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    statusCode = 500;
                    body = { errors: [{ message: error_1.message }] };
                    console.error("error 500: body=".concat(JSON.stringify(body)));
                    return [3 /*break*/, 6];
                case 6:
                    if (statusCode == 500 || statusCode == 400) {
                        throw Error("status_code=".concat(statusCode, " & body_errors=").concat(JSON.stringify(body.errors)));
                    }
                    return [2 /*return*/, {
                            statusCode: statusCode,
                            body: body
                        }];
            }
        });
    });
}
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var query, variables, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "\n  mutation CreateUser(\n    $input: CreateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    createUser(input: $input, condition: $condition) {\n      userPoolSub\n      identityPoolId\n      name\n      userName\n      mail\n      createdAt\n      updatedAt\n      __typename\n    }\n  }\n";
                console.log(event);
                variables = {
                    input: {
                        mail: event.request.userAttributes.email,
                        name: event.request.userAttributes.name,
                        userName: event.request.userAttributes.nickname,
                        userPoolSub: event.userName
                    }
                };
                return [4 /*yield*/, graphql(query, variables)];
            case 1:
                response = _a.sent();
                console.log(response);
                // Return to Amazon Cognito
                callback(null, event);
                return [2 /*return*/];
        }
    });
}); };
