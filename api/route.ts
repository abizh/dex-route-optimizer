export default function handler(req, res) {
  const { tokenIn, tokenOut, amount } = req.body;

  // sementara dummy dulu (nanti kita ganti solver asli)
  return res.status(200).json({
    route: [
      { pool: "OPN/WOPN" },
      { pool: "WOPN/OPNT" }
    ],
    expectedOut: 0.248461,
    score: 92.4,
    gasEstimate: 240000
  });
}
