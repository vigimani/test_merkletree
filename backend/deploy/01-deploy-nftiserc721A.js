const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelisted = require('../whitelisted.json');




module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Generate Merkle Root
    //A COMPLETER
    const leaves = whitelisted.map(x => keccak256(x.address))
    const tree = new MerkleTree(leaves, keccak256, {sort:true})
    const merkleTreeRoot = tree.getHexRoot()



    log("--------------------------------------")
    arguments = [merkleTreeRoot] 
    const NFTIsERC721A = await deploy("NFTIsERC721A", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    //Verify the smart contract 
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
        log("Verifying...")
        await verify(NFTIsERC721A.address, arguments)
    }
}

module.exports.tags = ["all", "NFTIsERC721A", "main"]