import { ethers, network, run } from "hardhat";

const main = async () => {
  const { name } = network;
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;

  console.log(`Deploying to: ${name}... with admin address`, admin);
  const contract = await ethers.getContractFactory("IFOInitializable");

  const ifoInitializable = await contract.deploy();

  console.log("IFOInitializable deployed to:", ifoInitializable.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
