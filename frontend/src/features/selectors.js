const selectLoadingState = (state) => state.loading.isLoading;
const selectElectronics = (state) => state.electronics.electronics;
const selectMale = (state)=>state.clothing.male;
const selectFemale = (state)=>state.clothing.female;
const selectCart = (state) => state.cart.cart;
const selectFail = (state) => state.session.fail;
const selectCurrentUser = (state) => state.session.currentUser;
const selectSessionLoading = (state) => state.session.isLoading;

export {
    selectLoadingState,
    selectMale,
    selectFemale,
    selectCart,
    selectFail,
    selectCurrentUser,
    selectSessionLoading,
    selectElectronics  
};