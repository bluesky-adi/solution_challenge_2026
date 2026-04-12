// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SportShield {
    struct Asset {
        string fingerprint;
        address owner;
        uint256 timestamp;
    }

    mapping(string => Asset) private assets;
    mapping(address => string[]) private userAssets;

    event AssetRegistered(string indexed fingerprint, address indexed owner, uint256 timestamp);

    function registerAsset(string calldata _fingerprint) external {
        require(bytes(_fingerprint).length > 0, "Fingerprint required");
        require(assets[_fingerprint].owner == address(0), "Asset already registered");

        assets[_fingerprint] = Asset({
            fingerprint: _fingerprint,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        // Track user history
        userAssets[msg.sender].push(_fingerprint);

        emit AssetRegistered(_fingerprint, msg.sender, block.timestamp);
    }

    function getAsset(string calldata _fingerprint)
        external
        view
        returns (string memory fingerprint, address owner, uint256 timestamp)
    {
        Asset storage asset = assets[_fingerprint];
        require(asset.owner != address(0), "Asset not found");
        return (asset.fingerprint, asset.owner, asset.timestamp);
    }

    function getUserHistory(address _user) external view returns (string[] memory) {
        return userAssets[_user];
    }
}