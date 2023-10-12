// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Deployer, getDeployer} from "forge-deploy/Deployer.sol";

import {MockERC20} from "@main/mock/MockERC20.sol";

contract TransferMockERC20Script is Script {
    Deployer deployer;

    uint256 public constant WAD = 1e18;

    function setUp() public {
        deployer = getDeployer();
    }

    function run() public {


        address recipient = 0xdeaDDeADDEaDdeaDdEAddEADDEAdDeadDEADDEaD;
        uint256 amount = 1_000_000 * WAD;

        MockERC20 token = MockERC20(deployer.getAddress("MockERC20"));

        console.log(string.concat("before: token balance"));
        console.log(token.balanceOf(recipient));
        
        // // address is already funded with ETH
        // string memory mnemonic = "test test test test test test test test test test test junk";
        // uint256 senderPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 0);
        // address senderAddress = vm.addr(senderPrivateKey); //  address = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

        // console.log(string.concat("sender address: "));
        // console.log(senderAddress);

        // vm.startBroadcast(senderPrivateKey);


        vm.broadcast();
        token.mint(msg.sender, amount);

        vm.broadcast();
        token.transfer(recipient, amount);
        console.log(string.concat("after: token balance"));
        console.log(token.balanceOf(recipient));
    }
}