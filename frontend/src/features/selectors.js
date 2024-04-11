const selectLoadingState = (state) => state.loading.isLoading;
const selectElectronics = (state) => state.electronics.electronics;
const selectMale = (state)=>state.clothing.male;
const selectFemale = (state)=>state.clothing.female;
const selectProducts = (state)=>state.products.products;
const selectFilteredProducts = (state)=>state.products.filtered;
const selectCart = (state) => state.cart.cart;
const selectLikes = (state) => state.likes.likes;
const selectCartError = (state) => state.cart.error;
const selectCartCount = (state) => state.cart.count;
const selectLikesCount = (state) => state.likes.count;
const selectMessage = (state) => state.cart.message;
const selectFail = (state) => state.session.fail;
const selectCurrentUser = (state) => state.session.currentUser;
const selectCurrentUserToken = (state) => state.session.token;
const selectSessionError = (state) => state.session.error;
const selectSessionLoading = (state) => state.session.isLoading;

export {
    selectLoadingState,
    selectMale,
    selectFemale,
    selectProducts,
    selectFilteredProducts,
    selectCart,
    selectLikes,
    selectFail,
    selectCurrentUser,
    selectSessionLoading,
    selectElectronics,
    selectCurrentUserToken,
    selectSessionError,
    selectCartError,
    selectMessage,
    selectCartCount,
    selectLikesCount

};