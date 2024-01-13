import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App_xlsx.tsx'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';
ReactDOM.createRoot(document.getElementById('root')!).render(

  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
  ,
)
