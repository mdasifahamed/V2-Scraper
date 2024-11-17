const fs = require("fs");
const { getPairContract } = require("../contract-instances/pairContract");
const { getPairslength, getPairsAddress } = require("./getPairsInfo");
const { getTokenInfo } = require("./getTokenInfo");

/**
 * getTokenDataAndWrite() reads oncahin tokenInfo of a pairs and store them in json file.
 * @param {string} _factoryContractAddress factory contract address
 * @param {string} _provider_url rpc url of the node privder
 * @param {string} _filename name of the json file to store the tokenPairInfo
 */

async function getTokenDataAndWrite(
  _factoryContractAddress,
  _provider_url,
  _filename
) {
  const pairslength = await getPairslength(
    _factoryContractAddress,
    _provider_url
  );
  if (!pairslength) {
    throw new Error("Pairs Length Not Found");
  }

  let pairList = [];

  try {
    for (let i = 0; i < pairslength; i++) {
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
        const token0Info = await getTokenInfo(token0Address, _provider_url);
        const token1InFo = await getTokenInfo(token1Address, _provider_url);

        const pairInfo = {
          PairAddress: pairAddress,
          Token0Name: token0Info.tokenName,
          Token0Symbol: token0Info.tokenSymbol,
          Token0Address: token0Address,
          Token1Name: token1InFo.tokenName,
          Token1Symbol: token1InFo.tokenSymbol,
          Token1Address: token1Address,
        };

        pairList.push(pairInfo);

        fs.writeFile(`${_filename}.json`, JSON.stringify(pairList), (err) => {
          if (err) {
            console.log("Error at : getOnChainData.js while writing to file");
            console.log(err);
          }
        });

        console.log(
          `Pair ${i} Token Information Fetched And Stored To ${_filename}.json File`
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
