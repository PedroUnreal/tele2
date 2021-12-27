declare type Messenger = 'fb' | 'vk' | 'ok' | 'inst' | 'tt';

declare interface ITariffOptions {
	minutes: string[],
	gigs: string[],
	sms: string[],
	messengers: Messenger[]
}

declare interface ITrafficCombo {
	gigs: string,
	messengers: Messenger[]
}

declare interface IUserTariff {
	minutes: string,
	gigs: string,
	sms: string,
	messengers: Messenger[],
	price: number
}

declare type PropertiesTypes<T> = T extends Record<string, infer U> ? U : never;