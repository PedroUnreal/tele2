import React from 'react';
import { AddsSelector } from './AddsSelector';
import { RangeSelector } from './RangeSelector';
import styles from './styles.module.css';


export function ChooseTariffPage() {

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
          disabled={false}
          price={20}
        />
        <AddsSelector
          image="vk"
          disabled={false}
          price={20}
        />
        <AddsSelector
          image="ok"
          disabled={false}
          price={20}
        />
        <AddsSelector
          image="inst"
          disabled={true}
          price={20}
        />
        <AddsSelector
          image="tt"
          disabled={true}
          price={20}
        /></div>
    </div>
  );
}
