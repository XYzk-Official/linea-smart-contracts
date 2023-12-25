import { task } from "hardhat/config";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("mint", "Mint token to specific address")
  .addParam("address", "Receiver address")
  .addParam("amount", "Amount in ethers")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const address = (taskArgs.address || "").trim();
    const amount = (taskArgs.amount || "").trim();
    const account = await hre.ethers.getSigners();
    const isAddress = hre.ethers.utils.isAddress(address);
    if (isAddress) {
      try {
        const contract = await hre.ethers.getContractAt(
          "XYzKToken",
          "0x707dc1041dc702a83F7a0af57dDe1a3cdAC9643e",
          account[0]
        );
        const result = await contract.connect(account[0]).mint(address, ethers.utils.parseEther(amount));
        console.log("Transaction done with txh = ", result);
      } catch (error) {
        console.log(error);
      }
    }
  });
