import classes from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

const BurgerConstructor = () => {
  const getCratorBunImage = () => {
    return data.find((el) => el.name === "Краторная булка N-200i").image;
  };

  return (
    <section>
      <div className="mt-25">
        <div className={classes.contentWrapper}>
          <ConstructorElement
            extraClass="ml-5 mb-1"
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={getCratorBunImage()}
          />
          <div className={classes.content}>
            {data
              .filter((el) => el.type !== "bun")
              .map((el) => (
                <div
                  key={el._id}
                  className={`${classes.elementWrapper} mt-4 mb-4 mr-2`}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    thumbnail={el.image}
                    price={el.price}
                    text={el.name}
                  />
                </div>
              ))}
          </div>
          <ConstructorElement
            extraClass="ml-5 mt-1"
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={getCratorBunImage()}
          />
        </div>
        <div className={`${classes.checkoutBlock} mt-10`}>
          <div className={`${classes.price} text text_type_main-large mr-10`}>
            310
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
