const hre = require("hardhat");

async function main() {
  console.log("Deploying OpenVote contract...");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.deployed();

  console.log("OpenVote contract deployed to:", voting.address);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await voting.deployTransaction.wait(5);

  console.log("Contract deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 