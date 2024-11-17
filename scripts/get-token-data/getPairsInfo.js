const { ethers } = require("hardhat");
const { getFactoryContract } = require("../contract-instances/factoryContract");

/**
 * getPairslength() retruns total number of the pairs in a factory
 * @param {string} _factoryContractAddress address of the factoryContract
 * @param {string} _provider_url rpc url of the node provider
 * @returns {number} total number of the pairs in a factory
 */
async function getPairslength(_factoryContractAddress, provider_url) {
  const { factoryContract } = await getFactoryContract(
    _factoryContractAddress,
    provider_url
  );

  if (!factoryContract) {
    throw new Error("Contract Instance Not Created");
  }

  try {
    const pairsLength = await factoryContract.allPairsLength();
    return parseInt(pairsLength);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * getPairsAddress() retruns the pairAddress of a specific index from an array
 * @param {string} _factoryContractAddress address of the factoryContract
 * @param {string} _provider_url rpc url of the node provider
 * @param {number} _pairIndex index number of the pairAddress in an array
 * @returns {string} contarctAddress of the pair.
 */
async function getPairsAddress(
  _factoryContractAddress,
  provider_url,
  _pairIndex
) {
  const { factoryContract } = await getFactoryContract(
    _factoryContractAddress,
    provider_url
  );

  if (!factoryContract) {
    console.log(error);
    throw new Error("Factory Not Found");
  }

  try {
    const pairAddress = await factoryContract.allPairs(_pairIndex);
    return pairAddress;
  } catch (error) {
    console.log("Error at getPairsInfo.js");
    console.log(error);
  }
}

module.exports = {
  getPairslength,
  getPairsAddress,
};
