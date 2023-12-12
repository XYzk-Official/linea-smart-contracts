import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;
  const treasury = deployer.address;
  const operator = deployer.address;

  const PoolContract = await ethers.getContractFactory("XYzKPool");

  const xyzkPool = await PoolContract.deploy(
    config.XYzK[name],
    config.MasterChefV2[name],
    admin,
    treasury,
    operator,
    config.pid[name]
  );

  console.log("XYzKPool: ", xyzkPool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
