# RESTful web API with Node.js for Simplified Private Blockchain

Blockchain has the potential to change the way that the world approaches data. Inside this project exists a simplified private blockchain where a consensus isn't existent and the blocks have a pretty basic structure.

In this project a RESTful web API with the Node.js Framework, _Express.js_, is deployed in order to interact with the simplified private blockchain. Some basic operations such as creating a new block and getting the structure of blocks already attached to the chain.

Functionalities developed in the private blockchain are namely:
- adding blocks,
- validating blocks,
- validating the blockchain,
- but also persisting the blockchain in a levelDB database.

The allowed operations to be performed on top of the blockchain through the API are enabled with two endpoints, _GET_ and _POST_.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

In this project, the blocks generated throughout the lifecycle of the blockchain are stored in a database and they are retrieved by the blockchain using javascript __Promises__. The functions, *addLevelDBData*, *getLevelDBData*, *addDataToLevelDB*, *getBlocksCount*, *getDBdataArray*, *removeDB* implemented inside the __levelSandbox.js__ file, are utilised for the purpose of interacting with the database and achieve persistence. These functions are exported with respect to be used by the functions residing in __Blockchain.js__. In __Blockchain.js__, the Blockchain constructor is deployed as well as the necessary functions to create the blockchain. The __Block.js__ file provides the Blocks' constructor; therefore, in this file the blocks' structure is defined. The __app.js__ file holds the structure of the web API and makes it available. The controller __BlockController.js__ contains the two endpoints creating and retrieving the blocks in the blockchain.

#### Key points in code

The __BlockController.js__ holds the following code in order to deploy the _GET_ and _POST_ endpoints:

_GET_ Endpoint:
```
getBlockByIndex() {
		this.app.get("/api/block/:index", async (req, res) => {
				// Add your code here
				let blockheight = req.params.index;
				let block = await this.blockchain.getBlock(blockheight);
				console.log(block)
				res.status(200).send(block)

		});
}
```
_POST_ Endpoint:
```
postNewBlock() {
		this.app.post("/api/block", async (req, res) => {
			try{
				// Add your code here
				let block = await this.blockchain.addBlock(new Block(`Testing block with test string data`));
				res.status(200).send(JSON.parse(block));
			}catch(err){
				console.log(err);

			}
		});
}
```
### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].
Having NPM installed, several dependencies should be installed as described in the next section.

### Configuring your project

- Use NPM to initialize your project and install system specific software dependencies enclosed to package.json.
```
npm install
```


## Usage

To test code follow the steps:

1: Open a command prompt or shell terminal after installing node.js and the dependencies.

2: Enter the following command in order to instantiate the blockchain and deploy the web API.
```
node app.js
```

## Testing

Having deployed the web API, it's time to test the function of the endpoints. For the purpose of testing them it can be used either __Postman__ or __Curl__.
