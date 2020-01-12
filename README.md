# Call Center Application

### Purpose
This is a call center application that takes a user's dialogue, transcribes their speech to readable text, and notifies the specific person through email with the attached transcription. This application is built using numerous AWS Tools that come together as a serverless mircoservice application. 

### Tools:
* AWS Connect: A call center GUI that handles voice
* AWS S3 Bucket: Storage for files (.wav files and .json)
* AWS Step Functions: Serverless tool that monitors the state of multiple tasks and triggers Lambda functions
* AWS Lambda: Serverless function (PaaS)
* AWS Transcribe: Tool that transcribes speech to text
* AWS SES
* Node.JS


### Microservice Architecture

<img width="503" alt="Capture" src="https://user-images.githubusercontent.com/43100685/72110997-8eb16700-3307-11ea-80ba-c4e363dc8374.PNG">

### How it works
In the above system flow diagram, users call a certain number (XXX-XXX-XXXX) and are able to have a conversation with a bot. With the help of AWS Connect, you can create and customize a flow diagram of how the conversation is executed. Sample interface:

![aws-connect](https://user-images.githubusercontent.com/43100685/72226349-2c9e6f00-355e-11ea-9aac-19a0660e7778.png)

AWS Connect stores the .wav file into an S3 bucket of your choosing. Once the S3 bucket receives a file, PUTOBJECT will trigger a Lambda function to start a new state machine in Step Functions. In the process of handling Lambda functions, a specific Lambda function will create a transcription job using AWS Transcribe. After checking the status of the transcription job, a json file of the transcription is saved in the same S3 bucket in a different file location. The final Lambda function sends the transcription to a specific email using AWS SES.

The included Node.js files are their own individual Lambda functions which are triggered using Step Functions. 
