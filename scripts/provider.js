const { ethers } = require("hardhat");
async function getProvider(rpc_url) {
  const provider = new ethers.JsonRpcProvider(rpc_url);
  return provider;
}

module.exports = getProvider;
