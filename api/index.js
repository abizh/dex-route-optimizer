export default function handler(req, res) {
  // 1. Hanya izinkan metode POST (standar untuk routing intent)
  if (req.method !== "POST") {
    return res.status(405).json({ 
      error: "Method Not Allowed",
      message: "Gunakan POST request untuk melakukan routing." 
    });
  }

  // 2. Ambil data dari body (intent swap dari user)
  const intent = req.body;

  // Cek apakah data dikirim
  if (!intent || Object.keys(intent).length === 0) {
    return res.status(400).json({ 
      error: "Bad Request",
      message: "Data intent tidak boleh kosong." 
    });
  }

  // 3. Logika RouteSolver (DEX iOPN Testnet)
  const routeResponse = {
    network: "iOPN Testnet",
    tokenIn: intent.tokenIn || "N/A",
    tokenOut: intent.tokenOut || "N/A",
    amountIn: intent.amount || 0,
    bestRoute: [
      { 
        pool: "OPN/WOPN", 
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" 
      },
      { 
        pool: "WOPN/OPNT", 
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" 
      }
    ],
    expectedOut: 0.248461,
    priceImpact: "0.02%",
    gasEstimate: 240000,
    timestamp: new Date().toISOString()
  };

  // 4. Kirim Respon ke Frontend/Client
  res.status(200).json(routeResponse);
}
