import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

// This is our governance contract.
const voteAddress = '0x6334c92482b1a687f349c0fA4E3f1BC30ad767A5';
const voteModule = sdk.getVoteModule(voteAddress);

// This is our ERC-20 contract.
const tokenAddress = '0x23a701A5Fb89b13528C48d0bd305C4f7e0d8b05d';
const tokenModule = sdk.getTokenModule(tokenAddress);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole('minter', voteModule.address);

    console.log(
      'Successfully gave vote module permissions to act on token module'
    );
  } catch (error) {
    console.error(
      'failed to grant vote module permissions on token module',
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 50% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent50 = ownedAmount.div(100).mul(50);

    // Transfer 50% of the supply to our voting contract.
    await tokenModule.transfer(voteModule.address, percent50);

    console.log('✅ Successfully transferred tokens to vote module');
  } catch (err) {
    console.error('failed to transfer tokens to vote module', err);
  }
})();
