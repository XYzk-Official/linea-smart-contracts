import { ethers, network, run } from "hardhat";

const main = async () => {
  const CakeContract = await ethers.getContractFactory("CakeToken");

  const [deployer] = await ethers.getSigners();

  const cake = await CakeContract.deploy();

  console.log("Deployer address", deployer.address);
  console.log("Cake address: ", cake.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
