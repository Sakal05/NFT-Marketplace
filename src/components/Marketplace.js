import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Marketplace() {
  const [data, updateData] = useState([]);
  const [dataFetch, updateFetch] = useState(false);

  const ethers = require("ethers");
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const [walletAddress, updateWalletAddress] = useState("");
  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        console.log(i.tokenId.toString());
        const tokenURI = await contract.tokenURI(i.tokenId);
        const res = await fetch(tokenURI, {
          method: "GET",
          headers: {
            "Content-Type": "text/plain",
          },
        });
        let meta = await res.json();
        //console.log(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId,
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );
    updateData(items);
    updateFetch(true);
  }

  //fetch nft by address
  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "lmutszYXhdQYY2AHL8MzNaHqsgr9vOew";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    // if (!collectionAddress.length) {
    const fetchURL = `${baseURL}?owner=${walletAddress}`;

    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    console.log(nfts.ownedNfts);
    let nftdata = nfts.ownedNfts;
    // }
    // else {
    //   console.log("fetching nfts for collection owned by address");
    //   const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
    //   nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    // }
    // let price = ethers.utils.formatUnits(data.balance.toString(), "ether");
    
    const modifiedNftData = nftdata.map((nft) => {
      console.log(nft.metadata.image);
      let price = ethers.utils.formatUnits(nft.balance.toString(), "ether");
      let items = {
        price,
          tokenId: nft.id.tokenId,
          seller: nft.contract.address,
          owner: nft.contractMetadata.contractDeployer,
          image: nft.metadata.image,
          name: nft.metadata.name,
          description: nft.metadata.description,
      };
      
      return items;
    });
    updateData([...data, ...modifiedNftData]);

      
    if (nfts) {
      console.log("nfts:", nfts);
      // setNFTs(nfts.ownedNfts);
      // setPageKey(pageKey)
    }
  };

  //fetch data if the data fetch status is false
  if (!dataFetch) {
    getAllNFTs();
  }

  //   const sampleData = [
  //     {
  //       name: "NFT#1",
  //       description: "Alchemy's First NFT",
  //       website: "http://axieinfinity.io",
  //       image:
  //         "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //       price: "0.03ETH",
  //       currentlySelling: "True",
  //       address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  //     },
  //     {
  //       name: "NFT#2",
  //       description: "Alchemy's Second NFT",
  //       website: "http://axieinfinity.io",
  //       image:
  //         "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
  //       price: "0.03ETH",
  //       currentlySelling: "True",
  //       address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //     },
  //     {
  //       name: "NFT#3",
  //       description: "Alchemy's Third NFT",
  //       website: "http://axieinfinity.io",
  //       image:
  //         "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //       price: "0.03ETH",
  //       currentlySelling: "True",
  //       address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //     },
  //   ];

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-20">
        <div>
          <input
            type="text"
            className=""
            aria-label="Mix kor ban"
            onChange={(e) => {updateWalletAddress(e.target.value)}}
            value={walletAddress}
          ></input>
          <button onClick={fetchNFTs}>Fetch more NFT</button>
        </div>
        <div className="md:text-xl font-bold text-white">Top NFTs</div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
    </div>
  );
}
