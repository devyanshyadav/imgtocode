// store.ts
import { create } from "zustand";

interface ZustState {
  File?: File;
  isLoading: boolean;
  error?: string;
  setFile: (file: File ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  reset: () => void;
  code: string,
  setCode: (code: string) => void,
  userInputPrompt: string,
  setUserInputPrompt: (prompt: string) => void
}

const useZustStore = create<ZustState>()((set) => ({
  File: undefined,
  userInputPrompt: "",
  setUserInputPrompt: (prompt) => set({ userInputPrompt: prompt }),
  code: "",
  setCode: (code) => set({ code }),
  isLoading: false,
  error: undefined,
  setFile: (file) => set({ File: file }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    File: undefined, 
    isLoading: false, 
    error: undefined ,
    code: "",
    userInputPrompt: ""
  })
}));

export default useZustStore;
