const { ethers, artifacts } = require("hardhat");
const getProvider = require("../utils/provider");
const tokenInterfaceArtifact = artifacts.readArtifactSync(
  "contracts/interfaces/IERC20.sol:IERC20"
);
/**
 * getTokenContract() creates and return the instance of the tokenContract
 * @param {string} contract_address  address of the tokenContract
 * @param {string} provider_urlrpc rpc url of the node provider.
 * @returns {object} contractInstance of the tokenContract
 */

async function getTokenContract(contract_address, provider_url) {
  const provider = await getProvider(provider_url);
  try {
    const tokenContract = await ethers.getContractAt(
      tokenInterfaceArtifact.abi,
      contract_address,
      provider
    );
    return { tokenContract };
  } catch (error) {
    console.log("Error at : tokenContract.js");
    consolg.log(error);
  }
}

module.exports = {
  getTokenContract,
};
