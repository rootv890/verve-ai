import * as ct from "countries-and-timezones"
import { url } from "inspector"

export function getCountryFromTimeZone(timeZone: string | null) {
	if (!timeZone) return null
	const tz = ct.getTimezone(timeZone)
	if (!tz?.countries.length) return null
	const countryCode = tz.countries[0]
	const country = ct.getCountry(countryCode as string)
	return {
		code: countryCode,
		name: country?.name || countryCode,
	}
}

export function getCountryFlagUrl(countryCode: string | null) {
	if (!countryCode) return `https://flagcdn.com/w40/placeholder.png`
	const country = ct.getCountry(countryCode)
	if (!country) return null
	return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.webp`
}
