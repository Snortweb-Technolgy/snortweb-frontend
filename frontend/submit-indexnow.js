import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function submitToIndexNow() {
  const key = process.env.INDEXNOW_KEY || 'b56a31993475475685511b5e5c26b9a8';
  const host = 'snortwebtechnology.com';
  const keyLocation = `https://${host}/${key}.txt`;
  
  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: [
      `https://${host}/`,
      `https://${host}/services`,
      `https://${host}/portfolio`,
      `https://${host}/contact`,
      `https://${host}/about`
    ]
  };

  console.log('Submitting IndexNow request...', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Successfully submitted URLs to IndexNow.');
      // IndexNow returns 200 OK or 202 Accepted on success
    } else {
      console.error(`❌ Failed to submit URLs to IndexNow. Status: ${response.status}`);
      const text = await response.text();
      console.error('Response:', text);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error);
    process.exit(1);
  }
}

submitToIndexNow();
