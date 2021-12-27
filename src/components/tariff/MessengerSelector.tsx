import cn from "classnames";
import styles from "./styles.module.css";

const messengerIcons = {
  fb: require("../../images/fb.png"),
  vk: require("../../images/vk.png"),
  ok: require("../../images/ok.png"),
  inst: require("../../images/inst.png"),
  tt: require("../../images/tt.png"),
};

type MessengerSelectorProps = {
  messenger: keyof typeof messengerIcons;
  label: string;
  selected: boolean;
  price: number;
  onChange: () => void;
};

/**
 * Компонент иконки мессенджера 
 */
export function MessengerSelector({ messenger, selected, price, label, onChange }: MessengerSelectorProps) {
  return (
    <div>
      <img
        onClick={onChange}
        className={cn([
          styles.image, 
          {
            [styles.imageFade]: !selected,
          }
        ])}
        src={messengerIcons[messenger]}
        alt={`${messenger}`}
      />

      {!selected && (
        <div>
          +{price} руб.
        </div>
      )}

      {label && <div>Включен в тариф</div>}
    </div>
  );
}
