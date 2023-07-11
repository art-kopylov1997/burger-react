import classes from "./loader.module.css";
import { LoaderSvg } from "./loader.svg";

const loaderSizes = {
  small: 16,
  medium: 24,
  large: 40,
  huge: 120,
};

export const Loader = ({ size, inverse = false }) => {
  const loaderColor = inverse ? "#fff" : "#3C39EC";

  const wrapperStyleKey = "wrapper_" + size;
  return (
    <div className={classes[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};
