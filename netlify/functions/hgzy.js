export async function handler(event, context) {
  try {
    const timestamp = Date.now();

    const CURRENT_API = `https://draw.ar-lottery01.com/WingO_30S.json?ts=${timestamp}`;
    const HISTORY_API = `https://draw.ar-lottery01.com/WingO_30S/GetHistoryIssuePage.json?ts=${timestamp}`;

    const currentRes = await fetch(CURRENT_API);
    const historyRes = await fetch(HISTORY_API);

    const currentText = await currentRes.text();
    const historyText = await historyRes.text();

    // HTML আসলে error দেবে
    if (currentText.startsWith("<") || historyText.startsWith("<")) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          error: "Source API returned HTML instead of JSON"
        })
      };
    }

    const currentData = JSON.parse(currentText);
    const historyData = JSON.parse(historyText);

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
