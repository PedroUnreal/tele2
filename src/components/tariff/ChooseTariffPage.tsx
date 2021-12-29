import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from '../../utils/debounce';
import { fetchTariffOptions, updateCurrentTariff, updateCurrentNetwork } from '../../store/asyncActions/addTariffOptions';
import { selectors } from '../../store/rangeSelectors';
import { MessengerSelector } from './MessengerSelector';
import { RangeSelector } from './RangeSelector';
import styles from './styles.module.css';

/**
 * Страница настройки персонального тарифа
 */
export function ChooseTariffPage() {
  const userTariff = useSelector(selectors.getUserTariff);
  const tariffOptions = useSelector(selectors.getTariffOptions);
  const trafficCombo = useSelector(selectors.getTrafficCombo);
  const messengerPriceCombo = useSelector(selectors.getMessengerPriceCombo)
  const dispatch = useDispatch();
  const messengers: Messenger[] = ['fb', 'vk', 'ok', 'inst', 'tt']

  const selectedMessengers = useMemo(() => {
    if (!trafficCombo || !userTariff) return [];

    return [
      ...trafficCombo.find((combo: ITrafficCombo) => combo.gigs === userTariff.gigs)?.messengers ?? [],
      ...userTariff.messengers,
    ];
  }, [trafficCombo, userTariff]);

  const messengerIsInCombo = useCallback((messenger: Messenger): boolean => {
    if (trafficCombo && userTariff) {
      return trafficCombo.find((combo: ITrafficCombo) => combo.gigs === userTariff.gigs)?.messengers.includes(messenger) ?? false;
    }

    return false;
  }, [trafficCombo, userTariff]);

  useEffect(() => {
    dispatch(fetchTariffOptions())
  }, [dispatch])

  const updateCurrentUserTariff = debounce((key: string, value: string) => {
    dispatch(updateCurrentTariff(key, value))
  }, 100);

  const updateMessenger = useCallback((messenger: Messenger) => {
    if (userTariff) {
      const isInCombo = messengerIsInCombo(messenger);

      if (!isInCombo) {
        dispatch(updateCurrentNetwork(messenger))
      }
    }
  }, [dispatch, userTariff, messengerIsInCombo]);

  if (!tariffOptions || !trafficCombo || !userTariff || !messengerPriceCombo) return null;

  return (
    <div>
      <div>
        <h1>Настройте тариф</h1>
        <div className="box-for-range" >
          <RangeSelector
            label="Минуты"
            selectedValue={userTariff.minutes}
            values={tariffOptions.minutes}
            onChange={(value) => updateCurrentUserTariff('minutes', value)}
          />
          <RangeSelector
            label="Трафик"
            selectedValue={userTariff.gigs}
            values={tariffOptions.gigs}
            onChange={(value) => updateCurrentUserTariff('gigs', value)}

          />
          <RangeSelector
            label="СМС"
            selectedValue={userTariff.sms}
            values={tariffOptions.sms}
            onChange={(value) => updateCurrentUserTariff('sms', value)}
          />
        </div>
      </div>
      <div className={styles.messengers}>
        {messengers.map((mes: Messenger) =>
          <MessengerSelector
            key={mes}
            messenger={mes}
            label={messengerIsInCombo(mes) ? 'Включен в тариф' : ''}
            selected={selectedMessengers.includes(mes)}
            price={messengerPriceCombo[mes]}
            onChange={() => updateMessenger(mes)} />

        )}
      </div>

      <h3>Стоимость: {userTariff.price} руб.</h3>
    </div>
  );
}
