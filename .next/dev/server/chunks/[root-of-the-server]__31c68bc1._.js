module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/pages/api/checkout-mp.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mercadopago__$5b$external$5d$__$28$mercadopago$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mercadopago$29$__ = __turbopack_context__.i("[externals]/mercadopago [external] (mercadopago, cjs, [project]/node_modules/mercadopago)");
;
// 1. Configuração do Cliente com seu Access Token
// IMPORTANTE: Adicione MP_ACCESS_TOKEN no seu arquivo .env.local
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mercadopago__$5b$external$5d$__$28$mercadopago$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mercadopago$29$__["MercadoPagoConfig"]({
    accessToken: process.env.MP_ACCESS_TOKEN
});
async function handler(req, res) {
    // Garantir que apenas requisições POST sejam aceitas
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Método não permitido'
        });
    }
    const { itens, total, cpf, email, endereco } = req.body;
    try {
        const preference = new __TURBOPACK__imported__module__$5b$externals$5d2f$mercadopago__$5b$external$5d$__$28$mercadopago$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mercadopago$29$__["Preference"](client);
        // 2. Criar a estrutura da preferência
        const response = await preference.create({
            body: {
                // Mapeia os itens do carrinho para o formato do Mercado Pago
                items: itens.map((item)=>({
                        id: item.id.toString(),
                        title: item.nome,
                        unit_price: Number(item.preco),
                        quantity: Number(item.quantidade),
                        currency_id: 'BRL'
                    })),
                // Dados do comprador (ajuda na aprovação do antifraude)
                payer: {
                    email: email || "comprador@email.com",
                    identification: {
                        type: 'CPF',
                        number: cpf.replace(/\D/g, '') // Remove pontos e traços do CPF
                    }
                },
                // URLs de retorno que criamos anteriormente
                back_urls: {
                    success: "https://paodequeijodaira.vercel.app/sucesso",
                    failure: "https://paodequeijodaira.vercel.app/erro",
                    pending: "https://paodequeijodaira.vercel.app/sucesso"
                },
                // Redireciona automaticamente após o sucesso
                auto_return: "approved",
                // Metadados para você identificar o pedido no seu banco depois
                metadata: {
                    id_referencia: `pedido_${Date.now()}`,
                    endereco_entrega: endereco
                },
                // Métodos de pagamento permitidos (opcional)
                payment_methods: {
                    excluded_payment_types: [],
                    installments: 12
                }
            }
        });
        // 3. Retornar os dados do checkout para o frontend
        // O 'init_point' é o link oficial do checkout do Mercado Pago
        res.status(200).json({
            id: response.id,
            init_point: response.init_point
        });
    } catch (error) {
        console.error("Erro no Mercado Pago:", error);
        res.status(500).json({
            error: "Erro ao processar o checkout",
            details: error.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31c68bc1._.js.map