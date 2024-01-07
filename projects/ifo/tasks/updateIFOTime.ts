import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("update-ifo-timer", "Update start and end block time").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const startBlock = "2787789";
    const endBlock = "2897689";
    const account = await hre.ethers.getSigners();
    try {
      const contract = await hre.ethers.getContractAt(
        "IFOV2",
        "0xE132CcE286Dd1dd5cF4578BB685fE260A85a5baA",
        account[0]
      );
      const result = await contract.connect(account[0]).updateStartAndEndBlocks(startBlock, endBlock);
      console.log("Transaction done with txh = ", result);
    } catch (error) {
      console.log(error);
    }
  }
);
