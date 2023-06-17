import { configureStore } from "@reduxjs/toolkit";
import user_slice from "./user_slice";

export const store = configureStore({
    reducer: {
        user: user_slice,
    }
});

