export const lightTheme = {
  background: "#ffffff",
  content: "#e5e5e5",
  text: "#000000",
  primary: "#0cafa5",
  cardback: "#f1f1f1",
  cardfore: "white",
};
export const darkTheme = {
  background: "#212121",
  content: "#525252",
  text: "#ffffff",
  primary: "#28f19c",
  cardback: "#343434",
  cardfore: "#212121",
};

export const getTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
