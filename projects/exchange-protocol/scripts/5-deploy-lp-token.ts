import { ethers, network, run } from "hardhat";

const main = async () => {
	const LPContract = await ethers.getContractFactory("XYzKLPERC20");

  const token = await LPContract.deploy();

	console.log("LP Token address: ", token.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
