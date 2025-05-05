const { ethers, artifacts } = require("hardhat");
const getProvider = require("../utils/provider");
const factoryInterfaceArtifact = artifacts.readArtifactSync(
  "contracts/interfaces/IFactory.sol:IFactory"
);
/**
 * getFactoryContract() creates and return the instance of the factory factory contract
 * @param {string} contract_address  address of the factoryContract
 * @param {string} provider_urlrpc rpc url of the node provider.
 * @returns {object} contractInstance of the factory contract
 */

async function getFactoryContract(contract_address, provider_url) {
  const provider = await getProvider(provider_url);
  try {
    const factoryContract = await ethers.getContractAt(
      factoryInterfaceArtifact.abi,
      contract_address,
      provider
    );
    return { factoryContract };
  } catch (error) {
    console.log("Error at : factoryContract.js");
    consolg.log(error);
  }
}

module.exports = {
  getFactoryContract,
};
