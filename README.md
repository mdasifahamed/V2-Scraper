# READ-On-Chain-Data

A project for collecting and analyzing on-chain data from DeFi platforms like Uniswap, SushiSwap, PancakeSwap, and more. This tool simplifies fetching on-chain information, making it easier to track and understand decentralized trading activities.

## Table of Contents

1. [How to Use](#how-to-use)
2. [How It Works](#how-it-works)
3. [Benefits](#benefits)
4. [Contributing](#contributing)

---

## How to Use

### Prerequisites

- **Node.js** (v18+ recommended)

### Setup

1. **Clone the repository**:

```bash
   git clone https://github.com/mdasifahamed/READ-On-Chain-Data.git
   cd READ-On-Chain-Data
   npm install
   npx hardhat compile
```

3. **Setup the factory addresses**:

In the `Factory_Address.json` file fill it up with the factory address of the dex's according to the chain

**Factory_Addresses.json**

```javascript
{
  "UniSwap": {
    "Artbitum": "0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9",
    "Ethereum": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  }
}
```

3. **Open the main.js file and configure it**:

At the `main.js` you need to pass some parameters

```javascript
async function main(
  _factoryContractAddress, // You need to pass the factory contract address which you can get from the from the Factory_Address.json file by loading it to the main.js file exapmle id given on file
  _provider_url, // You also need to pass the node provider rpc url which also can be get from the Mainnet_URL.json by loading it to the main.js file example is given already
  _fileName, // your desired file name of the json file where the data will be stored for further use/analyze
  startFrom, // from which number you want start fecth as they have thousands of pairs by this way you can limit the fecthing
  endTo // till which number you want to fecth pair information.
) {}
```

4. **Run it from the terminal**
   If everthing is configured up properly you have to run the following command to use it .

```bash
    node script/main.js
```

## Bonus

There is a utility function which you can use to convert the json file to a Excel file

to use that follow the below steps.

1. After finishing the fetching the data that is stored to a json file.
   from `jsonToExcel.js` file

```javascript
    ...
    const DexName_ChainName = require("Path Of The Created Json File"); // define the path of the json file that has the on-chain data which is fetched from dex.

    // ... rest of the code
jsonToXlsx(DexName_ChainName, "YourExpectdFileName.xlsx");// `YourExpectdFileName` just replace it with your desired name or you keep it as it if you want.
```

2. Run the following command from the terminal

```bash
    node script/utils/jsonToExcel.js
```

## How It Works

### Blockchain RPC-Node Provider Integration

- The project connects to a blockchain network using a provider.

### DeFi Platform Data Retrieval

- Fetches pairs data from DeFi platforms like **Uniswap**, **SushiSwap**, and **PancakeSwap** using their respective factory contracts.
- The scripts utilize **Ethers.js** to interact with the blockchain.

### Data Processing

- Transactions are filtered to extract relevant information, such as **liquidity pairs**,
- You can customize the logic to suit your requirements.

### Output

- Fetches the data and stores them to a json file.

## Benefits

- **Simplified Data Collection**: Streamlines the process of gathering real-time on-chain data from major DeFi platforms.

- **Customizable**: The modular structure allows developers to add or modify functionalities to suit their projects.

- **Analysis Ready**: Provides raw data for deeper analysis of decentralized trading activities, including liquidity trends and price movements.

- **Time-Saving**: Automates repetitive tasks like connecting to DeFi contracts and parsing transactions.

## Contributing

I welcome contributions! If you have ideas for improving the project or fixing issues, feel free to submit a pull request or open an issue.
