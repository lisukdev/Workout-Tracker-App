import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-2_Gjn8eqGEv",
    ClientId: "aqdimrsdpdusq2gsg468ac6p2",
};
export const cognitoPool = new CognitoUserPool(poolData);
