const AWS = require('aws-sdk');
let docClient= new AWS.DynamoDB.DocumentClient();


let date= new Date();
let current_date = date.toISOString();
exports.handler = async(event) => {
    let ID = JSON.parse(`${event.ID}`);
    let Title = (`Title: ${event.Title}`);
    let Content = (`Content: ${event.Content}`);
    let DueDate = (`DueDate: ${event.DueDate}`);


 
    let params = {
        TableName: 'anderson-banco2',
        Item:{
            'ID':ID,
            "Title": Title,
            "Content": Content,
            "DueDate": DueDate,
            "Current Date": current_date

        }
    };
    await docClient.put(params).promise();

    const response = {
        statusCode:200,
        body: ID, Title, Content, DueDate
    };
    return response;
};