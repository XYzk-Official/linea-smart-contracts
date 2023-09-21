import { ethers, network, run } from "hardhat";
import { formatUnits, parseEther } from "ethers/lib/utils";
import config from "../config";

const main = async () => {
	const MockERC20 = await ethers.getContractFactory("MockERC20");

  const tokenA = await MockERC20.deploy(
    "Token A", "TA", parseEther("10000000")
	);
	const tokenB = await MockERC20.deploy(
    "Token B", "TB", parseEther("10000000")
  );

	console.log("Token A: ", tokenA.address);
	console.log("Token B: ", tokenB.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
