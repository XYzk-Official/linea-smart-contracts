import { ethers, network, run } from "hardhat";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const IFOInitializableAddress = "0x1b4c98Bb30c5d225fC14FdE2fBFBBE934DD4AF9C";
  const lpToken = "0x37e16520C636E184E766A13f0339F61f263a56a5";
  const offerToken = "0x04c8b978C739dfEc62a2F913c870cf47C30228EC";
  const profile = "0x0E59D921E2E8E14AB20276b064abAB0417c30A57";
  const startBlock = "1704447371";
  const endBlock = "1704620171";
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
