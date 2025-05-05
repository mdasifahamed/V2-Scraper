const { ethers } = require("hardhat");

/**
 * getProvider() creates a provider instance to communicate with blockchain
 * @param {string} rpc_url rapc url of the node provider
 * @returns {object} instance of a provider
 */
async function getProvider(rpc_url) {
  try {
    const provider = new ethers.JsonRpcProvider(rpc_url);
    return provider;
  } catch (error) {
    console.log("Error at : tokenContract.js");
    consolg.log(error);
  }
}

module.exports = getProvider;
