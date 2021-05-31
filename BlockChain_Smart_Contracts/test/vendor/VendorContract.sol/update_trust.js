const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContractDouble');
const VendorContract = artifacts.require('VendorContractDouble');
const Utils = require('../../test_lib/utils');

contract('VendorContract::updateTrust', async (accounts) => {
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
    it('should successfully update trust', async () => {
      const productId = new BN(0);
      const trust = new BN(3);

      const oldTrust = await vendorContract.getTrust(vendorAddress);
      await vendorContract.updateVendorTrust(
        vendorAddress,
        productId,
        trust,
        { from: farmerAddress },
      );
      const expectedTrust = oldTrust.add(trust);
      const actualTrust = await vendorContract.getTrust(vendorAddress);

      assert.strictEqual(
        expectedTrust.toNumber(),
        actualTrust.toNumber(),
        `Trust is not successfully updated. Expected ${expectedTrust.toNumber()}
          but found ${actualTrust.toNumber()}`,
      );
    });
  });

  contract('Negative Tests', async () => {
    const productId = new BN(0);
    const trust = new BN(3);

    it('should fail when vendor does not exist', async () => {
      const fakeVendor = accountProvider.get();
      await Utils.expectRevert(
        vendorContract.updateVendorTrust(
          fakeVendor,
          productId,
          trust,
          { from: farmerAddress },
        ),
        'Vendor must exist.',
      );
    });

    it('should fail when trust value is not between 1 and 5 including', async () => {
      const fakeTrust = new BN(10);
      await Utils.expectRevert(
        vendorContract.updateVendorTrust(
          vendorAddress,
          productId,
          fakeTrust,
          { from: farmerAddress },
        ),
        'Trust value cannot be zero and cannot be greater than 5',
      );
    });

    it('should fail when trade is not done yet', async () => {
      const newProductIpfsHash = '0x5';
      const newProductId = new BN(1);
      await farmerContract.addItem(
        newProductIpfsHash,
        { from: farmerAddress },
      );

      await Utils.expectRevert(
        vendorContract.updateVendorTrust(
          vendorAddress,
          newProductId,
          trust,
          { from: farmerAddress },
        ),
        'Trade must be successful.',
      );
    });

    it('should fail when farmer try to update vendor trust second time for the same product', async () => {
      await vendorContract.updateVendorTrust(
        vendorAddress,
        productId,
        trust,
        { from: farmerAddress },
      );

      await Utils.expectRevert(
        vendorContract.updateVendorTrust(
          vendorAddress,
          productId,
          trust,
          { from: farmerAddress },
        ),
        'Multiple trust updations for same product is not allowed.',
      );
    });
  });
});
