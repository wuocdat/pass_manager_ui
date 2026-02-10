import ReactDOM from 'react-dom/client';
import { Crypto } from '@peculiar/webcrypto';
import App from './App';
import './index.css';

if (!globalThis.crypto || !globalThis.crypto.subtle) {
  (globalThis as any).crypto = new Crypto();
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
