import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  console.log(`Deploying to: ${name}... with admin address`, admin);
  const IFOV2 = await ethers.getContractFactory("IFOV2");

  const ifoV2 = await IFOV2.deploy(
    "0xcBa39955e07CC142ABCbDA272c9C9faF0C3e00A9",
    "0x4ED0b454985F847AE04B31443057011a65F2569e",
    "0x0E59D921E2E8E14AB20276b064abAB0417c30A57",
    "0",
    "0",
    admin
  );

  console.log("IFOV2 deployed to:", ifoV2.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
