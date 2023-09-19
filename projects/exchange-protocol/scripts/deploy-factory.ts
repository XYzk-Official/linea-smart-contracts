import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  const XYzKFactoryContract = await ethers.getContractFactory("XYzKFactory");

  const xYzKFactory = await XYzKFactoryContract.deploy(
    admin,
  );

  console.log("XYzKFactoryContract: ", xYzKFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
