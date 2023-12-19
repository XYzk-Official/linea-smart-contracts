import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  const { name } = network;
  const IContract = await ethers.getContractFactory("IXYzK");

  const iXYzK = await IContract.deploy(config.XYzKPool[name], config.Admin[name], config.ceiling[name]);

  console.log("iXYzK: ", iXYzK.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
