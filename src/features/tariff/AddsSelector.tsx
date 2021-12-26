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
  network: keyof typeof socialMediaIcons;
  disabled: boolean;
  price: number;
};

export function AddsSelector({ network, disabled, price }: AddsSelectorProps) {
  const [currentDisabled, setDisable] = useState(Boolean);
  const dispatch = useDispatch();
  const toggleDisabled = () => {
    if (disabled) {
      if (currentDisabled) {
        setDisable(false); dispatch(addNetworkAction(network));
      } else {
        setDisable(true); dispatch(deleteNetworkAction(network))
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
        src={socialMediaIcons[network]}
        alt={`${network}`}
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
