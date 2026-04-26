async function runOptimizer() {
  try {

    const intent = {
      tokenIn: "OPN",
      tokenOut: "OPNT",
      amountIn: 1
    };

    // ⚠️ HARUS diarahkan ke backend nyata (bukan /api kalau GitHub Pages)
    const API_URL = "https://YOUR-BACKEND-DOMAIN.com/api/route";

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(intent)
    });

    if (!res.ok) {
      throw new Error("Route API failed");
    }

    const data = await res.json();

    // safety fallback
    const routePath = (data.route?.path || [])
      .map(step => `${step.tokenIn} → ${step.tokenOut}`)
      .join(" → ");

    document.getElementById("result").innerHTML = `
      <div style="margin-top:10px;">
        <b>Best Route Found</b><br><br>

        <b>Path:</b> ${routePath}<br>
        <b>Expected Out:</b> ${data.route?.expectedOut ?? 0}<br>
        <b>Score:</b> ${data.route?.score ?? 0}<br>
        <b>Gas:</b> ${data.route?.gasEstimate ?? "N/A"}<br>
        <b>Slippage Risk:</b> ${data.route?.slippageRisk ?? "N/A"}<br>
      </div>
    `;

  } catch (err) {
    console.error(err);

    document.getElementById("result").innerHTML = `
      <div style="color:red;">
        Route Engine Error: ${err.message}
      </div>
    `;
  }
          }
