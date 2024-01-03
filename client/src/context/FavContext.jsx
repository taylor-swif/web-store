import { createContext } from "react";

export const FavContext = createContext(null);

export default function FavProvider({ children }) {
  const fav = [0, 1, 3, 9];

  return <FavContext.Provider value={fav}>{children}</FavContext.Provider>;
}
