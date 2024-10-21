# today we will create DApp

first create smart contract using solidity
like this 

```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract BuyChai{
    struct Memo {
        string name;
        string message;
        uint  timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner=payable (msg.sender);
    }

    function buyChaiForMe(string memory name, string memory message) public  payable {
        require(msg.value>0, "Please pay grether than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }


    function getMemos() public  view  returns (Memo[] memory){
        return memos;
    }
}
```


now install create new folder for DApp
# npm install --save-dev hardhat


now execute hardhat command for  creating required folder
# npx hardhat

now install some other depedencies
# npm install --save-dev "hardhat@^2.9.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"


after then create folder.. scripts > deploy.js

now write logic inside a deploy.js file and use funtion of smart contract

after writing code execute command for running deploy.js file
# npx hardhat run scripts/deploy.js

and now we will create our React app using following command in same direcotroy where scripts and other folders exists
# npx create-react-app client


deploy.js file deploye contract on hardhat network
finalDeploy.js file deploye contract on test network

now we will deploye contract on test network
so change hardhat.config.js file

--------------------------------------------------------------------------------------------------------------------------------


now we will work to integrate with react app

first copy BuyChai.json(smart contrat builded) file in client/src/contracts folder

now import BuyChai.json file in client/src/App.js as ABI

now create Template 