export type TLoaderSize = "small" | "medium" | "large" | "huge";

export type TElementProperty = "top" | "bottom";

export type TLocationState = {
  [key: string]: string | null | TLocationState | TLocation;
};

export type TLocation = {
  state: {
    [key: string]: Location;
  };
};
