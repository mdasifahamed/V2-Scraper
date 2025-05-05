const fs = require("fs");
const { getPairContract } = require("../contract-instances/pairContract");
const { getPairslength, getPairsAddress } = require("./getPairsInfo");
const { getTokenInfo } = require("./getTokenInfo");
const { ethers } = require("hardhat");

/**
 * getTokenDataAndWrite() reads oncahin tokenInfo of a pairs and store them in json file.
 * @param {string} _factoryContractAddress factory contract address
 * @param {string} _provider_url rpc url of the node privder
 * @param {string} _filename name of the json file to store the tokenPairInfo
 * @param {number} startFrom starting index from which number user want to pull information
 * @param {number} endFrom ending index till which number user want to pull information
 */

async function getTokenDataAndWrite(
  _factoryContractAddress,
  _provider_url,
  _filename,
  startFrom,
  endTo
) {
  const pairslength = await getPairslength(
    _factoryContractAddress,
    _provider_url
  );
  if (!pairslength) {
    throw new Error("Pairs Length Not Found");
  }

  let pairList = [];
  if (startFrom === 0 || startFrom < 0 || endTo === 0 || endTo < 0) {
    throw new Error("Strating Or Ending Index Cannot Be 0 Negative");
  }
  startFrom = startFrom ? startFrom - 1 : 0;
  endTo = endTo ? endTo + 1 : pairslength;

  try {
    console.log("Total Pairs Length: ", pairslength);
    // Add allPairsLength at the top of the JSON file
    pairList.push({ allPairsLength: pairslength });

    for (let i = startFrom; i < endTo; i++) {
      try {
        const pairAddress = await getPairsAddress(
          _factoryContractAddress,
          _provider_url,
          i
        );
        const { pairContract } = await getPairContract(
          pairAddress,
          _provider_url
        );
        const token0Address = await pairContract.token0();
        const token1Address = await pairContract.token1();
        const [reserve0, reserve1] = await pairContract.getReserves();
        const token0Info = await getTokenInfo(token0Address, _provider_url);
        const token1InFo = await getTokenInfo(token1Address, _provider_url);

        const pairInfo = {
          PairAddress: pairAddress,
          Token0Name: token0Info.tokenName,
          Token0Symbol: token0Info.tokenSymbol,
          Token0Decimals: token0Info.tokenDecimal,
          Token0Address: token0Address,
          Token0Reserve: ethers.formatUnits(
            reserve0,
            parseInt(token0Info.tokenDecimal)
          ),
          Token1Name: token1InFo.tokenName,
          Token1Symbol: token1InFo.tokenSymbol,
          Token1Decimals: token1InFo.tokenDecimal,
          Token1Address: token1Address,
          Token1Reserve: ethers.formatUnits(
            reserve1,
            parseInt(token1InFo.tokenDecimal)
          ),
        };

        pairList.push(pairInfo);

        fs.writeFile(`${_filename}.json`, JSON.stringify(pairList), (err) => {
          if (err) {
            console.log("Error at : getOnChainData.js while writing to file");
            console.log(err);
          }
        });

        console.log(
          `Pair ${
            i + 1
          } Token Information Fetched And Stored To ${_filename}.json File`
        );
      } catch (pairError) {
        console.log(`Error at pair ${i}: ${pairError}`);
        console.log(`Skipping pair ${i} and continuing with the next one.`);
      }
    }
  } catch (error) {
    console.log("Error at getOnChainData.js");
    console.log(error);
  }
}

module.exports = {
  getTokenDataAndWrite,
};
