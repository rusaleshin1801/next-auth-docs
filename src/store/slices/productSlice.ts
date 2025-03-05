import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Products {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  sku: string;
  imageUrl?: string;
}

interface FetchProductsParams {
  search?: string;
  sort?: "price" | "discountPrice";
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

interface ProductsState {
  products: Products[];
  selectedProduct: Products | null;
  loading: boolean;
  error: string | null;
  search: string;
  sort: "price" | "discountPrice";
  order: "ASC" | "DESC";
  page: number;
  limit: number;
  totalCount: number;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  search: "",
  sort: "price",
  order: "ASC",
  page: 1,
  limit: 10,
  totalCount: 0,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      shouldShowLoading = true,
      ...params
    }: FetchProductsParams & { shouldShowLoading?: boolean },
    { rejectWithValue }
  ) => {
    try {
      if (shouldShowLoading) {
        console.log("Загрузка данных...");
      }

      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append("search", params.search);
      if (params.sort) queryParams.append("sort", params.sort);
      if (params.order) queryParams.append("order", params.order);
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const res = await fetch(`${API_URL}/products?${queryParams.toString()}`);

      if (!res.ok) {
        return rejectWithValue("Ошибка загрузки продуктов");
      }

      const { products, totalCount } = await res.json();

      return { products, totalCount };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Ошибка сети или сервера");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);

      if (!res.ok) {
        return rejectWithValue("Ошибка загрузки продукта");
      }

      return await res.json();
    } catch (error) {
      console.error(error);
      return rejectWithValue("Ошибка сети или сервера");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        return rejectWithValue(responseData);
      }

      return responseData;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: "Ошибка сети или сервера" });
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, ...productData }: { id: number } & Products,
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        return rejectWithValue(responseData);
      }

      return responseData;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: "Ошибка сети или сервера" });
    }
  }
);

export const uploadProductImage = createAsyncThunk(
  "products/uploadProductImage",
  async ({ id, file }: { id: number; file: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/products/${id}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        return rejectWithValue("Ошибка загрузки фото");
      }

      return await res.json();
    } catch (error) {
      console.error(error);
      return rejectWithValue("Ошибка сети или сервера");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return rejectWithValue("Ошибка удаления продукта");
      }

      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Ошибка сети или сервера");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Products>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSorting: (
      state,
      action: PayloadAction<{
        sort: "price" | "discountPrice";
        order: "ASC" | "DESC";
      }>
    ) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) => {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    setProducts: (state, action: PayloadAction<{ products: Products[] }>) => {
      state.products = action.payload.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const { shouldShowLoading } = action.meta.arg;
        if (shouldShowLoading) {
          state.loading = true;
          state.error = null;
        }
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products];
        state.totalCount += 1;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        state.selectedProduct = action.payload;
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        if (
          state.selectedProduct &&
          state.selectedProduct.id === action.payload.id
        ) {
          state.selectedProduct.imageUrl = action.payload.imageUrl;
        }
        state.products = state.products.map((p) =>
          p.id === action.payload.id
            ? { ...p, imageUrl: action.payload.imageUrl }
            : p
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setSearch,
  setSorting,
  setPagination,
} = productSlice.actions;
export default productSlice.reducer;
