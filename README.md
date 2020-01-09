# Call Center Application

### Purpose
This is a call center application that takes a user's dialogue, transcribes their speech to readable text, and notifies the specific person through email with the attached transcription. This application is built using numerous AWS Tools that come together as a serverless mircoservice application. 

### Tools:
* AWS Connect: A call center GUI that handles voice
* S3 Bucket: Storage for files (.wav files and .json)
* Step Functions: Serverless tool that handles the state of multiple tasks and triggers Lambda functions
* AWS Lambda: Serverless function (PaaS)
* AWS Transcribe: Tool that transcribes speech to text
* Node.JS

### Microservice Architecture

<img width="503" alt="Capture" src="https://user-images.githubusercontent.com/43100685/72110997-8eb16700-3307-11ea-80ba-c4e363dc8374.PNG">

### How it works
In the above system flow diagram, users call a certain number and are prompted with a programmed bot. With the help of AWS Connect, you can create and customize a flow diagram of how the conversation is executed. 
The following Node.js files are as their own separate Lambda function which is controlled by Step Functions.
