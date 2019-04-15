/* ===== functions on levelSandbox.js ==============================================================================
|  Include functions or a pointer to levelSandbox.js in order to persist data and interact with database in levelDB|
|  ===============================================================================================================*/
const {db, addLevelDBData, getLevelDBData, addDataToLevelDB, getBlocksCount, getDBdataArray, removeDB} = require('./levelSandbox');
//const level = require('./levelSandbox.js');
const Block = require('./Block')
// const level = require('level');
// const chainDB = './chaindata';
// const db = level(chainDB);
/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/
//Define the SHA256 in order to use it for the purpose of validating blocks
const SHA256 = require('crypto-js/sha256');

/* ===== Blockchain Class ===================================================
|  Class with a constructor for new simplified blockchain without consensus 		|
|  =========================================================================*/

class Blockchain{
  constructor(){
		//retrieve the data array from the database
		this.chain = [];
		this.generateGenesisBlock();
  }

	async generateGenesisBlock(){
						let array = await getDBdataArray();
						// for (var g=0;g<=array.length;g++){
						// 	this.chain.push(JSON.parse(array[g].value));
						// }
            await removeDB();

						if (array.length==0){

		                let genesisBlock = new Block("First block in the chain - Genesis block");
		                this.addBlock(genesisBlock);
		         }else{
							 return "The blockchain has already initialized!";
						 }

	}

  // Add new block
  async addBlock(newBlock){
			// Retrieve block height of the blockchain already in the database
			newBlock.height = await this.getBlockHeight();
			// UTC timestamp
	    newBlock.time = new Date().getTime().toString().slice(0,-3);
	    // previous block hash
	    if(this.chain.length>0){
	      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
	    }
	    // Block hash with SHA256 using newBlock and converting to a string
	    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
		  // Adding block object to chain
		 	this.chain.push(newBlock);
			// Persist block object to database
			return await addLevelDBData(newBlock.height, JSON.stringify(newBlock).toString())

  }

  // Get block height
  async getBlockHeight(){
      //return the height of the blockchain already saved in levelDB
			return await getBlocksCount();

  }

  // get block
  async getBlock(blkHeight){
      // return block object from the database
			let block = await getLevelDBData(blkHeight);
			return JSON.parse(block)
	}

  async getBlockbyHeight(height){
    // return block object from the database
    let block = await this.getBlock(height);
    return block;
  }
    // validate block
    async validateBlock(blockHeight){
      // retrieve block object
      let block = await this.getBlock(blockHeight);
		  //console.log(block);
      // get block hash
      let blockHash = block.hash;
      // remove block hash to test block integrity
			//console.log(blockHash);

      block.hash = '';
      // generate block hash
      let validBlockHash = SHA256(JSON.stringify(block)).toString();
			//console.log(validBlockHash);
      // Compare block hashes in order to validate the legitimacy of the block
			return new Promise((resolve, reject) => {
				if(this.validBlockHash === this.blockHash) {
					console.log('true')
			 		resolve(true);
	 			} else {
					console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
			 		resolve(false);
	 			}
			});

    }

   // Validate blockchain
  async validateChain(){
      let errorLog = [];
			//Create the promises array in order to store the calls to validateBlock()
			let promises = [];

			for (var i = 0; i <= this.chain.length-1; i++) {
					promises.push(this.validateBlock(i));
			}
			//When all promises resolve, then compare block hash links and then again check the errorLog.
			Promise.all(promises).then((results) => {
				if(results.length>0){
						for (var j = 0; j < this.chain.length-1; j++) {

							if(results[j]){
								// compare blocks hash links
								let blockHash = this.chain[j].hash;
				        let previousHash = this.chain[j+1].previousBlockHash;
								// if hashes are different log an error with the block's position.
				        if (blockHash!==previousHash) {
				          errorLog.push('Error in position:'+j);
								}
							}
						}
				}else{
					console.log('Something went wrong!')
				}
			}).then((results)=>{
				// when the camparison of links is fulfilled, then chack the errorLog.
				if (errorLog.length>0) {
					console.log('Block errors = ' + errorLog.length);
					console.log('Blocks: '+errorLog);
					return false
				} else {
					console.log('No errors detected');
					return true;
				}
			}).catch((err)=>{
				console.log(err);
			});




    }

}

module.exports = Blockchain
