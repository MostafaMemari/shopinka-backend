import localFont from 'next/font/local'

export const iranyekan = localFont({
  src: [
    {
      path: './iranyekan/IRANYekanXFaNum-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './iranyekan/IRANYekanXFaNum-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './iranyekan/IRANYekanXFaNum-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './iranyekan/IRANYekanXFaNum-DemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './iranyekan/IRANYekanXFaNum-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-iranyekan',
  display: 'swap',
  preload: true
})
