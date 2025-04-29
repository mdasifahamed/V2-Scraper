const factoryAddresses = require("../Factory_Address.json");
const mainnet_RPC_URL = require("../Mainnet_URL.json");
const { getTokenDataAndWrite } = require("./get-token-data/getOnchainData");

/**
 *
 * main() runs the all the scripts in  to fecth and to store the on chain
 * token pair information in an automatic manner.
 * @param {string} _factoryContractAddress contract address of a factory
 * @param {string} _provider_url rpc url of the node provider
 * @param {string} _fileName name of the json file to store the tokenPairInfo
 * @param {number} startFrom starting index from which number user want to pull information
 * @param {number} endFrom ending index till which number user want to pull information
 *
 */
async function main(
  _factoryContractAddress,
  _provider_url,
  _fileName,
  startFrom,
  endTo
) {
  try {
    await getTokenDataAndWrite(
      _factoryContractAddress,
      _provider_url,
      _fileName,
      startFrom,
      endTo
    );
  } catch (error) {
    console.log(error);
  }
}

Object.keys(factoryAddresses).forEach((protocol) => {
  Object.keys(factoryAddresses[protocol]).forEach((network) => {
    const factoryAddress = factoryAddresses[protocol][network];
    const rpcUrl = mainnet_RPC_URL[network];
    const fileName = `${protocol}-${network}`;
    main(factoryAddress, rpcUrl, fileName, 1, 5)
      .catch((error) => {
        console.log(`Error processing ${fileName}:`, error);
        process.exit(1);
      });
  });
});
