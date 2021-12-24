import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/rangeSelectorReducer';
import { AddsSelector } from './AddsSelector';
import { RangeSelector } from './RangeSelector';
import styles from './styles.module.css';


export function ChooseTariffPage() {
  let gigs = useSelector(state => selectors.getGigs(state))
  const [output, setOutput] = useState(gigs);

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
  const arrayOfTariffs = [
   {
    gigs: "3ГБ",
    messengers: {
      fb: false,
      vk: false,
      ok: false,
      inst: false,
      tt: false
    }
  },

   {
    gigs: "10ГБ",
    messengers: {
      fb: true,
      vk: true,
      ok: true,
      inst: false,
      tt: false
    }
  },

   {
    gigs: "40ГБ",
    messengers: {
      fb: true,
      vk: true,
      ok: true,
      inst: true,
      tt: true
    }
  }
 ]
    let networks: any
let currentNetworks = arrayOfTariffs.filter( tariff => tariff.gigs === output)
if(currentNetworks.length > 0) { networks = currentNetworks[0].messengers;}

//let networks = currentNetworks[0].messengers
   
  return (
    <div>
      <div>
        <h1>Настройте тариф</h1>
        <RangeSelector
          label="Минуты"
          values={["200 мин", "400 мин", "500 мин", "800 мин"]}
        />
        <RangeSelector
          label="Трафик"
          values={["3ГБ", "10ГБ", "40ГБ"]}
        />
        <RangeSelector
          label="СМС"
          values={["10", "50", "100", "300", "500"]}
        />
      </div>
      <div className={styles.socialNetworks}>
        <AddsSelector
          image="fb"
          disabled={(currentNetworks.length > 0) ? !networks.fb : true}
          price={20}
        />
        <AddsSelector
          image="vk"
          disabled={(currentNetworks.length > 0) ? !networks.vk : true}
          price={20}
        />
        <AddsSelector
          image="ok"
          disabled={(currentNetworks.length > 0) ? !networks.ok : true}
          price={20}
        />
        <AddsSelector
          image="inst"
          disabled={(currentNetworks.length > 0) ? !networks.inst : true}
          price={20}
        />
        <AddsSelector
          image="tt"
          disabled={(currentNetworks.length > 0) ? !networks.tt : true}
          price={20}
        /></div>

      <div>tyt{output}</div>
    </div>
  );
}
