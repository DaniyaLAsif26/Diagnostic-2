import "dotenv/config";
import sql from 'mssql';

let poolPromise = null;

// Connects on first use (not at import), so a bad Fabric config can't stop the whole server from starting.
function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool({
      server: process.env.FABRIC_SERVER,
      database: process.env.FABRIC_DB,
      port: 1433,
      authentication: {
        type: 'azure-active-directory-service-principal-secret',
        options: {
          clientId: process.env.AZURE_CLIENT_ID,
          clientSecret: process.env.AZURE_CLIENT_SECRET,
          tenantId: process.env.AZURE_TENANT_ID,
        },
      },
      options: { encrypt: true },
      connectionTimeout: 30000,
      requestTimeout: 60000,
    })
      .connect()
      .then((pool) => { console.log('Connected to Fabric'); return pool; })
      .catch((err) => {
        console.error('Fabric connection failed:', err.message);
        poolPromise = null; // let the next request retry
        throw err;
      });
  }
  return poolPromise;
}

async function fabricQuery(text, params = {}) {
  const pool = await getPool();
  const req = pool.request();
  for (const [k, v] of Object.entries(params)) req.input(k, v);
  const result = await req.query(text);
  return result.recordset;
}

export { fabricQuery };
