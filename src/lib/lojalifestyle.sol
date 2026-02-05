// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LojaLifestyle
 * @dev Contrato para processamento de pagamentos da Loja Lifestyle e Acessórios | Pão de Queijo da Irá
 * com trava de segurança por ID de pedido.
 * 1. Parâmetro _pedidoId: Quando o cliente paga no MetaMask, ele envia o ID do Supabase para dentro da Blockchain. Isso cria uma prova imutável de que aquele pedido específico foi pago.
 * 2. Evento PagamentoConfirmado: O seu código JavaScript vai "ouvir" esse evento. Assim que ele aparecer na rede Polygon, o status no seu banco de dados muda de "Aguardando" para "Pago".
 * 3. Segurança: O dinheiro não fica "preso" para sempre; só você (o owner) tem a função sacar.
 * 4. no seu Frontend: Ao chamar a função no seu BotaoPagamentoWeb3, você passará o ID assim: contract.pagarPedido(idDoPedidoDoSupabase, { value: valorEmWei })
 * 5. No Remix, clique no quarto ícone (Deploy & Run Transactions).
 * 6. No campo Environment, mude de "Remix VM" para Injected Provider - MetaMask. (A MetaMask vai pedir para conectar).
 * 7. Certifique-se de que o contrato selecionado no campo Contract é o LojaLifestyle.
 * 8. Clique no botão laranja: Deploy.
 * 9. Confirme a transação na sua MetaMask.
 * 10. ABI: Vá na aba Compiler, clique no botão ABI (perto do botão de copiar). Isso é um código JSON que diz ao seu site como conversar com o contrato.
 **/
contract LojaLifestyle {
    address public owner;
    
    // Evento que o seu frontend/backend vai escutar para liberar o brinde
    event PagamentoConfirmado(
        address indexed comprador,
        uint256 valor,
        string pedidoId,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode executar esta acao");
        _;
    }

    /**
     * @dev Função principal de pagamento. 
     * @param _pedidoId O ID gerado pelo Supabase para vincular a transação.
     */
    function pagarPedido(string memory _pedidoId) public payable {
        require(msg.value > 0, "O valor enviado deve ser maior que zero");
        
        // Emite o evento com o ID do pedido para a trava de segurança
        emit PagamentoConfirmado(msg.sender, msg.value, _pedidoId, block.timestamp);
    }

    /**
     * @dev Permite ao dono do contrato sacar os fundos acumulados.
     */
    function sacar() public onlyOwner {
        uint256 saldo = address(this).balance;
        require(saldo > 0, "Nao ha saldo para saque");
        
        (bool success, ) = owner.call{value: saldo}("");
        require(success, "Falha no saque");
    }

    /**
     * @dev Caso precise alterar a carteira que recebe os fundos.
     */
    function transferirPropriedade(address _novoOwner) public onlyOwner {
        require(_novoOwner != address(0), "Endereco invalido");
        owner = _novoOwner;
    }

    // Função para verificar o saldo do contrato
    function getSaldo() public view returns (uint256) {
        return address(this).balance;
    }
}
