const AWS = require('aws-sdk');
exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  let id = parseInt(event.pathParameters.ID)

  const params = {
    TableName: "anderson-banco2",
    Key: {
      'ID': id
    }
  }

  try {
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    console.log(err)
    responseBody = `Unable to get user data`;
    statusCode = 403;
  }

  const response = {
    
    statusCode: statusCode,
    headers: {
      "myHeader": "test"
    },
    body: responseBody


  }

  return response;
}
