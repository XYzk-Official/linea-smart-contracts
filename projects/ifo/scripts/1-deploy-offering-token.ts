import { ethers, network, run } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;
  const tokenContract = await ethers.getContractFactory("ProxyERC20");

  const token = await tokenContract.deploy(admin);

  console.log("Offering token address: ", token.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
