import { parseEther } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("set-pool", "Set Pool for basic & unlimited sale").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    try {
      const ifoV2Address = "0x30FcEfdB37d752b7F4bC69d198c73AfF07af4546";
      const account = await hre.ethers.getSigners();
      const ifoV2 = await hre.ethers.getContractAt("IFOV2", ifoV2Address, account[0]);

      const offeringAmountPool0 = parseEther("200");
      const raisingAmountPool0 = parseEther("20");

      // IFO Pool 1
      const offeringAmountPool1 = parseEther("1000");
      const raisingAmountPool1 = parseEther("100");
      const limitPerUserInLp = parseEther("50");

      await ifoV2.setPool(
        offeringAmountPool0,
        raisingAmountPool0,
        limitPerUserInLp,
        false, // tax
        "0"
      );

      await ifoV2.setPool(
        offeringAmountPool1,
        raisingAmountPool1,
        "0",
        true, // tax
        "1"
      );
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
);
