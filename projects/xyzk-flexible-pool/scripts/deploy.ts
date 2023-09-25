import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const treasury = deployer.address;
  const admin = deployer.address;

  const XYzKFlexiblePoolContract = await ethers.getContractFactory("XYzKFlexiblePool");

  const pool = await XYzKFlexiblePoolContract.deploy(config.XYzK[name], config.XYzKPool[name], admin, treasury);

  console.log("XYzKFlexiblePool: ", pool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
