import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTariffOptions } from '../../store/asyncActions/addTariffOptions';
import { selectors } from '../../store/rangeSelectorReducer';
import { AddsSelector } from './AddsSelector';
import { RangeSelector } from './RangeSelector';
import styles from './styles.module.css';


export function ChooseTariffPage() {
  const gigs = useSelector(state => selectors.getGigs(state))
  const userTariff = useSelector(state => selectors.getUserTariff(state))
  const tariffOptions = useSelector(state => selectors.getTariffOptions(state))
  const trafficCombo = useSelector(state => selectors.getTrafficCombo(state))

  const [output, setOutput] = useState(gigs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTariffOptions())
  }, [dispatch])

  useEffect(() => setOutput(gigs))

  //  const currentTariff = {
  //    minutes: '200 min',
  //    gigs: "3ГБ",
  //    sms: "10",
  //    messengers: {
  //      fb: true,
  //      vk: false,

  //    },
  //    totalPrice: 800
  //    //['fb', 'vk', 'insta']
  //  }
  const currentNetworks = useMemo(() => {
    if (!trafficCombo) return null;
    return trafficCombo.find((tariff: any) => tariff.gigs === output) || null;
  }, [trafficCombo, output]);

  const networks = currentNetworks?.messengers ?? {};

  console.log(currentNetworks, 'currentNetworks');
  

  //let networks = currentNetworks[0].messengers

  if (!tariffOptions || !trafficCombo) return null;

  console.log(tariffOptions, 'tariffOptions');
  

  return (
    <div>
      <div>
        <h1>Настройте тариф</h1>
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
      <div className={styles.socialNetworks}>
        <AddsSelector
          image="fb"
          disabled={currentNetworks ? !networks.fb : true}
          price={20}
        />
        <AddsSelector
          image="vk"
          disabled={currentNetworks ? !networks.vk : true}
          price={20}
        />
        <AddsSelector
          image="ok"
          disabled={currentNetworks ? !networks.ok : true}
          price={20}
        />
        <AddsSelector
          image="inst"
          disabled={currentNetworks ? !networks.inst : true}
          price={20}
        />
        <AddsSelector
          image="tt"
          disabled={currentNetworks ? !networks.tt : true}
          price={20}
        /></div>

      <div>tyt{output}</div>
    </div>
  );
}
