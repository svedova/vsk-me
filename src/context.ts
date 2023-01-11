import { createContext } from "react";

const context = createContext<{ data: any }>({
  data: undefined,
});

export default context;
