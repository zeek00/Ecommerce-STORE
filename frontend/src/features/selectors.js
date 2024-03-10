const selectLoadingState = (state) => state.loading.isLoading;
const selectElectronics = (state) => state.electronics.electronics;
const selectMale = (state)=>state.clothing.male;
const selectFemale = (state)=>state.clothing.female;
const selectCart = (state) => state.cart.cart;
const selectCartError = (state) => state.cart.error;
const selectCount = (state) => state.cart.count;
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
    selectCart,
    selectFail,
    selectCurrentUser,
    selectSessionLoading,
    selectElectronics,
    selectCurrentUserToken,
    selectSessionError,
    selectCartError,
    selectMessage,
    selectCount

};