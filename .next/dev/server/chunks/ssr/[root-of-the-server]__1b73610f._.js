module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/src/lib/supabaseClient.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, esm_import, [project]/node_modules/@supabase/supabase-js)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://wucwxuqdneivnwwyjgva.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1Y3d4dXFkbmVpdm53d3lqZ3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTYzNTQsImV4cCI6MjA4NDE3MjM1NH0.XhbEE7sJx5xP8YK3-tZ_CQg8TmGZaBwOb38GYGMeyM0");
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(supabaseUrl, supabaseAnonKey);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/src/lib/priceService.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/priceService.js
/**
 * Busca o preço atual do POL (Polygon) em Reais e converte o total da compra.
 * @param {number} valorEmReais - O total do carrinho em BRL
 * @returns {string} - O valor equivalente em POL (string formatada para ethers)
 */ __turbopack_context__.s([
    "converterRealParaPOL",
    ()=>converterRealParaPOL
]);
async function converterRealParaPOL(valorEmReais) {
    try {
        // Usando a API gratuita do CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=brl');
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
}),
"[project]/src/components/BotaoPagamentoWeb3.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>BotaoPagamentoWeb3
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__ = __turbopack_context__.i("[externals]/ethers [external] (ethers, esm_import, [project]/node_modules/ethers)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$priceService$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/priceService.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function BotaoPagamentoWeb3({ totalBRL, itens, dadosEntrega }) {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const realizarPagamentoCripto = async ()=>{
        // 1. Verificações Iniciais
        if (!window.ethereum) {
            alert("Por favor, instale a MetaMask para pagar com POL.");
            return;
        }
        const carteiraDestino = ("TURBOPACK compile-time value", "0x88C265E32d8C786F5D102C19E715b3b7dcED98b1");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setLoading(true);
        try {
            // 2. Conexão com a Carteira do Cliente
            const provider = new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__["ethers"].BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            // 3. Conversão de Preço (Oráculo)
            const valorEmPOL = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$priceService$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["converterRealParaPOL"])(totalBRL);
            if (!valorEmPOL) throw new Error("Não foi possível obter a cotação do POL.");
            // 4. Execução da Transação
            const tx = await signer.sendTransaction({
                to: carteiraDestino,
                value: __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__["ethers"].parseEther(valorEmPOL)
            });
            // 5. Registro no Banco de Dados (Supabase)
            // Salvamos o hash IMEDIATAMENTE após o envio
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('pedidos').insert([
                {
                    cliente_email: dadosEntrega.email,
                    wallet_address: walletAddress,
                    total: totalBRL,
                    resumo_itens: itens.map((i)=>`${i.quantidade}x ${i.nome}`).join(", "),
                    status: 'Aguardando Confirmação',
                    tx_hash: tx.hash,
                    cep: dadosEntrega.cep,
                    endereco_completo: dadosEntrega.endereco
                }
            ]);
            // 6. Aguarda a confirmação da Blockchain
            await tx.wait();
            // 7. Sucesso!
            router.push(`/sucesso?tx=${tx.hash}`);
        } catch (error) {
            console.error("Erro na transação:", error);
            alert("A transação foi cancelada ou falhou. Tente novamente.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: realizarPagamentoCripto,
        disabled: loading,
        className: "w-full bg-[#8247E5] text-white pt-4 px-4 py-4 font-bold hover:shadow-purple-500/50 shadow-lg transition-all flex items-center justify-center gap-3",
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/BotaoPagamentoWeb3.js",
                    lineNumber: 77,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    children: "Validando na Blockchain..."
                }, void 0, false, {
                    fileName: "[project]/src/components/BotaoPagamentoWeb3.js",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BotaoPagamentoWeb3.js",
            lineNumber: 76,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: "Pagar com Polygon (POL)"
            }, void 0, false, {
                fileName: "[project]/src/components/BotaoPagamentoWeb3.js",
                lineNumber: 82,
                columnNumber: 11
            }, this)
        }, void 0, false)
    }, void 0, false, {
        fileName: "[project]/src/components/BotaoPagamentoWeb3.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/loja.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Loja
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [ssr] (ecmascript)"); // Certifique-se de criar este arquivo
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BotaoPagamentoWeb3$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BotaoPagamentoWeb3.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BotaoPagamentoWeb3$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BotaoPagamentoWeb3$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function Loja() {
    // CONFIGURAÇÕES E LINKS
    const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
    const VALOR_FRETE_GRATIS = 500;
    // ESTADOS DE INTERFACE
    const [carrinho, setCarrinho] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [modalAberto, setModalAberto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [menuMobileAberto, setMenuMobileAberto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showScrollTop, setShowScrollTop] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // ESTADOS DE DADOS E PRODUTOS
    const [dados, setDados] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        email: '',
        cpf: '',
        cep: '',
        endereco: ''
    });
    const [selectedSizes, setSelectedSizes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [frete, setFrete] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    // CÁLCULO DE VALORES
    const subtotal = carrinho.reduce((acc, item)=>acc + item.preco * item.quantidade, 0);
    const totalGeral = subtotal + frete;
    // 1. MONITORAR SCROLL (BOTÃO VOLTAR AO TOPO)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleScroll = ()=>setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    // 2. LÓGICA DE FRETE (DF/GO vs BRASIL)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (subtotal === 0) {
            setFrete(0);
            return;
        }
        if (subtotal >= VALOR_FRETE_GRATIS) {
            setFrete(0);
        } else if (dados.cep.length === 8) {
            const prefixo = dados.cep.substring(0, 2);
            // Região 70 a 73 (DF e Entorno próximo)
            if ([
                "70",
                "71",
                "72",
                "73"
            ].includes(prefixo)) {
                setFrete(25.00);
            } else {
                setFrete(50.00);
            }
        } else {
            setFrete(0);
        }
    }, [
        subtotal,
        dados.cep
    ]);
    // 3. BUSCA AUTOMÁTICA DE CEP (ViaCEP)
    const handleCEP = async (valor)=>{
        const cepLimpo = valor.replace(/\D/g, '').substring(0, 8);
        setDados((prev)=>({
                ...prev,
                cep: cepLimpo
            }));
        if (cepLimpo.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const json = await res.json();
                if (!json.erro) {
                    setDados((prev)=>({
                            ...prev,
                            endereco: `${json.logradouro}, ${json.bairro} - ${json.localidade}/${json.uf}`
                        }));
                }
            } catch (e) {
                console.error("Erro na busca do CEP");
            }
        }
    };
    // 4. ADICIONAR AO CARRINHO COM VALIDAÇÃO DE TAMANHO
    const add = (p)=>{
        if (p.category === 'vestuario' && !selectedSizes[p.id]) {
            alert("Por favor, selecione um tamanho!");
            return;
        }
        const idUnico = p.category === 'vestuario' ? `${p.id}-${selectedSizes[p.id]}` : p.id;
        const nomeComTamanho = p.category === 'vestuario' ? `${p.nome} (${selectedSizes[p.id]})` : p.nome;
        const existe = carrinho.find((x)=>x.id === idUnico);
        if (existe) {
            setCarrinho(carrinho.map((x)=>x.id === idUnico ? {
                    ...existe,
                    quantidade: existe.quantidade + 1
                } : x));
        } else {
            setCarrinho([
                ...carrinho,
                {
                    ...p,
                    id: idUnico,
                    nome: nomeComTamanho,
                    quantidade: 1
                }
            ]);
        }
        setModalAberto(true);
    };
    // 5. SALVAR NO SUPABASE (BANCO DE DADOS)
    const salvarPedidoNoSupabase = async (metodoPagamento)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('pedidos').insert([
                {
                    email: dados.email,
                    cpf: dados.cpf,
                    cep: dados.cep,
                    endereco: dados.endereco,
                    total_geral: totalGeral,
                    frete: frete,
                    itens: carrinho,
                    metodo_pagamento: metodoPagamento,
                    status: 'pendente'
                }
            ]);
            if (error) {
                // ESTE LOG É IMPORTANTE:
                console.error("ERRO DETALHADO DO SUPABASE:", error.message, error.details, error.hint);
                alert("Erro técnico: " + error.message); // Isso vai mostrar o erro na tela para você
                return false;
            }
            return true;
        } catch (error) {
            console.error("Erro Crítico:", error);
            return false;
        }
    };
    // 6. INICIAR CHECKOUT MERCADO PAGO
    const iniciarCheckoutMP = async ()=>{
        // Debug para você ver o que está preenchido no Console (F12)
        console.log("Dados atuais:", dados);
        // Validação detalhada
        if (!dados.email) {
            alert("E-mail é obrigatório!");
            return;
        }
        if (!dados.cpf) {
            alert("CPF é obrigatório!");
            return;
        }
        if (!dados.endereco) {
            alert("Endereço é obrigatório!");
            return;
        }
        if (dados.cep.length < 8) {
            alert("CEP incompleto!");
            return;
        }
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        setLoading(true);
        // Salva no banco de dados
        const salvo = await salvarPedidoNoSupabase('Mercado Pago');
        if (salvo) {
            try {
                const res = await fetch('/api/checkout-mp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itens: carrinho,
                        total: totalGeral,
                        frete,
                        ...dados
                    })
                });
                const data = await res.json();
                if (data.init_point) {
                    window.location.href = data.init_point;
                } else {
                    console.error("Erro na API do Mercado Pago:", data);
                    alert("Erro ao gerar link de pagamento.");
                }
            } catch (err) {
                console.error("Erro na chamada da API:", err);
                alert("Falha na conexão com o servidor.");
            }
        } else {
            alert("Houve um erro ao registrar seu pedido no banco de dados. Verifique sua conexão.");
        }
        setLoading(false);
    };
    // LISTA DE PRODUTOS
    const produtos = [
        {
            id: 1,
            nome: 'T-Shirt Logo Pão de Queijo da Irá (Masc)',
            preco: 110,
            img: '/imagens/camiseta1.png',
            category: 'vestuario'
        },
        {
            id: 2,
            nome: 'T-Shirt Logo Pão de Queijo da Irá (Fem)',
            preco: 110,
            img: '/imagens/camiseta2.png',
            category: 'vestuario'
        },
        {
            id: 3,
            nome: 'Avental de Lona Pão de Queijo da Irá',
            preco: 85,
            img: '/imagens/avental.png',
            category: 'acessorios'
        },
        {
            id: 4,
            nome: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá',
            preco: 42,
            img: '/imagens/caneca.png',
            category: 'acessorios'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-8553d4424295cc02" + " " + "relative min-h-screen bg-white font-sans text-black overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        className: "jsx-8553d4424295cc02",
                        children: "Loja Lifestyle | Pão de Queijo da Irá"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "stylesheet",
                        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css",
                        className: "jsx-8553d4424295cc02"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-8553d4424295cc02" + " " + "bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-[60]",
                children: "Loja Lifestyle • Entrega em todo Brasil • Frete Grátis acima de R$ 500"
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-8553d4424295cc02" + " " + "border-b border-gray-100 py-4 px-6 sticky top-[28px] bg-white/95 backdrop-blur-md z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-8553d4424295cc02" + " " + "max-w-7xl mx-auto flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: "/",
                            className: "jsx-8553d4424295cc02",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/logo-paodequeijodaira.jpg",
                                alt: "Logo",
                                className: "jsx-8553d4424295cc02" + " " + "h-12 md:h-16 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 192,
                                columnNumber: 23
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                            className: "jsx-8553d4424295cc02" + " " + "hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: "#web3",
                                    className: "jsx-8553d4424295cc02" + " " + "hover:text-orange-600 transition-colors",
                                    children: "IRÁ DIGITAL GENESIS PASS"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: "/",
                                    className: "jsx-8553d4424295cc02" + " " + "text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all",
                                    children: "COMPRAR PÃO DE QUEIJO"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModalAberto(true),
                                    className: "jsx-8553d4424295cc02" + " " + "flex items-center gap-2 bg-[#3D2B1F] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-black uppercase",
                                            children: "Carrinho"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-xs font-bold border-l border-white/20 pl-2",
                                            children: carrinho.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-8553d4424295cc02" + " " + "flex md:hidden items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModalAberto(true),
                                    className: "jsx-8553d4424295cc02" + " " + "relative p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-8553d4424295cc02" + " " + "bi bi-bag text-2xl"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        carrinho.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-8553d4424295cc02" + " " + "absolute top-0 right-0 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold",
                                            children: carrinho.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMenuMobileAberto(true),
                                    className: "jsx-8553d4424295cc02" + " " + "p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                        className: "jsx-8553d4424295cc02" + " " + "bi bi-list text-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/loja.js",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            menuMobileAberto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-8553d4424295cc02" + " " + "fixed inset-0 z-[100] md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: ()=>setMenuMobileAberto(false),
                        className: "jsx-8553d4424295cc02" + " " + "absolute inset-0 bg-black/60 backdrop-blur-md"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        className: "jsx-8553d4424295cc02" + " " + "relative w-full bg-white h-auto p-10 flex flex-col space-y-8 text-center animate-slide-down shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMenuMobileAberto(false),
                                className: "jsx-8553d4424295cc02" + " " + "absolute top-6 right-6 text-3xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: "jsx-8553d4424295cc02" + " " + "bi bi-x-lg"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "#web3",
                                onClick: ()=>setMenuMobileAberto(false),
                                className: "jsx-8553d4424295cc02" + " " + "text-sm font-black uppercase tracking-[0.2em]",
                                children: "IRÁ DIGITAL GENESIS PASS"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "jsx-8553d4424295cc02" + " " + "text-sm font-black uppercase tracking-[0.2em] text-orange-600",
                                children: "COMPRAR PÃO DE QUEIJO"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "pt-4 border-t border-gray-100 flex justify-center gap-6 text-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "https://www.instagram.com/paodequeijodaira",
                                        target: "_blank",
                                        className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-8553d4424295cc02" + " " + "bi bi-instagram"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 232,
                                            columnNumber: 129
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "https://www.facebook.com/share/1GWWjcK1xr/",
                                        target: "_blank",
                                        className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-8553d4424295cc02" + " " + "bi bi-facebook"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 233,
                                            columnNumber: 129
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "https://www.youtube.com/@paodequeijodaira",
                                        target: "_blank",
                                        className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-8553d4424295cc02" + " " + "bi bi-youtube"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 234,
                                            columnNumber: 128
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "jsx-8553d4424295cc02" + " " + "max-w-6xl mx-auto py-12 px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "jsx-8553d4424295cc02" + " " + "py-20 border-b border-orange-100 mb-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "jsx-8553d4424295cc02" + " " + "text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none",
                            children: [
                                "Lifestyle &",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                    className: "jsx-8553d4424295cc02"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 242,
                                    columnNumber: 117
                                }, this),
                                "Acessórios"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-8553d4424295cc02" + " " + "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-24",
                        children: produtos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "group flex flex-col h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "aspect-[4/5] bg-white border border-gray-100 rounded-sm overflow-hidden mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: p.img,
                                            alt: p.nome,
                                            className: "jsx-8553d4424295cc02" + " " + "w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-8553d4424295cc02" + " " + "font-black uppercase text-sm tracking-widest mb-1",
                                        children: p.nome
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-8553d4424295cc02" + " " + "text-orange-600 font-bold mb-6 italic",
                                        children: [
                                            "R$ ",
                                            p.preco.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this),
                                    p.category === 'vestuario' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "flex gap-2 mb-6",
                                        children: [
                                            'P',
                                            'M',
                                            'G',
                                            'GG'
                                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedSizes({
                                                        ...selectedSizes,
                                                        [p.id]: s
                                                    }),
                                                className: "jsx-8553d4424295cc02" + " " + `w-10 h-10 border-2 font-black text-[10px] transition-all ${selectedSizes[p.id] === s ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-200'}`,
                                                children: s
                                            }, s, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 257,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 255,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>add(p),
                                        className: "jsx-8553d4424295cc02" + " " + "mt-auto w-full py-5 border-2 border-[#3D2B1F] font-black uppercase text-[10px] tracking-widest hover:bg-[#3D2B1F] hover:text-white transition-all",
                                        children: "Adicionar ao Carrinho"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                id: "web3",
                className: "jsx-8553d4424295cc02" + " " + "py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-8553d4424295cc02" + " " + "max-w-4xl relative z-10 mx-auto md:mx-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "jsx-8553d4424295cc02" + " " + "text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic",
                                children: [
                                    "IRÁ Digital ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                        className: "jsx-8553d4424295cc02"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 271,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            WebkitTextStroke: '1px white',
                                            color: 'transparent',
                                            WebkitTextFillColor: 'transparent'
                                        },
                                        className: "jsx-8553d4424295cc02" + " " + "outline-text",
                                        children: "Genesis Pass"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 271,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "jsx-8553d4424295cc02" + " " + "text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12",
                                children: "(Genesis Pass): Os Benefícios na sua carteira digital."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-8553d4424295cc02" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Golden Discount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 279,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-8553d4424295cc02" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "10% de desconto fixo em todos os itens da loja."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 280,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 278,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-8553d4424295cc02" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Early Access"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 283,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-8553d4424295cc02" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Acesso a novas fornadas 24h antes do público geral."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 284,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-8553d4424295cc02" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Ira's Secret Club"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 289,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-8553d4424295cc02" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Acesso a um grupo fechado com receitas exclusivas."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 290,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-8553d4424295cc02" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Physical Gift"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 293,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-8553d4424295cc02" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Primeiro holder recebe kit físico exclusivo."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "flex justify-center md:justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: LINK_LISTA_ESPERA,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "jsx-8553d4424295cc02" + " " + "mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl",
                                    children: "Entrar na Lista de Espera"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-8553d4424295cc02" + " " + "absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap hidden md:block",
                        children: "WEB3"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "jsx-8553d4424295cc02" + " " + "py-20 px-6 bg-white border-t border-gray-100 text-center md:text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-8553d4424295cc02" + " " + "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-8553d4424295cc02" + " " + "grid grid-cols-1 md:grid-cols-3 gap-12 mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-8553d4424295cc02" + " " + "flex flex-col items-center md:items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "/",
                                            className: "jsx-8553d4424295cc02",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/logo-paodequeijodaira.jpg",
                                                alt: "Logo",
                                                className: "jsx-8553d4424295cc02" + " " + "h-20 mb-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 314,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-8553d4424295cc02" + " " + "flex space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.instagram.com/paodequeijodaira",
                                                    target: "_blank",
                                                    className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-8553d4424295cc02" + " " + "bi bi-instagram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 316,
                                                        columnNumber: 129
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 316,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.facebook.com/share/1GWWjcK1xr/",
                                                    target: "_blank",
                                                    className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-8553d4424295cc02" + " " + "bi bi-facebook"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 317,
                                                        columnNumber: 129
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 317,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.youtube.com/@paodequeijodaira",
                                                    target: "_blank",
                                                    className: "jsx-8553d4424295cc02" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-8553d4424295cc02" + " " + "bi bi-youtube"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 318,
                                                        columnNumber: 128
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 318,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-8553d4424295cc02" + " " + "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-black uppercase tracking-[0.3em] text-orange-600",
                                            children: "Funcionamento & Retirada"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 322,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-sm text-gray-600 leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-8553d4424295cc02",
                                                    children: "Horário:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 324,
                                                    columnNumber: 17
                                                }, this),
                                                " Seg a Sáb das 08:00 às 18:00.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                                    className: "jsx-8553d4424295cc02"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 324,
                                                    columnNumber: 72
                                                }, this),
                                                "Dom das 08:00 às 12:00."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-sm text-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-8553d4424295cc02",
                                                    children: "Endereço:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 326,
                                                    columnNumber: 17
                                                }, this),
                                                " Quadra 4 Lote 26 Condomínio Flores do Cerrado II",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                                    className: "jsx-8553d4424295cc02"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 326,
                                                    columnNumber: 92
                                                }, this),
                                                "Recreio Mossoró - Cidade Ocidental-GO"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-8553d4424295cc02" + " " + "md:text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-lg font-black uppercase mb-2",
                                            children: "Pão de Queijo da Irá"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-bold text-gray-400 uppercase tracking-widest",
                                            children: "© 2026 - Todos os direitos reservados."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-8553d4424295cc02" + " " + "pt-8 border-t border-gray-50 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "https://sjrpovoas.vercel.app",
                                target: "_blank",
                                className: "jsx-8553d4424295cc02" + " " + "text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all",
                                children: "Desenvolvido por SjrPovoaS"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/loja.js",
                    lineNumber: 311,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            modalAberto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-8553d4424295cc02" + " " + "fixed inset-0 z-[100] flex justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: ()=>setModalAberto(false),
                        className: "jsx-8553d4424295cc02" + " " + "absolute inset-0 bg-black/40 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-8553d4424295cc02" + " " + "relative w-full max-w-md bg-[#FFFDF5] h-full shadow-2xl flex flex-col p-6 animate-slide-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "flex justify-between items-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "jsx-8553d4424295cc02" + " " + "text-2xl font-black uppercase italic tracking-tighter",
                                        children: "Seu Carrinho"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setModalAberto(false),
                                        className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-black border-b-2 border-black",
                                        children: "FECHAR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 344,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "mb-6 bg-white p-4 rounded-xl border border-orange-100 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-8553d4424295cc02" + " " + "text-[9px] font-black uppercase text-center mb-2 tracking-widest",
                                        children: subtotal >= 500 ? "🎉 Você ganhou frete grátis!" : `Faltam R$ ${(500 - subtotal).toFixed(2)} para frete grátis`
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "w-full h-1 bg-gray-100 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${Math.min(subtotal / 500 * 100, 100)}%`
                                            },
                                            className: "jsx-8553d4424295cc02" + " " + "h-full bg-orange-600 transition-all duration-1000"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "flex-1 overflow-y-auto pr-2 custom-scroll",
                                children: carrinho.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "flex gap-4 mb-6 border-b border-orange-50 pb-6 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "w-16 h-20 bg-white border border-gray-100 rounded overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: item.img,
                                                    className: "jsx-8553d4424295cc02" + " " + "w-full h-full object-cover mix-blend-multiply"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 363,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-black uppercase leading-tight tracking-widest",
                                                        children: item.nome
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "jsx-8553d4424295cc02" + " " + "mt-1 flex gap-3 text-[10px] font-black uppercase",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "jsx-8553d4424295cc02" + " " + "text-gray-400",
                                                                children: [
                                                                    "QTD: ",
                                                                    item.quantidade
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/loja.js",
                                                                lineNumber: 368,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "jsx-8553d4424295cc02" + " " + "text-black",
                                                                children: [
                                                                    "R$ ",
                                                                    (item.preco * item.quantidade).toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/loja.js",
                                                                lineNumber: 369,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 367,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setCarrinho(carrinho.filter((i)=>i.id !== item.id)),
                                                className: "jsx-8553d4424295cc02" + " " + "text-gray-400 p-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                    className: "jsx-8553d4424295cc02" + " " + "bi bi-trash3 text-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 372,
                                                    columnNumber: 125
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-8553d4424295cc02" + " " + "mt-auto pt-6 border-t-2 border-[#3D2B1F] space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "text-[10px] font-black uppercase space-y-[-15]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "flex justify-between opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 380,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: [
                                                            "R$ ",
                                                            subtotal.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 380,
                                                        columnNumber: 87
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "flex justify-between text-orange-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: [
                                                            "Frete ",
                                                            dados.cep.length < 8 && subtotal < 500 ? '(insira o CEP)' : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 382,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: subtotal >= VALOR_FRETE_GRATIS ? "GRÁTIS" : dados.cep.length === 8 ? `R$ ${frete.toFixed(2)}` : "R$ 0,00"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 383,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "flex justify-between text-2xl pt-2 border-t border-[#3D2B1F]/10 italic",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 385,
                                                        columnNumber: 105
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: [
                                                            "R$ ",
                                                            totalGeral.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 385,
                                                        columnNumber: 123
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 379,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "space-y-[-20]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-8553d4424295cc02" + " " + "grid grid-cols-2 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "CEP",
                                                        maxLength: "8",
                                                        value: dados.cep,
                                                        onChange: (e)=>handleCEP(e.target.value),
                                                        className: "jsx-8553d4424295cc02" + " " + "bg-white border border-gray-200 p-3 rounded-lg text-xs outline-none focus:border-orange-600 transition-all"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 390,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "CPF",
                                                        onChange: (e)=>setDados({
                                                                ...dados,
                                                                cpf: e.target.value
                                                            }),
                                                        className: "jsx-8553d4424295cc02" + " " + "bg-white border border-gray-200 p-3 rounded-lg text-xs outline-none focus:border-orange-600 transition-all"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 389,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Endereço Completo",
                                                value: dados.endereco,
                                                readOnly: true,
                                                className: "jsx-8553d4424295cc02" + " " + "w-full bg-gray-50 border border-gray-100 p-3 rounded-lg text-[10px] font-bold text-orange-600 outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                placeholder: "E-mail",
                                                onChange: (e)=>setDados({
                                                        ...dados,
                                                        email: e.target.value
                                                    }),
                                                className: "jsx-8553d4424295cc02" + " " + "w-full bg-white border border-gray-200 p-3 rounded-lg text-xs outline-none focus:border-orange-600 transition-all"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-8553d4424295cc02" + " " + "grid grid-cols-2 gap-1 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: iniciarCheckoutMP,
                                                className: "jsx-8553d4424295cc02" + " " + "bg-black text-white py-4 font-black uppercase text-[12px] flex flex-col items-center justify-center hover:bg-orange-600 transition-all shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-8553d4424295cc02" + " " + "bi bi-credit-card-2-back text-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8553d4424295cc02",
                                                        children: "Cartão ou Pix"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BotaoPagamentoWeb3$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                totalBRL: totalGeral,
                                                itens: carrinho,
                                                dadosEntrega: dados
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 341,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    }),
                className: "jsx-8553d4424295cc02" + " " + `fixed bottom-8 right-8 z-[100] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl items-center justify-center transition-all duration-500 ${showScrollTop ? 'translate-y-0 opacity-100 flex' : 'translate-y-20 opacity-0'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                    className: "jsx-8553d4424295cc02" + " " + "bi bi-arrow-up text-xl"
                }, void 0, false, {
                    fileName: "[project]/src/pages/loja.js",
                    lineNumber: 414,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 410,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "8553d4424295cc02",
                children: "@keyframes slide-left{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes slide-down{0%{transform:translateY(-100%)}to{transform:translateY(0)}}.animate-slide-left{animation:.4s cubic-bezier(.16,1,.3,1) slide-left}.animate-slide-down{animation:.4s cubic-bezier(.16,1,.3,1) slide-down}.custom-scroll::-webkit-scrollbar{width:0}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/loja.js",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b73610f._.js.map