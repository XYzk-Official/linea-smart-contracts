import { ethers, network, run } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  console.log(`Deploying to: ${name}... with admin address`, admin);
  const IFOV2Contract = await ethers.getContractFactory("IFOV2");
  const lpToken = "0x37e16520C636E184E766A13f0339F61f263a56a5";
  const offeringToken = "0x04c8b978C739dfEc62a2F913c870cf47C30228EC";
  const profile = "0x0E59D921E2E8E14AB20276b064abAB0417c30A57";
  const startBlock = "2797351";
  const endBlock = "2806351";

  const ifoV2 = await IFOV2Contract.deploy(lpToken, offeringToken, profile, startBlock, endBlock, admin);
  await ifoV2.deployed();

  console.log("New IFOV2 deployed to:", ifoV2.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
