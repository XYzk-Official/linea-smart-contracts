import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("register-nft", "Register XYzKBunnies to XYzKProfile")
  .addParam("bunny", "Bunny address")
  .addParam("profile", "Profile address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const name = hre.network.name;
    console.log("Register XYzKBunnies to XYzKProfile on", name);
    const bunny = (taskArgs.bunny || "").trim();
    const profile = (taskArgs.profile || "").trim();
    const account = await hre.ethers.getSigners();
    const isAddress = hre.ethers.utils.isAddress(bunny) && hre.ethers.utils.isAddress(profile);
    if (isAddress) {
      try {
        const contract = await hre.ethers.getContractAt("XYzKProfile", profile, account[0]);
        const result = await contract.connect(account[0]).addNftAddress(bunny);
        console.log("Transaction done with txh = ", result);
      } catch (error) {
        console.log(error);
      }
    }
  });
