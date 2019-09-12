const SHA256 = require('crypto-js/SHA256')

class Block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.prevHash = prevHash
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    } 

    createGenesisBlock(){
        return new Block(0, '01/01/2019', "Genesis Block", "0")
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){ 
        newBlock.prevHash = this.getLastestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
}


// Driver code

ScriptCoin = new BlockChain()
ScriptCoin.addBlock(new Block('1', '02/01/2019', { amount: 7 }))
ScriptCoin.addBlock(new Block('2', '03/01/2019', { amount: 6 }))
ScriptCoin.addBlock(new Block('3', '04/01/2019', { amount: 12 }))
ScriptCoin.addBlock(new Block('4', '05/01/2019', { amount: 3 }))

console.log(JSON.stringify(ScriptCoin, null, 4))