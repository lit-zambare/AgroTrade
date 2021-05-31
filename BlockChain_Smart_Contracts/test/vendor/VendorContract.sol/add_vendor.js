const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const VendorContract = artifacts.require('VendorContract');
const Utils = require('../../test_lib/utils');

contract('VendorContract::addVendor', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);
  const vendoreAddress = accountProvider.get();
  let vendorContract;
  let param;

  beforeEach(async () => {
    vendorContract = await VendorContract.new();
    param = {
      ipfsHash: '0x1',
    };
  });

  contract('Negative Tests', async () => {
    it('should fail when ipfs hash is empty.', async () => {
      const emptyIpfsHash = Utils.ZERO_BYTES32;
      await Utils.expectRevert(
        vendorContract.addVendor(
          emptyIpfsHash,
          { from: vendoreAddress },
        ),
        'Ipfs hash should not be zero',
      );
    });

    it('should fail when vendor is already exists.', async () => {
      await vendorContract.addVendor(
        param.ipfsHash,
        { from: vendoreAddress },
      );
      await Utils.expectRevert(
        vendorContract.addVendor(
          param.ipfsHash,
          { from: vendoreAddress },
        ),
        'Vendor already exists.',
      );
    });
  });

  contract('Positive Tests', async () => {
    it('should add vendor successfully.', async () => {
      await vendorContract.addVendor(
        param.ipfsHash,
        { from: vendoreAddress },
      );
      const vendor = await vendorContract.vendors.call(vendoreAddress);
      assert.isNotNull(
        vendor,
        'Vendor is not added successfully.',
      );
    });
  });
});
