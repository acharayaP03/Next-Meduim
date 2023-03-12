import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <div className={ roboto.className}>
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
