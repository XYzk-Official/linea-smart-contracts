import { ethers, network, run } from "hardhat";

const main = async () => {
  const XYzKTokenContract = await ethers.getContractFactory("XYzKToken");
  const SyrupContract = await ethers.getContractFactory("SyrupBar");
  const currentBlock = await ethers.provider.getBlockNumber();
  const [deployer] = await ethers.getSigners();
  const admin = deployer.address;
  const treasury = deployer.address;

  const xYzK = await XYzKTokenContract.deploy();
  const syrup = await SyrupContract.deploy(xYzK.address);

  console.log("Deployer address", deployer.address);
  console.log("XYzKToken address: ", xYzK.address);
  console.log("SyrupBar address: ", syrup.address);

  const MasterchefContract = await ethers.getContractFactory("MasterChef");
  const masterchef = await MasterchefContract.deploy(
    xYzK.address,
    syrup.address,
    admin,
    ethers.BigNumber.from("1"),
    currentBlock
  );

  const XYzKVaultContract = await ethers.getContractFactory("XYzKVault");
  const xYzKVault = await XYzKVaultContract.deploy(xYzK.address, syrup.address, masterchef.address, admin, treasury);
  const VaultOwnerContract = await ethers.getContractFactory("VaultOwner");
  const vaultOwner = await VaultOwnerContract.deploy(xYzK.address);

  console.log("MasterChefContract address: ", masterchef.address);
  console.log("XYzKVaultContract address: ", xYzKVault.address);
  console.log("VaultOwner deployed to:", vaultOwner.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
