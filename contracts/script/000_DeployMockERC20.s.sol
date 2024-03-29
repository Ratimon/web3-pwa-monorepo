// SPDX-License-Identifier: MIT
pragma solidity =0.8.20;

import {DeployScript, Deployer} from "forge-deploy/DeployScript.sol";
import {DeployerFunctions} from "@generated/deployer/DeployerFunctions.g.sol";

import {MockERC20} from "@main/mock/MockERC20.sol";

contract DeployMockERC20AScript is DeployScript {
    using DeployerFunctions for Deployer;

    function deploy() external returns (MockERC20) {
        return MockERC20(deployer.deploy_MockERC20("MockERC20", "MockToken", "TA", 18));
    }
}