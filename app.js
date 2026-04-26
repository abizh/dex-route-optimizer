async function runOptimizer() {

  const intent = {
    tokenIn: "OPN",
    tokenOut: "OPNT",
    amount: 1
  };

  const res = await fetch("/api/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(intent)
  });

  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <div class="title">Best Route Found</div>

    <div>Path: ${data.route.map(r => r.pool).join(" → ")}</div>

    <div>Expected Out: <b>${data.expectedOut}</b></div>

    <div>Score: <b>${data.score}</b></div>

    <div>Gas: ${data.gasEstimate}</div>
  `;
}
