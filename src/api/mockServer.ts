import { createServer } from "miragejs"

/**
 * Карта стоимости различных услуг
 */
const priceObject: Record<'minutes' | 'gigs' | 'sms', Record<string, number>> = {
  minutes: {
    '200 мин': 100,
    '400 мин': 200,
    '500 мин': 300,
    '800 мин': 400
  },
  gigs: {
    '3ГБ': 100,
    '10ГБ': 200,
    '40ГБ': 400,
  },
  sms: {
    "10": 10,
    "50": 20,
    "100": 30,
    "300": 40,
    "500": 50
  }
}

/**
 * Пакеты трафика и включенные в их стоимость мессенджеры
 */
const trafficCombo: Array<{
  gigs: string;
  messengers: Messenger[]
}> = [
    {
      gigs: "3ГБ",
      messengers: []
    },

    {
      gigs: "10ГБ",
      messengers: ["fb", "vk", "ok"]
    },

    {
      gigs: "40ГБ",
      messengers: ["fb", "vk", "ok", "inst", "tt"]
    }
  ];


const messengerPriceCombo: Record<Messenger, number> =
{
  "fb": 10,
  "vk": 10,
  "ok": 10,
  "inst": 20,
  "tt": 40
}

/**
 * Мок-сервер
 */
const server = createServer({
  routes() {
    this.namespace = "api";

    this.get("/tariffs", (schema) => {
      return {
        tariffOptions: schema.db.tariffOptions,
        trafficCombo: schema.db.trafficCombo,
        userTariff: schema.db.userTariff,
        messengerPriceCombo: schema.db.messengerPriceCombo
      }
    });

    this.put("/user-tariff", (schema, request) => {
      const selectedTariffValues = JSON.parse(request.requestBody);
      const newTariff = calcTariff(selectedTariffValues);
      schema.db.userTariff.update(newTariff);

      return schema.db.userTariff;
    });
  },
})

const defaultTariffValues = {
  minutes: '400 мин',
  gigs: '10ГБ',
  sms: '50',
  messengers: [],
}

/**
 * Загрузка начальных данных
 */
server.db.loadData({
  tariffOptions: {
    minutes: ["200 мин", "400 мин", "500 мин", "800 мин"],
    gigs: ["3ГБ", "10ГБ", "40ГБ"],
    sms: ["10", "50", "100", "300", "500"],
    messengers: ["fb", "vk", "ok", "inst", "tt"]
  },
  trafficCombo,
  userTariff: {
    ...calcTariff(defaultTariffValues)
  },
  messengerPriceCombo
})

/**
 * Логика расчета стоимости
 */
function calcTariff(currentTariff: Omit<IUserTariff, 'price'>): IUserTariff {
  const includedMessengers = trafficCombo.find((combo: ITrafficCombo) => combo.gigs === currentTariff.gigs)?.messengers ?? [];
  const extraMessengers = currentTariff.messengers.filter(messenger => !includedMessengers.includes(messenger));

  const price = priceObject.minutes[currentTariff.minutes]
    + priceObject.gigs[currentTariff.gigs]
    + priceObject.sms[currentTariff.sms]
    + extraMessengers.reduce((sum, messenger) => {
      return sum + messengerPriceCombo[messenger]
    }, 0)

  return {
    ...currentTariff,
    price,
  }
}
