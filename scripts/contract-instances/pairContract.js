const { ethers, artifacts } = require("hardhat");
const getProvider = require("../utils/provider");
const pairInterfaceArtifact = artifacts.readArtifactSync(
  "contracts/interfaces/IPair.sol:IPair"
);

/**
 * getPairContract() creates and return the instance of the pair factory contract
 * @param {string} contract_address  address of the pairContract
 * @param {string} provider_urlrpc rpc url of the node provider.
 * @returns {object} contractInstance of the paircontract
 */

async function getPairContract(contract_address, provider_url) {
  const provider = await getProvider(provider_url);
  try {
    const pairContract = await ethers.getContractAt(
      pairInterfaceArtifact.abi,
      contract_address,
      provider
    );
    return { pairContract };
  } catch (error) {
    console.log("Error at : pairContract.js");
    consolg.log(error);
  }
}

module.exports = {
  getPairContract,
};
