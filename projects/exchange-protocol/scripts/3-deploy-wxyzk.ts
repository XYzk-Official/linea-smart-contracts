import { ethers, network, run } from "hardhat";

const main = async () => {
	const WXYZK = await ethers.getContractFactory("WXYZK");

  const wXYZKToken = await WXYZK.deploy();
	

	console.log("Token WXYZK: ", wXYZKToken.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
