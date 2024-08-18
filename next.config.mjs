import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dabeng.github.io']
    }
};

export default withNextIntl(nextConfig);
