import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import store from './slices/store.js'
import i18n from '../src/i18/init.js'

createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n} defaultNS="translation">
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
)
