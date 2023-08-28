import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../../config";

const currentNetwork = network.name;

const main = async () => {
  console.log("Deploying to network:", currentNetwork);

  const BeraSleepBunniesContract = await ethers.getContractFactory("BeraSleepBunnies");

  const beraSleepBunnies = await BeraSleepBunniesContract.deploy("ipfs://");

  console.log("BeraSleepBunnies deployed to:", beraSleepBunnies.address);
  await beraSleepBunnies.setBunnyName(5, "Sleepy");
  await beraSleepBunnies.setBunnyName(6, "Dollop");
  await beraSleepBunnies.setBunnyName(7, "Twinkle");
  await beraSleepBunnies.setBunnyName(8, "Churro");
  await beraSleepBunnies.setBunnyName(9, "Sunny");

  const _tokenPrice = parseEther("4");
  const _ipfsHash = "";
  const _startBlockTime = "1";
  const _endBlockTime = "1";

  const BunnyMintingStation = await ethers.getContractFactory("BunnyMintingStation");
  const bunnyMintingStation = await BunnyMintingStation.deploy(beraSleepBunnies.address);
  console.log("BunnyMintingStation deployed to:", bunnyMintingStation.address);

  const BunnyFactoryV2 = await ethers.getContractFactory("BunnyFactoryV2");
  const bunnyFactoryV2 = await BunnyFactoryV2.deploy(
    beraSleepBunnies.address,
    config.BeraSleepToken[currentNetwork],
    _tokenPrice,
    _ipfsHash,
    _startBlockTime,
    _endBlockTime
  );

  const BunnyFactoryV3 = await ethers.getContractFactory("BunnyFactoryV3");
  const bunnyFactoryV3 = await BunnyFactoryV3.deploy(
    bunnyFactoryV2.address,
    bunnyMintingStation.address,
    config.BeraSleepToken[currentNetwork],
    _tokenPrice,
    _ipfsHash,
    _startBlockTime
  );

  console.log("BunnyFactoryV3 deployed to:", bunnyFactoryV3.address);

  await bunnyFactoryV3.setBunnyJson("sleepy.json", "dollop.json", "twinkle.json", "churro.json", "sunny.json");

  const MINTER_ROLE = await bunnyMintingStation.MINTER_ROLE();
  console.log("minter_role", MINTER_ROLE);
  await bunnyMintingStation.grantRole(MINTER_ROLE, bunnyFactoryV3.address);

  await beraSleepBunnies.transferOwnership(bunnyMintingStation.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
