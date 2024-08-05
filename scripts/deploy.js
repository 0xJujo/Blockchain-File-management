// const hre = require("hardhat");

// async function main() {
//   const Upload = await hre.ethers.getContractFactory("Upload");
//   const upload = await Upload.deploy();

//   await upload.deployed();

//   console.log("Library deployed to:", upload.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const hre = require("hardhat");

async function main() {
  const upload = await hre.ethers.deployContract("Upload");
  await upload.waitForDeployment();
  console.log("Library deployed to:", upload.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});