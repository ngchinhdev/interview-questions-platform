import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales as lc } from '@configs/config';

// Can be imported from a shared config
const locales = lc;

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});