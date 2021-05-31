const FarmerContract = artifacts.require("FarmerContract");
const VendorContract = artifacts.require("VendorContract");

module.exports = function(deployer) {
  deployer.deploy(FarmerContract);
  deployer.deploy(VendorContract);
};
