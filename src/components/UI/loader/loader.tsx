import classes from "./loader.module.css";
import { LoaderSvg } from "./loader.svg";

import { FC } from "react";
import { TLoaderSize } from "../../../utils/types";

const loaderSizes: { [size in TLoaderSize]: number } = {
  small: 16,
  medium: 24,
  large: 40,
  huge: 120,
};

interface ILoader {
  size: TLoaderSize;
  inverse?: boolean;
}

export const Loader: FC<ILoader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? "#fff" : "#3C39EC";

  const wrapperStyleKey = "wrapper_" + size;
  return (
    <div className={classes[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};
