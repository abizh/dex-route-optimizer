// api/route.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { tokenIn, tokenOut, amount } = req.body;

  /* =========================
     MOCK POOL DATA (STEP AWAL)
     nanti kita ganti ke on-chain
  ========================== */

  const pools = [
    {
      id: "OPN-WOPN",
      token0: "OPN",
      token1: "WOPN",
      reserve0: 10000,
      reserve1: 5000,
      fee: 0.003
    },
    {
      id: "WOPN-OPNT",
      token0: "WOPN",
      token1: "OPNT",
      reserve0: 5000,
      reserve1: 1200,
      fee: 0.003
    },
    {
      id: "OPN-OPNT",
      token0: "OPN",
      token1: "OPNT",
      reserve0: 100,
      reserve1: 10,
      fee: 0.003
    }
  ];

  /* =========================
     SIMPLE ROUTE SOLVER
  ========================== */

  function getAmountOut(amountIn, reserveIn, reserveOut) {
    const amountInWithFee = amountIn * 0.997;
    return (amountInWithFee * reserveOut) /
      (reserveIn + amountInWithFee);
  }

  function simulateRoute(path) {
    let amountOut = amount;

    for (const p of path) {
      if (p.token0 === tokenIn) {
        amountOut = getAmountOut(amountOut, p.reserve0, p.reserve1);
      } else {
        amountOut = getAmountOut(amountOut, p.reserve1, p.reserve0);
      }
    }

    return amountOut;
  }

  // 2 ROUTE
  const route1 = [pools[0], pools[1]]; // via WOPN
  const route2 = [pools[2]]; // direct

  const out1 = simulateRoute(route1);
  const out2 = simulateRoute(route2);

  const best = out1 > out2
    ? { route: route1, expectedOut: out1 }
    : { route: route2, expectedOut: out2 };

  res.status(200).json({
    route: best.route.map(p => ({ pool: p.id })),
    expectedOut: best.expectedOut,
    score: 95,
    gasEstimate: best.route.length * 120000
  });
}
