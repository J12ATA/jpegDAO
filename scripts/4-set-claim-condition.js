import sdk from './1-initialize-sdk.js';

const contractAddress = '0x4dc9940c00Ff567469B77dbE99988e010Fe663E0';
const bundleDrop = sdk.getBundleDropModule(contractAddress);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions.
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log(
      '✅ Sucessfully set claim condition on bundle drop:',
      bundleDrop.address
    );
  } catch (error) {
    console.error('Failed to set claim condition', error);
  }
})();
