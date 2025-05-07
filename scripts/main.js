const factoryAddresses = require("../Factory_Address.json");
const mainnet_RPC_URL = require("../Mainnet_URL.json");
const { getTokenDataAndWrite } = require("./get-token-data/getOnchainData");
const lodash = require("lodash");
const chainMap = require("../map.json");
const path = require("path");

const args = process.argv;

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

if (args.length < 6 || args.length > 6) {
  throw new Error(`Invaild Args`);
}
const dexName = args[2];
const networks = args[3];
const startingPoint = args[4];
const endingPoint = args[5];

const network = chainMap[networks.toLocaleLowerCase()];
if (!network) {
  throw new Error("Invalid Chain Name");
}

const defiAddresses = factoryAddresses[lodash.startCase(dexName)];
if (!defiAddresses) {
  throw new Error("Invalid Defi Name");
}

const factoryAddress = defiAddresses[network];
if (!factoryAddress) {
  throw new Error(
    "Factory Address not found for the specified Defi Name and Network"
  );
}
const provider = mainnet_RPC_URL[network];
if (!provider) {
  throw new Error(
    "Provider  not found for the specified Defi Name and Network"
  );
}
const fileName = `${lodash.startCase(dexName)}-${networks}`;
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
      parseInt(startFrom),
      parseInt(endTo)
    );
  } catch (error) {
    console.log(error);
  }
}

main(factoryAddress, provider, fileName, startingPoint, endingPoint).catch(
  (error) => {
    console.log(error);
    process.exit(1);
  }
);
