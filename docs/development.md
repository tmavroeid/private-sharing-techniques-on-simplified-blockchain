##Instruction for Source

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

In this project, the blocks generated throughout the lifecycle of the blockchain are stored in a database and they are retrieved by the blockchain using javascript __Promises__. The functions, *addLevelDBData*, *getLevelDBData*, *addDataToLevelDB*, *getBlocksCount*, *getDBdataArray*, *removeDB* implemented inside the __levelSandbox.js__ file, are utilised for the purpose of interacting with the database and achieve persistence. These functions are exported with respect to be used by the functions residing in __Blockchain.js__. In __Blockchain.js__, the Blockchain constructor is deployed as well as the necessary functions to create the blockchain. The __Block.js__ file provides the Blocks' constructor; therefore, in this file the blocks' structure is defined. The __app.js__ file holds the structure of the web API and makes it available. The controller __BlockController.js__ contains the two endpoints creating and retrieving the blocks in the blockchain.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].
Having NPM installed, several dependencies should be installed as described in the next section.

#### Key points in code

The __BlockController.js__ holds the following code in order to deploy the _GET_ and _POST_ endpoints:

__*GET* Endpoint:__ In this endpoint, the _index_ parameter is the number of block in the chain. Therefore, the _getBlock()_ function inside the __Blockchain.js__ file is called in order to retrieve the demanded block by the user.
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
__*POST* Endpoint:__ In this endpoint, the _addBlock()_ function inside the __Blockchain.js__ file is called in order to create a new block with the data *"Testing block with test string data"*, in its *body*. The _req.body.data_, indicates that the _POST_ request should contain a key/value pair, where the name of the _key_ should be ___data___. The value of the ___data___ key will be the body of the block.
```
postNewBlock() {
		this.app.post("/block", async (req, res) => {
			try{
				// Add your code here
				let data = req.body.data;
				if(data.length>0){
					let block = await this.blockchain.addBlock(new Block(data));
					res.status(200).send(JSON.parse(block));
				}else{
					res.status(400).send("POST Request without data on the body!");
				}
			}catch(err){
				console.log(err);

			}
		});
}
```
