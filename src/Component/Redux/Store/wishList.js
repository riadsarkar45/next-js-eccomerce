import useAxiosPublic from "@/Component/Hooks/UseAxiosPublic";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const loadFromLocalStorage = () => {
    const wishListItems = localStorage.getItem('wishList');
    if (!wishListItems) return [];
    return JSON.parse(localStorage.getItem('wishList'));
}

export const syncWishListItem = createAsyncThunk(
    "wishList/syncWishListItem",
    async (userId, { getState }) => {
        try {
            const axiosPublic = useAxiosPublic();
            const { wishListItems } = getState().wishList;
            const sync = await axiosPublic.post(`/api/syncWishlistItem/${userId}`, { userId, wishList: wishListItems });
            console.log(sync.data);
            if (sync?.data?.msg === 'ok') {
                localStorage.removeItem("wishList");

            }
            return { success: true };
        } catch (e) {
            console.log(e);
            return { success: false };
        }
    }
)

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: { wishListItems: loadFromLocalStorage() },
    reducers: {
        addToWishList: (state, action) => {
            console.log(action);
            const { userId, productId, quantity, productImg, title, price } = action.payload;

            let wishListItems = []

            state.wishListItems.push({ productId, quantity, productImg, title, price })

            
            localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
            wishListItems.push({ productId, quantity, productImg, title, price })

        },
    }
});

export const { addToWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
