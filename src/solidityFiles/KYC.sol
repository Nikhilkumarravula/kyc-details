// SPDX-License-Identifier: MIT

//address of this contract on eth goerli tesnet : 0x789866802E2c4F46a4d3156bfa3F6ff5E42AFaC8
pragma solidity ^0.8.17;

contract KYC {
    
  // Struct to store customer data
  
  struct Customer {
    address aadharOwner;
    uint16 creditScore;
    uint16 activeLoans;
    uint16 closedLoans;
    string loanInquiries;
  }

  address public Owner;
 // Mapping to store customer data
  mapping (uint64 => Customer) private customers;
  // Mapping to store authorized addresses
  mapping (address => bool) public authorizedAddresses; 

  constructor(){
    Owner=msg.sender;
    authorizedAddresses[msg.sender] = true;
  }

  modifier onlyOwner(){
    require(Owner==msg.sender,"you are not the owner of contract");
    _;
  }


  // Function to add authorized addresses
  function addAuthorizedAddress(address _address)  public onlyOwner {
    authorizedAddresses[_address] = true;
  }

// Function to remove authorized addresses
 function removeAuthorizedAddress(address _address)  public onlyOwner {
    authorizedAddresses[_address] = false;
  }

// Function to change ownership
  function changeOwnership(address _newOwner) public onlyOwner{
       Owner = _newOwner;
  }
  // Function to add customer data
  function addCustomer(uint64 _aadharNumber,uint16 _creditScore, uint16 _activeLoans, uint16 _closedLoans, string memory _loanInquiries) public {
       require(customers[_aadharNumber].aadharOwner == address(0),"customer already exists");
    customers[_aadharNumber] = Customer(msg.sender, _creditScore, _activeLoans, _closedLoans, _loanInquiries);
  }

  // Function to retrieve customer data
  function getCustomerData(uint64 _aadharNumber) public  view returns (address,uint16, uint16, uint16, string memory) {
     require(authorizedAddresses[msg.sender], "Unauthorized access");
    return (customers[_aadharNumber].aadharOwner,customers[_aadharNumber].creditScore, customers[_aadharNumber].activeLoans, customers[_aadharNumber].closedLoans, customers[_aadharNumber].loanInquiries);
  }
}
