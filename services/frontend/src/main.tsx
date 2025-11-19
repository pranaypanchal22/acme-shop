import React from "react";
import { createRoot } from "react-dom/client";

const API_CATALOG = import.meta.env.VITE_CATALOG_URL || "http://localhost:4001";
const API_ORDERS  = import.meta.env.VITE_ORDERS_URL  || "http://localhost:4002";

function App() {
  const [catalogHealth, setCatalogHealth] = React.useState<any>(null);
  const [ordersHealth, setOrdersHealth] = React.useState<any>(null);
  React.useEffect(() => {
    fetch(`${API_CATALOG}/health`).then(r=>r.json()).then(setCatalogHealth).catch(()=>setCatalogHealth({ok:false}));
    fetch(`${API_ORDERS}/health`).then(r=>r.json()).then(setOrdersHealth).catch(()=>setOrdersHealth({ok:false}));
  }, []);
  return (
    <div style={{fontFamily:"system-ui", padding:24}}>
      <h1>Acme Shop</h1>
      <pre>catalog-api: {JSON.stringify(catalogHealth)}</pre>
      <pre>orders-api:  {JSON.stringify(ordersHealth)}</pre>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
