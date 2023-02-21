const hre = require("hardhat");
///home/sakal/ChainBattled/artifacts/contracts/ChainBattles.sol/ChainBottles.json

async function main() {
    // const contractAddress="0x41a614f841284932a93f133315f7fC14761431F9";
    // const contractABI = abi.abi;

    // const provider = new hre.ethers.providers.AlchemyProvider("mumbai", "g3IZYxQ4Hw3QsoXQgCMNjwn4ZuVO0ncC");
    // const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const nftContractFactory = await hre.ethers.getContractFactory("NFTMarketplace");
    const contract = await nftContractFactory.attach(
        "0x26E2081a7a799Af44e6a432Fac83Cfb9b9e7e985" // The deployed contract address
    );
    // const contract = new hre.ethers.Contract(contractAddress, contractABI, signer);


    try {
        await contract.createToken('{"name": "Testing", "description": "ok tesitng, the legendary hammer of the Norse god of thunder.", "image": "https://gateway.pinata.cloud/ipfs/QmXou1mty7AqhKzxrxC5C7Xqx8yVjVi8ZEqjacUpQQ89hD", "price" : "0.01"}', 0.01);

        console.log("create successfully successfully");
    }
    catch (err) {
        console.log(err);
    }
    
}

main();