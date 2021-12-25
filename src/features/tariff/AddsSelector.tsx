import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNetworkAction, deleteNetworkAction, deleteAllNetworksAction, selectors } from "../../store/rangeSelectorReducer"

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
  const [currentDisabled, setDisable] = useState(Boolean);
  const dispatch = useDispatch();
  const toggleDisabled = () => {
    if (disabled) {
      if (currentDisabled) {
        setDisable(false); dispatch(addNetworkAction(image));
      } else {
        setDisable(true); dispatch(deleteNetworkAction(image))
      }
    }
  };
  useEffect(() => {setDisable(disabled); dispatch(deleteAllNetworksAction())}, [disabled])

  return (
    <div>
      <img
        onClick={toggleDisabled}
        className={cn({
          [styles.imageFade]: currentDisabled,
          [styles.pictureSize]: true,
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
