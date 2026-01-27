/**
 * Busca a cotação atual do POL e aplica margem de segurança.
 */
export async function getPolExchangeRate() {
  const SLIPPAGE_PERCENT = 0.05; // 5% de margem de segurança

  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=brl'
    );
    const data = await response.json();
    
    const precoPuro = data['polygon-ecosystem-token'].brl;
    
    // Aplicamos a slippage: reduzimos o valor da cotação em 5%
    // Isso faz com que o usuário envie um pouco mais de tokens para garantir o valor em BRL.
    const precoComSlippage = precoPuro * (1 - SLIPPAGE_PERCENT);
    
    return {
      precoReal: precoPuro,
      precoComSlippage: precoComSlippage
    };
  } catch (error) {
    console.error("Erro ao buscar cotação POL:", error);
    return { precoReal: 2.50, precoComSlippage: 2.375 }; // Fallback
  }
}
