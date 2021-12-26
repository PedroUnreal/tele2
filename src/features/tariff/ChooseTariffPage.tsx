import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTariffOptions } from '../../store/asyncActions/addTariffOptions';
import { selectors } from '../../store/rangeSelectorReducer';
import { AddsSelector } from './AddsSelector';
import { RangeSelector } from './RangeSelector';
import styles from './styles.module.css';


export function ChooseTariffPage() {

  const rawCurrentTariff = useSelector(state => selectors.getCurrentTariff(state))
  console.log(rawCurrentTariff, "raw");

  const currentTariff = {
    minutes: rawCurrentTariff.minutes,
    gigs: rawCurrentTariff.gigs,
    sms: rawCurrentTariff.sms,
    messengers: {
      fb: rawCurrentTariff.networks.includes("fb"),
      vk: rawCurrentTariff.networks.includes("vk"),
      ok: rawCurrentTariff.networks.includes("ok"),
      inst: rawCurrentTariff.networks.includes("inst"),
      tt: rawCurrentTariff.networks.includes("tt")
    }

  }
  console.log(currentTariff, "currentTariff");


  const gigs = useSelector(state => selectors.getGigs(state))
  const userTariff = useSelector(state => selectors.getUserTariff(state))
  const tariffOptions = useSelector(state => selectors.getTariffOptions(state))
  const trafficCombo = useSelector(state => selectors.getTrafficCombo(state))
  const [output, setOutput] = useState(gigs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTariffOptions())
  }, [])

  useEffect(() => {

    fetch('api/user-tariff', {
      method: 'post',
      body: JSON.stringify(currentTariff)
    });
    setOutput(gigs);
  }, [currentTariff])

  useEffect(() => {
    dispatch(fetchTariffOptions())
  }, [currentTariff.gigs, currentTariff.minutes, currentTariff.sms,
  currentTariff.messengers.fb, currentTariff.messengers.vk, currentTariff.messengers.ok,
  currentTariff.messengers.inst, currentTariff.messengers.tt,])

  const currentNetworks = useMemo(() => {
    if (!trafficCombo) return null;
    return trafficCombo.find((tariff: any) => tariff.gigs === output) || null;
  }, [trafficCombo, output]);

  const networks = currentNetworks?.messengers ?? {};
  //let networks = currentNetworks[0].messengers

  if (!tariffOptions || !trafficCombo) return null;
  return (
    <div>
      <div>
        <h1>Настройте тариф</h1>
        <div className="box-for-range" >
          <RangeSelector 
            label="Минуты"
            selectedValue={userTariff.minutes}
            values={tariffOptions.minutes}
          />
          <RangeSelector
            label="Трафик"
            selectedValue={userTariff.gigs}
            values={tariffOptions.gigs}
          />
          <RangeSelector
            label="СМС"
            selectedValue={userTariff.sms}
            values={tariffOptions.sms}
          />
          </div>
      </div>
      <div className={styles.socialNetworks}>
        <AddsSelector
          network="fb"
          disabled={currentNetworks ? !networks.fb : true}
          price={20}
        />
        <AddsSelector
          network="vk"
          disabled={currentNetworks ? !networks.vk : true}
          price={20}
        />
        <AddsSelector
          network="ok"
          disabled={currentNetworks ? !networks.ok : true}
          price={20}
        />
        <AddsSelector
          network="inst"
          disabled={currentNetworks ? !networks.inst : true}
          price={20}
        />
        <AddsSelector
          network="tt"
          disabled={currentNetworks ? !networks.tt : true}
          price={20}
        /></div>

      <h3>Стоимость: {rawCurrentTariff.userTariff.price}</h3>
    </div>
  );
}
