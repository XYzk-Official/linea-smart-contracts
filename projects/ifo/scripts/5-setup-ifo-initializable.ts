import { ethers, network, run } from "hardhat";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const IFOInitializableAddress = "0x46dB1b64C668880c55251cC7924247605dD6B09A";
  const lpToken = "0xcBa39955e07CC142ABCbDA272c9C9faF0C3e00A9";
  const offerToken = "0x4ED0b454985F847AE04B31443057011a65F2569e";
  const profile = "0x0E59D921E2E8E14AB20276b064abAB0417c30A57";
  const startBlock = "0";
  const endBlock = "0";
  const maxBufferBlocks = "400000";

  const contract = await hre.ethers.getContractAt("IFOInitializable", IFOInitializableAddress, deployer);

  const result = await contract.initialize(lpToken, offerToken, profile, startBlock, endBlock, maxBufferBlocks, admin);

  console.log("Result:", result);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
