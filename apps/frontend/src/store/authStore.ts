import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  setToken: (token) => {
    localStorage.setItem("token", token); // persist
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  initialize: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
    }
  },
}));

// import { create } from "zustand";

// interface AuthState {
//   token: string | null;
//   setToken: (token: string) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   setToken: (token) => set({ token }),
// }));