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
// 1. Configuração do Cliente (O Token deve estar no seu .env.local)
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mercadopago__$5b$external$5d$__$28$mercadopago$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mercadopago$29$__["MercadoPagoConfig"]({
    accessToken: process.env.MP_ACCESS_TOKEN
});
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Método não permitido'
        });
    }
    try {
        const { itens, email, frete } = req.body;
        // 2. Formatação dos itens para o Mercado Pago
        const itemsMP = itens.map((item)=>({
                id: String(item.id),
                title: item.nome,
                unit_price: Number(item.preco),
                quantity: Number(item.quantidade),
                currency_id: 'BRL'
            }));
        // 3. Adicionar Frete se existir
        if (frete && Number(frete) > 0) {
            itemsMP.push({
                id: 'frete-entrega',
                title: 'Taxa de Entrega',
                unit_price: Number(frete),
                quantity: 1,
                currency_id: 'BRL'
            });
        }
        const preference = new __TURBOPACK__imported__module__$5b$externals$5d2f$mercadopago__$5b$external$5d$__$28$mercadopago$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mercadopago$29$__["Preference"](client);
        const response = await preference.create({
            body: {
                items: itemsMP,
                payer: {
                    email: email
                },
                external_reference: email,
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
                    failure: `${process.env.NEXT_PUBLIC_SITE_URL}/erro`,
                    pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pendente`
                },
                auto_return: "approved",
                notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook-mp`
            }
        });
        res.status(200).json({
            init_point: response.init_point
        });
    } catch (error) {
        console.error("Erro MP:", error);
        res.status(500).json({
            error: "Erro ao gerar link",
            details: error.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31c68bc1._.js.map