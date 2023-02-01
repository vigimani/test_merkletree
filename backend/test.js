const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256');

array = [
    {
        "address": "0x05dA33083f4f532309Df7e6d49bE3ca8071fB1a0"
    },
    {
        "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    }

]


const leaves = array.map(x => keccak256(x.address))
const tree = new MerkleTree(leaves, keccak256)
const root = tree.getHexRoot()

// const root = tree.getRoot().toString('hex')
const leaf = keccak256("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root)) // true


const badLeaf = keccak256('0x06dA33083f4f532309Df7e6d49bE3ca8071fB1a0')

const badProof = tree.getProof(badLeaf)
console.log(tree.verify(badProof, badLeaf, root)) // false