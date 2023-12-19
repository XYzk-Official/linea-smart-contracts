import { ethers, network, run } from "hardhat";

const main = async () => {
  const ERC721NFTMarketV1 = await ethers.getContractFactory("ERC721NFTMarketV1");

  const admin = "0x10A0031781971bd37504354BBa49299885aD5cd4";
  const treasury = "0x10A0031781971bd37504354BBa49299885aD5cd4";
  const WXYzK = "0xEB9Ee513943FcaeC858B74441B5A4205380b9560";
  const minimumAskPrice = "5000000000000000"; // 0.005 WXYzK
  const maximumAskPrice = "10000000000000000000000"; // 10,000 WXYzK

  const contract = await ERC721NFTMarketV1.deploy(admin, treasury, WXYzK, minimumAskPrice, maximumAskPrice);

  console.log("ERC721NFTMarketV1 address: ", contract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
