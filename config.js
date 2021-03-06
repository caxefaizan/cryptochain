const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3; // determines the time required for mining later on while transacting

const GENESIS_DATA = {        // initial block meant to be the start of chain
	timestamp : 1,
	lastHash: '_____',
	hash: 'hash-one',
	difficulty: INITIAL_DIFFICULTY,
	nonce:0,
	data: []

};

const STARTING_BALANCE = 1000;

module.exports = {GENESIS_DATA, MINE_RATE,STARTING_BALANCE};