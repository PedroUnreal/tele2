type Messenger = 'fb' | 'vk' | 'ok' | 'inst' | 'tt';

interface ITariffOptions {
	minutes: string[],
	gigs: string[],
	sms: string[],
	messengers: Messenger[]
}

interface ITrafficCombo {
	gigs: string,
	messengers: Messenger[]
}

interface IUserTariff {
	minutes: string,
	gigs: string,
	sms: string,
	messengers: Messenger[],
	price: number
}

type PropertiesTypes<T> = T extends Record<string, infer U> ? U : never;