// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Deployer, getDeployer} from "forge-deploy/Deployer.sol";

import {MockERC20} from "@main/mock/MockERC20.sol";

contract RegisterMockERC20Script is Script {
    Deployer deployer;

    uint256 public constant WAD = 1e18;

    function setUp() public {
        deployer = getDeployer();
    }

    function run() public {


        address recipient = 0xdeaDDeADDEaDdeaDdEAddEADDEAdDeadDEADDEaD;
        uint256 amount = 1_000_000 * WAD;

        MockERC20 token = MockERC20(deployer.getAddress("MockERC20_A"));

        console.log(string.concat("before: token balance"));
        console.log(token.balanceOf(recipient));
        
        vm.broadcast();

        token.transfer(recipient, amount);
        console.log(string.concat("after: token balance"));
        console.log(token.balanceOf(recipient));
    }
}