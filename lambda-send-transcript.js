const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
var ses = new aws.SES();
const sesConfirmedAddress = "ainley.pena@scalar.ca";

exports.handler = (event, context, callback) => {

    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };

    s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data.Body.toString()); //this will log data to console
        }

        //var fileData = JSON.parse(data.Body.toString());

        var results = JSON.parse(data.Body.toString());
        var transcript = results.results.transcripts[0].transcript;
        console.log(transcript);

        sendEmail(transcript);

    });


};

function sendEmail(transcript) {
    var emailRequestParams = {
        Destination: {
            ToAddresses: [sesConfirmedAddress]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Hello! Here is transcription. \n\n\n" + transcript
                }
            },
            Subject: {
                Data: "Transcription from Call Center"
            }
        },
        Source: sesConfirmedAddress,
        ReplyToAddresses: [sesConfirmedAddress]


    };

    var sendEmailPromise = ses.sendEmail(emailRequestParams).promise();

    var response = {
        statusCode: 200
    };

    sendEmailPromise.then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
        response.statusCode = 500;
    });

}


