// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./BeraSleepBunnies.sol";

/** @title BunnyMintingStation.
 * @dev This contract allows different factories to mint
 * BeraSleep Collectibles/Bunnies.
 */
contract BunnyMintingStation is AccessControl {
    BeraSleepBunnies public beraSleepBunnies;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Modifier for minting roles
    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, _msgSender()), "Not a minting role");
        _;
    }

    // Modifier for admin roles
    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Not an admin role");
        _;
    }

    constructor(BeraSleepBunnies _beraSleepBunnies) public {
        beraSleepBunnies = _beraSleepBunnies;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /**
     * @notice Mint NFTs from the BeraSleepBunnies contract.
     * Users can specify what bunnyId they want to mint. Users can claim once.
     * There is a limit on how many are distributed. It requires CAKE balance to be > 0.
     */
    function mintCollectible(
        address _tokenReceiver,
        string calldata _tokenURI,
        uint8 _bunnyId
    ) external onlyMinter returns (uint256) {
        uint256 tokenId = beraSleepBunnies.mint(_tokenReceiver, _tokenURI, _bunnyId);
        return tokenId;
    }

    /**
     * @notice Set up names for bunnies.
     * @dev Only the main admins can set it.
     */
    function setBunnyName(uint8 _bunnyId, string calldata _bunnyName) external onlyOwner {
        beraSleepBunnies.setBunnyName(_bunnyId, _bunnyName);
    }

    /**
     * @dev It transfers the ownership of the NFT contract to a new address.
     * @dev Only the main admins can set it.
     */
    function changeOwnershipNFTContract(address _newOwner) external onlyOwner {
        beraSleepBunnies.transferOwnership(_newOwner);
    }
}
