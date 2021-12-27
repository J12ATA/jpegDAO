import sdk from './1-initialize-sdk.js';

// In order to deploy the new contract we need our old friend the app module again.
const appAddress = '0xD2D925dB3d28E527D40bB25C91bEBf2cb5435e58';
const app = sdk.getAppModule(appAddress);

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: 'jpegDAO Governance Token',
      // What's your token's symbol? Ex. "ETH"
      symbol: 'IMG',
    });
    console.log(
      '✅ Successfully deployed token module, address:',
      tokenModule.address
    );
  } catch (error) {
    console.error('failed to deploy token module', error);
  }
})();
