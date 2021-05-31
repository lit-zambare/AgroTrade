const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::addItem', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let farmerAddress = accountProvider.get();
  let farmerContract;

  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    param = {
      itemIpfsHash: '0x1',
      farmerIpfsHash: '0x2',
    };
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );
  });

  contract('Positive Tests', async () => {
    it('should pass when item is successfully added', async () => {
      const itemCountBeforeItemAdded = await farmerContract.getItemCount.call(farmerAddress);
      await farmerContract.addItem(param.itemIpfsHash);
      const itemCountAfterItemAdded = await farmerContract.getItemCount.call(farmerAddress);

      const beforeCount = itemCountBeforeItemAdded.toNumber();
      const afterCount = itemCountAfterItemAdded.toNumber();

      assert.strictEqual(
        beforeCount + 1,
        afterCount,
        'Item count must be incremented by 1 after adding the item',
      );
    });
  });

  contract('Negative Tests', async () => {
    it('should fail when item ipfs hash is zero', async () => {
      const itemIpfsHash = Utils.ZERO_BYTES32;
      await Utils.expectRevert(
        farmerContract.addItem(itemIpfsHash),
        'IPFS hash must not be zero',
      );
    });
  });
});
