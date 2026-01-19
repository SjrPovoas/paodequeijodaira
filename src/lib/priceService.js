// src/lib/priceService.js

/**
 * Busca o preço atual do POL (Polygon) em Reais e converte o total da compra.
 * @param {number} valorEmReais - O total do carrinho em BRL
 * @returns {string} - O valor equivalente em POL (string formatada para ethers)
 */
export async function converterRealParaPOL(valorEmReais) {
  try {
    // Usando a API gratuita do CoinGecko
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=brl'
    );
    
    if (!response.ok) throw new Error('Falha ao consultar preço da cripto');
    
    const data = await response.json();
    
    // Pega o preço de 1 POL em Reais
    const precoPOLemBRL = data['polygon-ecosystem-token'].brl;
    
    // Cálculo: Total R$ / Preço de 1 POL
    const resultado = valorEmReais / precoPOLemBRL;
    
    // Retorna com 6 casas decimais (ex: "45.123456")
    return resultado.toFixed(6); 
  } catch (error) {
    console.error("Erro no PriceService:", error);
    // Fallback: Retorna um valor nulo para o checkout tratar o erro e não cobrar errado
    return null;
  }
}