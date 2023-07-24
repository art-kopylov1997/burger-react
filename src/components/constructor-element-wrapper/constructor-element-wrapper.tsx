import { FC, SyntheticEvent, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IConstructorElementWrapper } from "../../utils/interfaces";

const ConstructorElementWrapper: FC<IConstructorElementWrapper> = ({
  item,
  index,
  moveCard,
  deleteItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const hoverIndex = index;
      const dragIndex = hoverIndex;
      // const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      // @ts-ignore
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== "bun") drag(drop(ref));
  const preventDefault = (e: SyntheticEvent) => e.preventDefault();

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="mt-4 mb-4 mr-2"
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        thumbnail={item.image}
        price={item.price}
        text={item.name}
        type={item.elementProperty}
        handleClose={() => deleteItem(item.dragId)}
      />
    </div>
  );
};

export default ConstructorElementWrapper;
