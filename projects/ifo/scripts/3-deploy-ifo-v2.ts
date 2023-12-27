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
  const startBlock = "1703749773"; // Thursday, December 28, 2023 2:49:33 PM
  const endBlock = "1703922573"; // Saturday, December 30, 2023 2:49:33 PM

  const offeringAmountPool0 = parseEther("50");
  const raisingAmountPool0 = parseEther("5");

  // IFO Pool 1
  const offeringAmountPool1 = parseEther("1000");
  const raisingAmountPool1 = parseEther("100");
  const limitPerUserInLp = parseEther("0.5");

  const campaignId = "512100001";
  const numberPoints = "100";
  const thresholdPoints = parseEther("0.035");

  const ifoV2 = await IFOV2Contract.deploy(lpToken, offeringToken, profile, startBlock, endBlock, admin);
  await ifoV2.deployed();

  console.log("New IFOV2 deployed to:", ifoV2.address);
  await ifoV2.setPool(
    offeringAmountPool0,
    raisingAmountPool0,
    limitPerUserInLp,
    false, // tax
    "0"
  );

  await ifoV2.setPool(
    offeringAmountPool1,
    raisingAmountPool1,
    "0",
    true, // tax
    "1"
  );

  await ifoV2.updatePointParameters(campaignId, numberPoints, thresholdPoints);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
