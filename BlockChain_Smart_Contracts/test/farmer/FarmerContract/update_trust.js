const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContractDouble');
const VendorContract = artifacts.require('VendorContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::updateTrust', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);
  const farmerAddress = accountProvider.get();
  const vendorAddress = accountProvider.get();

  let farmerContract;
  let vendorContract;
  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    vendorContract = await VendorContract.new();

    param = {
      farmerIpfsHash: '0x1',
      vendorIpfsHash: '0x2',
      itemIpfsHash: '0x3',
      trust: new BN(4),
    }
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );
    await vendorContract.addVendor(
      param.vendorIpfsHash,
      { from: vendorAddress },
    );
    await farmerContract.addItem(
      param.itemIpfsHash,
      { from: farmerAddress },
    );
    await farmerContract.setVendorContractAddress(vendorContract.address);
    await vendorContract.setFarmerContractAddress(farmerContract.address);
    await vendorContract.buyProduct(
      farmerAddress,
      0,
      { from: vendorAddress },
    );
  });

  contract('Positive Tests', async () => {
    it('should pass when trust value gets updated successfully', async () => {
      const oldTrust = await farmerContract.getTrust(farmerAddress);
      await farmerContract.updateFarmerTrust(
        farmerAddress,
        new BN(0),
        new BN(4),
        { from: vendorAddress },
      );

      const updatedTrust = await farmerContract.getTrust(farmerAddress);
      const expectedTrust = oldTrust.add(new BN(4));
      assert.strictEqual(
        updatedTrust.toNumber(),
        expectedTrust.toNumber(),
        'Trust is not successfully updated.'
      );
    });
  });

  contract('Negative Test', async ()  => {
    // TO DO: test for farmer doesn't exist.
    it('should fail when trust value is not in between 1 and 5', async () => {
      const trust = new BN(10);
      const productId = new BN(0);
      await Utils.expectRevert(
        farmerContract.updateFarmerTrust(
          farmerAddress,
          productId,
          trust,
          { from: vendorAddress },
        ),
        'Trust value cannot be zero and cannot be greater than 5.'
      );
    });

    it('should fail when vendor try to update farmer trust second time for the same product', async () => {
      const trust = new BN(4);
      const productId = new BN(0);

      await farmerContract.updateFarmerTrust(
        farmerAddress,
        productId,
        trust,
        { from: vendorAddress },
      );

      await Utils.expectRevert(
        farmerContract.updateFarmerTrust(
          farmerAddress,
          productId,
          trust,
          { from: vendorAddress },
        ),
        'Multiple trust updations for same product is not allowed.'
      );
    });

    it('should fail when vendor try to update trust without successful trade.', async () => {
      const itemIpfsHash = '0x4';
      const trust = new BN(4);
      const productId = new BN(1);

      await farmerContract.addItem(
        itemIpfsHash,
        { from: farmerAddress },
      );

      await Utils.expectRevert(
        farmerContract.updateFarmerTrust(
          farmerAddress,
          productId,
          trust,
          { from: vendorAddress }
        ),
        'Trade must be successful before updating trust.',
      );
    });
  });
});
