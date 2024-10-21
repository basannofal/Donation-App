const hre = require("hardhat");


async function getBalance(address) {
    const balance = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

async function consoleBalance(addresses) {
    let counter = 0;
    for(const address of addresses) {
        console.log(`Address ${counter++} balance: ${await getBalance(address)}`);
        
    }
}

async function consoleMemos(memos) {
    for(const memo of memos) {
        const timestamp = new Date(memo.timestamp * 1000);
        console.log(`Address: ${memo.from} \nName: ${memo.name} \nMessage: ${memo.message} \nTimestamp: ${timestamp}`);
    }
}


async function main() {

    const [owner, from1, from2, from3] = await hre.ethers.getSigners();

    const chai = await hre.ethers.getContractFactory("BuyChai");
    const chaiContract = await chai.deploy();

    await chaiContract.deployed();

    console.log("BuyChai deployed to:", chaiContract.address);

    const addresses = [owner.address, from1.address, from2.address, from3.address];

    console.log("Before buying Chai");
    await consoleBalance(addresses);

    const amount  = {value : hre.ethers.utils.parseEther("1")};
    await chaiContract.connect(from1).buyChaiForMe("name1", "message1", amount);
    await chaiContract.connect(from2).buyChaiForMe("name2", "message2", amount);
    await chaiContract.connect(from3).buyChaiForMe("name3", "message3", amount);

    console.log("After buying Chai");
    await consoleBalance(addresses);

    const memos = await chaiContract.getMemos();
    consoleMemos(memos);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})