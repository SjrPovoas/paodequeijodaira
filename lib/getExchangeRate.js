/**
 * Busca a cotação atual do token POL (Polygon) em relação ao BRL (Real).
 * @returns {Promise<number>} O preço de 1 POL em BRL.
 */
export async function getPolExchangeRate() {
  try {
    // A CoinGecko ainda utiliza o ID 'polygon-ecosystem-token' ou 'matic-network' para o POL
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=brl'
    );
    const data = await response.json();
    
    // Retorna o valor de 1 POL em Reais (ex: 2.50)
    return data['polygon-ecosystem-token'].brl;
  } catch (error) {
    console.error("Erro ao buscar cotação POL:", error);
    // Valor de fallback caso a API falhe para não travar o checkout (ajuste conforme o mercado)
    return 2.50; 
  }
}
