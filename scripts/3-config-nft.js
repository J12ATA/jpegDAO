import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const dropModuleAddress = '0x4dc9940c00Ff567469B77dbE99988e010Fe663E0';
const bundleDrop = sdk.getBundleDropModule(dropModuleAddress);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'image icon',
        description: 'This NFT will give you access to jpegDAO!',
        image: readFileSync('scripts/assets/img.png'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();
