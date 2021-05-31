const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const VendorContract = artifacts.require('VendorContract');
const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('VendorContract::buyProduct', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);
  const vendorAddress = accountProvider.get();
  const farmerAddress = accountProvider.get();

  let vendorContract;
  let farmerContract;
  let param;

  beforeEach(async () => {
    vendorContract = await VendorContract.new();
    farmerContract = await FarmerContract.new();

    param = {
      vendorIpfsHash: '0x1',
      farmerIpfsHash: '0x2',
      itemIpfsHash: '0x3',
    };
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
    await farmerContract.setVendorContractAddress(
      vendorContract.address,
      { from: farmerAddress },
    );
    await vendorContract.setFarmerContractAddress(
      farmerContract.address,
      { from: vendorAddress },
    );
  });

  contract('Positive Tests', async () => {
    it('should successfully buy a product', async () => {
      await vendorContract.buyProduct(
        farmerAddress,
        0,
        { from: vendorAddress}
      );
      const productStatus = await farmerContract.getProductStatus(farmerAddress, 0);
      assert.strictEqual(
        productStatus,
        true,
        'Product status must change to isSold after successful trade.',
      );

      const tradeStatus = await farmerContract.getTradeStatus(
        vendorAddress,
        farmerAddress,
        0,
        { from: vendorAddress },
      );
      assert.strictEqual(
        tradeStatus,
        true,
        'Purchaser must be updated after successful trade.',
      );
    });
  });
});
