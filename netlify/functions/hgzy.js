export async function handler(event, context) {
  try {
    const timestamp = Date.now();

    const CURRENT_API = `https://draw.ar-lottery01.com/WingO_30S.json?ts=${timestamp}`;
    const HISTORY_API = `https://draw.ar-lottery01.com/WingO_30S/GetHistoryIssuePage.json?ts=${timestamp}`;

    const currentRes = await fetch(CURRENT_API);
    const currentData = await currentRes.json();

    const historyRes = await fetch(HISTORY_API);
    const historyData = await historyRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        timestamp,
        current: currentData,
        history: historyData
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: err.message
      })
    };
  }
}
