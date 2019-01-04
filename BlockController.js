const SHA256 = require('crypto-js/sha256');
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const blockchain = new Blockchain();


/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app
     */
    constructor(app) {
        this.app = app;
        //this.initializeMockData();
        this.blockchain = blockchain;
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", async (req, res) => {
            // Add your code here
            let blockheight = req.params.index;
            let block = await this.blockchain.getBlock(blockheight);
            //console.log(block)
            res.status(200).send(block)

        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
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

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    // initializeMockData() {
    //     if(this.blocks.length === 0){
    //         for (let index = 0; index < 10; index++) {
    //             let blockAux = new BlockClass.Block(`Test Data #${index}`);
    //             blockAux.height = index;
    //             blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
    //             this.blocks.push(blockAux);
    //             console.log(index)
    //         }
    //     }
    // }
    // theLoop (i=0) {
    // 	setTimeout(function () {
    // 		let blockTest = new Block("Test Block - " + (i + 1));
    // 		blockchain.addBlock(blockTest).then((result) => {
    // 			console.log(result);
    // 			i++;
    // 			if (i < 10) theLoop(i);
    // 		});
    // 	}, 10000);
    // }

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => { return new BlockController(app);}
