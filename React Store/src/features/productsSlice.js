import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  filteredProducts: [],
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/ironhack-labs/lab-thinking-in-react/master/src/data.json"
    ).then((data) => data.json());
    return res;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      if (!action.payload.inStock) {
        return {
          ...state,
          filteredProducts: [...state.products].filter((product) =>
            product.name.toLowerCase().includes(action.payload.searchTerm)
          ),
        };
      }
      if (action.payload.inStock) {
        return {
          ...state,
          filteredProducts: [...state.products].filter(
            (product) =>
              product.inStock &&
              product.name.toLowerCase().includes(action.payload.searchTerm)
          ),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { searchProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
