const hre = require("hardhat");
///home/sakal/ChainBattled/artifacts/contracts/ChainBattles.sol/ChainBottles.json

async function main() {
    // const contractAddress="0x41a614f841284932a93f133315f7fC14761431F9";
    // const contractABI = abi.abi;

    // const provider = new hre.ethers.providers.AlchemyProvider("mumbai", "g3IZYxQ4Hw3QsoXQgCMNjwn4ZuVO0ncC");
    // const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const nftContractFactory = await hre.ethers.getContractFactory("NFTMarketplace");
    const contract = await nftContractFactory.attach(
        "0xC9a2e14B2D001587eF4797c224332fEd612d1fb3" // The deployed contract address
    );
    // const contract = new hre.ethers.Contract(contractAddress, contractABI, signer);


    try {
        const getmynft = await contract.getMyNFTs();
        console.log(getmynft);
        console.log("create successfully successfully");
    }
    catch (err) {
        console.log(err);
    }
    
}

main();