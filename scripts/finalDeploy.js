const hre = require("hardhat");




async function main() {

    const chai = await hre.ethers.getContractFactory("BuyChai");
    const chaiContract = await chai.deploy();

    await chaiContract.deployed();

    console.log("BuyChai deployed to:", chaiContract.address);

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})