import { ethers, network, run } from "hardhat";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const IFOInitializableAddress = "0x1b79Ab6F3c4c80780f61614eBEaC7B2493A6e051";
  const lpToken = "0x37e16520C636E184E766A13f0339F61f263a56a5";
  const offerToken = "0x04c8b978C739dfEc62a2F913c870cf47C30228EC";
  const profile = "0x0E59D921E2E8E14AB20276b064abAB0417c30A57";
  const startBlock = "1703749773";
  const endBlock = "1703922573";
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
