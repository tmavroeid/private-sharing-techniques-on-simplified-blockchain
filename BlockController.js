const SHA256 = require('crypto-js/sha256');
const Blockchain = require('./Blockchain');
const formidable = require('formidable')
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
        this.hashFile();
        this.validateFileIdentity();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", async (req, res) => {
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

    hashFile(){
      //Handle the upload of a file
      this.app.post('/submit-form', (req, res) => {
        try{
          var form = new formidable.IncomingForm();
          var block, fileHash, response = "";
          form.hash = 'sha256';
          form.parse(req).on('field', (name, field) => {
            console.log('Field', name, field)
          }).on('file', async (name, file) => {
            try{
              console.log('Uploaded file', name, file)

              console.log(file.hash);
              block = await this.blockchain.addBlock(new Block(file.hash));
              response = JSON.parse(block);
              console.log(response);
              console.log("Success storing a hash of the file!");
            }catch(err){
              console.log(err);
            }
          }).on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
            console.log(percent_complete.toFixed(2));
          }).on('aborted', () => {
              console.error('Request aborted by the user')
          }).on('error', (err) => {
              console.error('Error', err)
              throw err
          }).on('end', () => {
              res.status(200).send(response);//We put the response here, in order to avoid the error "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
              res.end()
          })
        }catch(err){
          console.log(err);
        }
      });


    }

    validateFileIdentity(){
      //Hndle the upload of a file
      this.app.post('/validate-file', (req, res) => {
        try{
          var form = new formidable.IncomingForm();
          var block, blockheight, storedHash, fileHash;
          form.hash = 'sha256'
          form.parse(req).on('field', (name, field) => {
            if(name == "blockheight"){
              blockheight = field;//parseInt(field, 10);
            }
            //console.log('Field', name, field);
            console.log(blockheight);
          }).on('file', async (name, file) => {
            try{
              console.log(file);
              block = await this.blockchain.getBlockbyHeight(blockheight);
              console.log(block);
              storedHash = block.body;
              fileHash = file.hash
              if(fileHash===storedHash){
                //console.log('Uploaded file', name, file)
                console.log("This is a legit file!");
              }else{
                console.log("This is not a legit file")
              }
            }catch(err){
              console.log(err);
            }
          }).on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
            console.log(percent_complete.toFixed(2));
          }).on('aborted', () => {
            console.error('Request aborted by the user')
          }).on('error', (err) => {
            console.error('Error', err);
            throw err
          }).on('end', () => {
            res.end();
          })
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
