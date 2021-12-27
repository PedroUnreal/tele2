import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTariffOptions, updateCurrentTariff, updateCurrentNetwork } from '../../store/asyncActions/addTariffOptions';
import { selectors } from '../../store/rangeSelectorReducer';
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
  const dispatch = useDispatch();

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

  const updateCurrentUserTariff = useCallback((key: string, value: string) => {
    dispatch(updateCurrentTariff(key, value))
  }, [dispatch]);

  const updateMessenger = useCallback((messenger: Messenger) => {
    if (userTariff) {
      const isInCombo = messengerIsInCombo(messenger);

      if (!isInCombo) {
        dispatch(updateCurrentNetwork(messenger))
      }
    }
  }, [dispatch, userTariff, messengerIsInCombo]);

  if (!tariffOptions || !trafficCombo || !userTariff) return null;

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
        <MessengerSelector
          messenger="fb"
          label={messengerIsInCombo('fb') ? 'Включен в тариф' : ''}
          selected={selectedMessengers.includes('fb')}
          price={20}
          onChange={() => updateMessenger('fb')}
        />
        <MessengerSelector
          messenger="vk"
          label={messengerIsInCombo('vk') ? 'Включен в тариф' : ''}
          selected={selectedMessengers.includes('vk')}
          price={20}
          onChange={() => updateMessenger('vk')}
        />
        <MessengerSelector
          messenger="ok"
          label={messengerIsInCombo('ok') ? 'Включен в тариф' : ''}
          selected={selectedMessengers.includes('ok')}
          price={20}
          onChange={() => updateMessenger('ok')}
        />
        <MessengerSelector
          messenger="inst"
          label={messengerIsInCombo('inst') ? 'Включен в тариф' : ''}
          selected={selectedMessengers.includes('inst')}
          price={20}
          onChange={() => updateMessenger('inst')}
        />
        <MessengerSelector
          messenger="tt"
          label={messengerIsInCombo('tt') ? 'Включен в тариф' : ''}
          selected={selectedMessengers.includes('tt')}
          price={20}
          onChange={() => updateMessenger('tt')}
        /> 
        </div>

      <h3>Стоимость: {userTariff.price} руб.</h3>
    </div>
  );
}
