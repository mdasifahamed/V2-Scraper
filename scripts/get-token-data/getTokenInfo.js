const { ethers } = require("hardhat");
const { getTokenContract } = require("../contract-instances/tokenContract");

/**
 * getTokenInfo() retruns interested TokenInfo as object
 * @param {string} _tokenAddress address of the tokenContract
 * @param {string} _provider_url rpc url of the node provider
 * @returns {object} containing tokenName, tokenSymbol and tokenDecimal
 */
async function getTokenInfo(_tokenAddress, _provider_url) {
  try {
    const { tokenContract } = await getTokenContract(
      _tokenAddress,
      _provider_url
    );

    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    const tokenDecimal = await tokenContract.decimals();

    return {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenDecimal: parseInt(tokenDecimal),
    };
  } catch (error) {
    console.log("Error at getTokenInfo.js: ");
    console.log(error);
  }
}

module.exports = {
  getTokenInfo,
};
