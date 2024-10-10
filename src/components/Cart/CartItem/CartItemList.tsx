import { AnimatePresence } from "framer-motion";
// My import.
import styles from "./CartItemList.module.css";
// My component.
import CartItem from "./CartItem";
import DrinkItem from "src/models/DrinkItem";

type CartItemListProps = {
  items: DrinkItem[];
};

export default function CartItemList(props: CartItemListProps) {
  // Get the list of all items the user selected.
  const cartList = props.items.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  return (
    <ul className={styles["cart-items"]}>
      <AnimatePresence>{cartList}</AnimatePresence>
    </ul>
  );
}
