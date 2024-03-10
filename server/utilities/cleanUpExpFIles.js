// const cron = require('node-cron');
// const Cart = require('../database/schemas/Cart');

// // Run a task every minute for testing purposes
// cron.schedule('* * * * *', async () => {
//   try {
//     const expiredCarts = await Cart.find({
//       'items.expiration': { $lte: new Date() }
//     });

//     if (expiredCarts.length > 0) {
//       const updatePromises = expiredCarts.map(async (cart) => {
//         cart.items = []; // Reset items array to empty
//         await cart.save();
//       });

//       await Promise.all(updatePromises);

//       console.log(`${expiredCarts.length} cart items cleaned up.`);
//     } else {
//       console.log('No expired cart items found.');
//     }
//   } catch (error) {
//     console.error('Error cleaning up expired cart items:', error);
//   }
// });