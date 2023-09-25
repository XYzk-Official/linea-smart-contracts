import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../../config";

const currentNetwork = network.name;

const main = async () => {
  console.log("Deploying to network:", currentNetwork);

  const _numberXYzKToRegister = parseEther("1"); // 1 CAKE
  const _numberXYzKToReactivate = parseEther("2"); // 2 CAKE
  const _numberXYzKToUpdate = parseEther("2"); // 2 CAKE

  const XYzKProfile = await ethers.getContractFactory("XYzKProfile");

  const xYzKProfile = await XYzKProfile.deploy(
    config.XYzKToken[currentNetwork],
    _numberXYzKToReactivate,
    _numberXYzKToRegister,
    _numberXYzKToUpdate
  );

  console.log("XYzKProfile deployed to:", xYzKProfile.address);

  await xYzKProfile.addTeam("Syrup Storm", "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/syrup-storm.json");
  await xYzKProfile.addTeam(
    "Fearsome Flippers",
    "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/fearsome-flippers.json"
  );
  await xYzKProfile.addTeam(
    "Chaotic Cakers",
    "ipfs://QmamkDch4WBYGbchd6NV7MzPvG1NgWqWHNnYogdzreNtBn/chaotic-cakers.json"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
