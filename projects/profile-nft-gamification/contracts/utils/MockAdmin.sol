// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../XYzKProfile.sol";

/** @title MockAdmin.
 * @notice It is a mock contract to test point roles
 * for PancakeProfile.
 */
contract MockAdmin is Ownable {
    XYzKProfile xYzKProfile;
    address public xYzKProfileAddress;

    mapping(address => bool) public hasReceivedPoints;

    uint256 public campaignId1;
    uint256 public campaignId2;
    uint256 public campaignId3;

    uint256 public numberFreePoints;

    constructor(address _xYzKProfileAddress) public {
        xYzKProfileAddress = _xYzKProfileAddress;
        xYzKProfile = XYzKProfile(xYzKProfileAddress);
        numberFreePoints = 88;
        campaignId1 = 711012101;
        campaignId2 = 811012101;
        campaignId3 = 511012101;
    }

    /**
     * @notice Increase number of team points. Only owner can call it.
     */
    function increaseTeamPointsPP(uint16 _teamId, uint256 _numberPoints) external onlyOwner {
        xYzKProfile.increaseTeamPoints(_teamId, _numberPoints, campaignId3);
    }

    /**
     * @notice Increase number of user points. Each address can call it once.
     */
    function increaseUserPointsPP() external {
        // Check if user has already claimed her free points
        require(!hasReceivedPoints[_msgSender()], "has claimed");

        // Check if user is active
        bool isActive;

        isActive = xYzKProfile.getUserStatus(_msgSender());

        require(isActive, "not active");

        // Increase the number of points
        hasReceivedPoints[_msgSender()] = true;
        xYzKProfile.increaseUserPoints(_msgSender(), numberFreePoints, campaignId1);
    }

    /**
     * @notice Increase number of points for multiple users. Only owner can call it.
     */
    function increaseUserPointsMultiplePP(address[] calldata _userAddresses, uint256 _numberPoints) external onlyOwner {
        xYzKProfile.increaseUserPointsMultiple(_userAddresses, _numberPoints, campaignId2);
    }
}
