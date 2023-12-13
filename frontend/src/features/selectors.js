const selectLoadingState = (state) => state.loading.isLoading;
const selectJewelries = (state) => state.jewelries.jewelry;
const selectSmartphones = (state) => state.electronics.smartphones;
const selectLaptops = (state) => state.electronics.laptops;
const selectMale = (state)=>state.clothing.male;
const selectTops = (state)=>state.clothing.tops;
const selectFemale = (state)=>state.clothing.female;
const selectCart = (state) => state.cart.cart;
const selectFail = (state) => state.session.fail;
const selectCurrentUser = (state) => state.session.currentUser;
const selectSessionLoading = (state) => state.session.isLoading;

export {
    selectLoadingState,
    selectJewelries,
    selectSmartphones,
    selectLaptops,
    selectMale,
    selectTops,
    selectFemale,
    selectCart,
    selectFail,
    selectCurrentUser,
    selectSessionLoading
    
}