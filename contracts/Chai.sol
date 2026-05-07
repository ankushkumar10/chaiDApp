// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Chai {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Memo[] public memos;
    address payable public owner;

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        memos.push(Memo(name, message, block.timestamp, msg.sender));
        
        emit NewMemo(msg.sender, block.timestamp, name, message);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getMemoCount() public view returns (uint256) {
        return memos.length;
    }
}
