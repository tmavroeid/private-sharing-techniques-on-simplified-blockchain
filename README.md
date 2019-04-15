# Private Sharing Techniques on Simplified Blockchain

In this project, private sharing techniques are developed and implemented on top of a Simplified Blockchain. The blockchain's functionalities can be RESTful web API with the Node.js Framework, _Express.js_, is deployed in order to interact with the simplified private blockchain. Some basic operations such as creating a new block and getting the structure of blocks already attached to the chain.

Functionalities developed in the private blockchain are namely:
- adding blocks,
- validating blocks,
- validating the blockchain,
- but also persisting the blockchain in a levelDB database.

The allowed operations to be performed on top of the blockchain through the API are enabled with two endpoints, _GET_ and _POST_.

This blockchain implements certain private sharing techniques such as:

- documents' validation through hashing


## Getting Started

- Use NPM to initialize your project and install system specific software dependencies enclosed to package.json. Dependencies of this project are, crypto-js, level, fs-extra, express, body-parser, etc.
```
npm install
```


## Usage

To test the functionalities of this project proceed with the following steps:

1: Open a command prompt or shell terminal after installing node.js and the dependencies.

2: As defined in the code of __app.js__, the API will be deployed at port 8000.
```
initExpress() {
	this.app.set("port", 8000);
}
```
3: Enter the following command in order to instantiate the blockchain and deploy the web API.
```
node app.js
```



## Testing

Having deployed the web API, it's time to test the function of the endpoints. For the purpose of testing them it can be used either __POSTman__ or __Curl__ and a Browser(e.g. ___Chrome, Firefox, Opera, etc___).

#### Testing the Simplified Blockchain's Basic Functionality with POSTman
1. In order to test the _GET_ endpoint with the __Postman__, the following URL should be invoked:
```
http://localhost:8000/block/:index
```
The _:index_ should be replaced by a number, 0, 1, 2, 3, etc.

2. In order to test the _POST_ endpoint with the __Postman__, the following URL should be invoked in order to create the next block in the chain:
```
http://localhost:8000/block
```
The type of body of the request should be chosen to be *application/x-www-form-urlencoded*. Therefore, a key/value should be used. The _key_ name should be ___data___ and the _value_ should be a string. In case that the _POST_ request is sent without a string or text in the body then there won't be created a new block.

#### Testing the Private Sharing Techniques through a Browser
1. In order to test the validation of documents, invoke the following URL through a browser:
```
http://localhost:8000/
```
2. Then, invoke the following URL in order to validate the existence or legitimacy of a document by passing the ___block height___ of the original block where the hash of the document that we want to validate, is already stored and the ___document___.
```
http://localhost:8000/validate
```
