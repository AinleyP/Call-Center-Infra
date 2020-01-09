var AWS = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService();

exports.handler = (event, context, callback) => {
    var params = {
      LanguageCode: 'en-US',
      Media: { /* required */
        MediaFileUri: event.s3URL + ""
      },
      MediaFormat: 'wav',
      OutputBucketName: process.env.S3_TRANSCRIPTS_BUCKET_NAME,
      Settings: {
        ChannelIdentification: true
      },
      TranscriptionJobName: event.JOB_NAME
      

    }; 
    transcribeservice.startTranscriptionJob(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     {
      console.log(data);           // successful response
      event.wait_time = 60;
      
      event.JOB_NAME = data.TranscriptionJob.TranscriptionJobName;
      
      callback(null, event);
      }
    });

};
