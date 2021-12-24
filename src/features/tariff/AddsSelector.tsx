import React, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css";

const socialMediaIcons = {
    fb: require("../../images/fb.png"),
    vk: require("../../images/vk.png"),
    ok: require("../../images/ok.png"),
    inst: require("../../images/inst.png"),
    tt: require("../../images/tt.png"),
  };

type AddsSelectorProps = {
  image: keyof typeof socialMediaIcons;
  disabled: boolean;
  price: number;
};

export function AddsSelector({ image, disabled, price }: AddsSelectorProps) {
  const [currentDisabled, setDisable] = useState(disabled);
  console.log(currentDisabled);
  const toggleAdds = () => {
    if (disabled){
    currentDisabled ? setDisable(false) : setDisable(true);
    }
  };

  return (
    <div>
      <img
        onClick={toggleAdds}
        className={cn({
          [styles.imageFade]: currentDisabled,
          [styles.picture]: true,
        })}
        src={socialMediaIcons[image]}
        alt={`${image}`}
      />
      <div className={cn({ [styles.price]: !currentDisabled })}>
        +{price}руб
      </div>
      <div className={cn({ [styles.price]: disabled })}>
        Включен в тариф
      </div>
    </div>
  );
}
