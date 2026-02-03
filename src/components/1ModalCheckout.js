     {/* 6. MODAL DE CHECKOUT */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop (Fecha ao clicar fora) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setModalAberto(false)}
          ></div>

          {/* Painel Lateral */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {etapaCheckout === 'carrinho' && 'Seu Carrinho 🛒'}
                {etapaCheckout === 'metodo' && 'Pagamento'}
                {etapaCheckout === 'dados' && 'Checkout'}
              </h2>
              <button 
                onClick={() => setModalAberto(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>

{/* ETAPA 1: CARRINHO (LISTAGEM DE ITENS) */}
{etapaCheckout === 'carrinho' && (
  <div className="flex-grow flex flex-col h-full">
    <div className="flex-grow space-y-6 overflow-y-auto pr-2 custom-scrollbar">
      {carrinho.length === 0 ? (
        <div className="text-center py-20 opacity-30">
          <i className="bi bi-cart-x text-6xl"></i>
          <p className="mt-4 font-bold uppercase text-xs">Seu carrinho está vazio</p>
        </div>
      ) : (
        carrinho.map((item, i) => (
          <div key={i} className="flex gap-4 group animate-in fade-in duration-300">
            <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.nome} />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <p className="font-black text-[11px] uppercase leading-tight">{item.nome}</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic">
                  Tamanho: {item.tamanho || 'Único'} | Qtd: {item.quantidade}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-orange-600 font-black text-sm">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                <button 
                  onClick={() => remover(i)} 
                  className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <i className="bi bi-trash3 text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* SEÇÃO DE LOGÍSTICA E TOTALIZAÇÃO */}
    <div className="mt-8 pt-8 border-t border-gray-100 bg-white">
      <div className="mb-6">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
          CÁLCULO DE ENTREGA (INSIRA SEU CEP)
        </label>
        <input 
          type="text" 
          placeholder="00000-000"
          maxLength={9}
          className={`w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-xs outline-none transition-all ${
            frete === null && dados.cep.length === 8 ? 'ring-2 ring-red-500/20' : 'focus:ring-2 focus:ring-orange-500'
          }`}
          value={dados.cep} 
          onChange={e => handleCEP(e.target.value)}
        />
        
        {/* ENDEREÇO E FRETE DINÂMICO */}
        {dados.endereco ? (
          <div className="mt-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
            <p className="text-[9px] font-bold uppercase text-gray-600 flex items-center gap-1 italic mb-2">
              <i className="bi bi-geo-alt-fill text-orange-600"></i> {dados.endereco}
            </p>
            <div className="flex justify-between text-[11px] font-black text-orange-600 uppercase">
              <span>Frete:</span>
              <span>{frete === 0 ? 'GRÁTIS' : `R$ ${frete?.toFixed(2)}`}</span>
            </div>
          </div>
        ) : dados.cep.length === 8 && (
          <p className="text-[9px] mt-2 font-black text-red-500 uppercase italic">CEP inválido ou não atendido.</p>
        )}
      </div>    

      {/* BOTÃO DE PROSSEGUIR COM TRAVA ANTI-ERRO */}
      <button 
        disabled={carrinho.length === 0 || frete === null || !dados.endereco} 
        onClick={() => setEtapaCheckout('metodo')} 
        className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale shadow-xl shadow-black/10 active:scale-95"
      >
        {frete === null ? (
          'Aguardando CEP Válido'
        ) : (
          <>Prosseguir para Pagamento <i className="bi bi-arrow-right"></i></>
        )}
      </button>
    </div>
  </div>
)}

{/* ETAPA 2: ESCOLHA DO MÉTODO */}
{etapaCheckout === 'metodo' && (
  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
    <button 
      onClick={() => { setMetodoSelecionado('mp'); setEtapaCheckout('dados'); }}
      className="w-full p-8 border-2 border-gray-100 rounded-[30px] hover:border-orange-600 hover:bg-orange-50 transition-all flex justify-between items-center group text-left shadow-sm"
    >
      <div>
        <p className="font-black uppercase text-sm italic group-hover:text-orange-600">Cartão ou PIX</p>
        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Via Mercado Pago</p>
      </div>
      <i className="bi bi-lightning-charge-fill text-2xl text-orange-600 group-hover:scale-110 transition-transform"></i>
    </button>

    <button 
      onClick={() => { setMetodoSelecionado('cripto'); setEtapaCheckout('dados'); }}
      className="w-full p-8 border-2 border-gray-100 rounded-[30px] hover:border-orange-600 hover:bg-orange-50 transition-all flex justify-between items-center group text-left shadow-sm"
    >
      <div>
        <p className="font-black uppercase text-sm italic group-hover:text-orange-600">Pagar com Cripto</p>
        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest text-purple-600">Rede Polygon (POL)</p>
      </div>
      <i className="bi bi-hexagon-fill text-2xl text-purple-600 group-hover:scale-110 transition-transform"></i>
    </button>

    <button 
      onClick={() => setEtapaCheckout('carrinho')}
      className="mt-4 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-colors underline underline-offset-4"
    >
      ← Voltar ao Carrinho 🛒 
    </button>
  </div>
)}

{/* ETAPA 3: DADOS FINAIS E CARTEIRA WEB3 */}
{etapaCheckout === 'dados' && (
  <div className="flex-grow flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="space-y-4 mb-6 overflow-y-auto pr-2 max-h-[55vh] custom-scrollbar">
      <input 
        type="text" placeholder="NOME COMPLETO"
        className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
        value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})}
      />
      <input 
        type="email" placeholder="SEU MELHOR E-MAIL"
        className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
        value={dados.email} onChange={e => setDados({...dados, email: e.target.value})}
      />
      
      {metodoSelecionado === 'mp' && (
        <input 
          type="text" placeholder="CPF (PARA NOTA FISCAL)"
          className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
          value={dados.cpf} 
          onChange={e => setDados({...dados, cpf: e.target.value.replace(/\D/g, '').substring(0, 11)})}
        />
      )}

      <input 
        type="text" placeholder="COMPLEMENTO / NÚMERO"
        className="w-full bg-gray-50 rounded-xl p-4 text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
        value={dados.complemento} onChange={e => setDados({...dados, complemento: e.target.value})}
      />

      {/* BLOCO WEB3 COM VALIDAÇÃO */}
      <div className="mt-4 border-2 border-dashed border-orange-200 p-5 rounded-2xl bg-orange-50/50">
        <p className="text-[10px] font-black uppercase text-orange-600 mb-2 italic">🎁 Receber Certificado Digital (NFT)</p>
        <input 
          type="text" 
          placeholder="CARTEIRA POLYGON (0x...)" 
          value={dados.carteira_blockchain}
          onChange={(e) => setDados({...dados, carteira_blockchain: e.target.value})}
          className={`w-full border-2 p-4 rounded-xl font-mono text-[9px] outline-none transition-all ${
            dados.carteira_blockchain && !/^0x[a-fA-F0-9]{40}$/.test(dados.carteira_blockchain)
            ? 'border-red-500 bg-red-50 text-red-600'
            : 'border-orange-200 bg-white focus:border-orange-600'
          }`}
        />
        {dados.carteira_blockchain && !/^0x[a-fA-F0-9]{40}$/.test(dados.carteira_blockchain) ? (
          <p className="text-[8px] font-black text-red-500 mt-1 uppercase animate-pulse italic">Endereço de carteira inválido!</p>
        ) : (
          <p className="text-[8px] font-bold text-gray-400 mt-2 uppercase tracking-tight">Opcional: Informe para ganhar pontos e descontos futuros.</p>
        )}
      </div>
    </div>             

    {/* RESUMO DE VALORES E BOTÃO FINAL */}
    <div className="mt-auto pt-6 border-t border-gray-100">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase italic">Investimento Lifestyle</p>
          <p className="text-3xl font-black italic tracking-tighter">R$ {totalGeral.toFixed(2)}</p>
        </div>
        <div className="text-right">
            <p className="text-[8px] font-bold text-gray-300 uppercase">Entrega em {dados.cep}</p>
        </div>
      </div>

      {metodoSelecionado === 'mp' ? (
        <button 
          onClick={processarPedidoFinal}
          // TRAVA FINAL: Impede checkout se faltar Nome, Email ou se o CPF for inválido (para MP)
          disabled={loading || !dados.nome || !dados.email || (metodoSelecionado === 'mp' && dados.cpf.length < 11)}
          className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-black/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? 'Validando Estoque...' : 'Finalizar Pedido'}
        </button>
      ) : (
        <BotaoPagamentoWeb3 
          total={totalGeral} 
          dadosCliente={dados} 
          // Trava a carteira caso esteja preenchida incorretamente
          disabled={!/^0x[a-fA-F0-9]{40}$/.test(dados.carteira_blockchain)}
          onBeforeClick={processarPedidoFinal}
        />
      )}
      
      <button onClick={() => setEtapaCheckout('metodo')} className="w-full py-4 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-colors">
        ← Alterar Forma de Pagamento
      </button>
    </div>
  </div>
  )
}
