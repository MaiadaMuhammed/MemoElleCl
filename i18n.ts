import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from './lib/config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = (await import(`./messages/${locale}.json`)).default

  return {
    locale,
    messages,
    formats: {
      number: {
        currency: {
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
    },
    timeZone: 'Africa/Cairo',
  }
})
