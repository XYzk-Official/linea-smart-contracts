import { ethers, network } from "hardhat";
import config from '../config';

const main = async () => {
	const networkName = network.name;
	const routerContract = await ethers.getContractFactory("XYzKRouter");

  const router = await routerContract.deploy(config.XYzKFactory[networkName], config.WXYZK[networkName]);
	
	console.log("XYzKRouter: ", router.address);

	 const XYzKZapV1 = await ethers.getContractFactory("XYzKZapV1");

  const xYzKZap = await XYzKZapV1.deploy(
    config.WXYZK[networkName],
    router.address,
    config.MaxZapReverseRatio[networkName]
	);
	
	await xYzKZap.deployed();

  console.log("XYzKZap V1 deployed to:", xYzKZap.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
