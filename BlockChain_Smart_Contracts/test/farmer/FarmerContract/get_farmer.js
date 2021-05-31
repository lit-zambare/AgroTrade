const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::getFarmer', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let farmerAddress = accountProvider.get();
  let farmerContract;
  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    param = {
      farmerIpfsHash: '0x0200000000000000000000000000000000000000000000000000000000000000',
    };
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );
  });

  it('should successfully get farmer details', async () => {
    console.log('farmer address :-', farmerAddress);
    const data = await farmerContract.getFarmer(
      farmerAddress,
      {from: farmerAddress}
    );
    ipfsHash = data[0];
    assert.strictEqual(
      ipfsHash,
      param.farmerIpfsHash,
      'Farmer ipfs hash must match with added'
    );
  });
});
