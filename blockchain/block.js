const { GENESIS_DATA, MINE_RATE } = require('../config');
const {cryptoHash} = require('../util')
class Block{
	constructor({timestamp, lastHash, hash, data,nonce,difficulty}){
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	static genesis() {					// creates genesis block using config data
		return new this(GENESIS_DATA);
	}

	static mineBlock({lastBlock,data}) {
		const lastHash = lastBlock.hash;
		let hash,timestamp;
		let {difficulty} = lastBlock;
		// const timestamp =Date.now();
		let nonce = 0;	

		do{
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
			hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
		} while (hash.substring(0,difficulty) != '0'.repeat(difficulty));

		return new this({
		timestamp,
		lastHash,
		data,
		difficulty,
		nonce,
		hash
		// hash: cryptoHash(timestamp, lastHash, data,nonce,difficulty)
		});
	}

	static adjustDifficulty({originalBlock, timestamp}) {
		const { difficulty} = originalBlock;
		if (difficulty <1) return 1;

		if((timestamp - originalBlock.timestamp) >MINE_RATE) return difficulty -1;

		return difficulty + 1;
	}
}

module.exports = Block;

// const block1 = new Block({
// 	timestamp: '01/01/21',
// 	lastHash: 'foo-lasthash',
// 	hash: 'foo-hash',
// 	data:'foo-data'
// 	});
// console.log('block1',block1)