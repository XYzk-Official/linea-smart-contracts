import { parseEther } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("update-point", "Update start and end block time").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    try {
      const ifoV2Address = "0x30FcEfdB37d752b7F4bC69d198c73AfF07af4546";
      const account = await hre.ethers.getSigners();
      const ifoV2 = await hre.ethers.getContractAt("IFOV2", ifoV2Address, account[0]);

      const campaignId = "512100002";
      const numberPoints = "100";
      const thresholdPoints = parseEther("0.035");

      await ifoV2.updatePointParameters(campaignId, numberPoints, thresholdPoints);
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
);
