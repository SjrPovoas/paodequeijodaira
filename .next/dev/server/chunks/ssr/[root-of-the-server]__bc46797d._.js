module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/src/pages/loja.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
;
;
;
;
const Loja = ()=>{
    const LINK_LISTA_ESPERA = "https://43782b7b.sibforms.com/serve/MUIFAC4AxTEnI80RImF7seW5i2MRkz5EqdqtMse22-stmvG7jsOqdFhZ6mmpfwRA-2skU_c3GJF8YXD6k-K_kNE6_gFeWIFbCIxIEWpknHGH8m6tdQMhTuqNG7-e_tsEQRBC4-pjosH0TVoqcW1UonSiJnd2E378zedWIJRs_Dhj9R9v8_VCpmg9Kebo_wFD_WsvLIPqwRBVBCNh8w==";
    const WHATSAPP_FONE = "5561982777196";
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showScrollTop, setShowScrollTop] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Estado para armazenar o tamanho selecionado de cada produto antes de adicionar ao carrinho
    const [selectedSizes, setSelectedSizes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleSizeChange = (productId, size)=>{
        setSelectedSizes((prev)=>({
                ...prev,
                [productId]: size
            }));
    };
    const handleAddToCart = (product)=>{
        // Se for vestuário e não tiver tamanho selecionado, avisa o usuário
        if (product.category === 'vestuario' && !selectedSizes[product.id]) {
            alert("Por favor, selecione um tamanho (P, M ou G) antes de adicionar.");
            return;
        }
        const tamanhoEscolhido = selectedSizes[product.id] || null;
        setCart((prevCart)=>{
            // O item é único pela combinação de ID + Tamanho
            const itemExistente = prevCart.find((item)=>item.id === product.id && item.size === tamanhoEscolhido);
            if (itemExistente) {
                return prevCart.map((item)=>item.id === product.id && item.size === tamanhoEscolhido ? {
                        ...item,
                        quantity: item.quantity + 1
                    } : item);
            }
            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1,
                    size: tamanhoEscolhido
                }
            ];
        });
        setIsCartOpen(true);
    };
    const removeItem = (uniqueId)=>{
        // No carrinho, usamos index ou a combinação id+size para remover corretamente
        setCart(cart.filter((_, index)=>index !== uniqueId));
    };
    const toggleMenu = ()=>setIsMenuOpen(!isMenuOpen);
    const totalCarrinho = cart.reduce((acc, item)=>acc + item.price * item.quantity, 0);
    const totalItens = cart.reduce((acc, item)=>acc + item.quantity, 0);
    const finalizarPedidoWhatsApp = ()=>{
        let mensagem = `Olá Irá! Gostaria de fazer um pedido Lifestyle:\n\n`;
        cart.forEach((item)=>{
            const infoTamanho = item.size ? ` [Tamanho: ${item.size}]` : "";
            mensagem += `*${item.quantity}x* ${item.name}${infoTamanho} - R$ ${item.price * item.quantity},00\n`;
        });
        mensagem += `\n*Total: R$ ${totalCarrinho},00*`;
        window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_FONE}&text=${encodeURIComponent(mensagem)}`, '_blank');
    };
    const produtos = [
        {
            id: 1,
            name: 'T-Shirt Logo Pão de Queijo da Irá (Masculina)',
            price: 110,
            img: '/imagens/camiseta1.png',
            category: 'vestuario'
        },
        {
            id: 2,
            name: 'T-Shirt Logo Pão de Queijo da Irá (Feminina)',
            price: 110,
            img: '/imagens/camiseta2.png',
            category: 'vestuario'
        },
        {
            id: 3,
            name: 'Avental de Lona Pão de Queijo da Irá',
            price: 85,
            img: '/imagens/avental.png',
            category: 'acessorio'
        },
        {
            id: 4,
            name: 'Caneca Cerâmica Fosca do Pão de Queijo da Irá',
            price: 42,
            img: '/imagens/caneca.png',
            category: 'acessorio'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-df9f824b7f1858e8" + " " + "relative min-h-screen bg-white font-sans text-black overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        className: "jsx-df9f824b7f1858e8",
                        children: "Loja Lifestyle | Pão de Queijo da Irá"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "stylesheet",
                        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css",
                        className: "jsx-df9f824b7f1858e8"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-df9f824b7f1858e8" + " " + "border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/95 backdrop-blur-md z-[1000]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + "max-w-7xl mx-auto flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "jsx-df9f824b7f1858e8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/logo-paodequeijodaira.jpg",
                                    alt: "Logo",
                                    className: "jsx-df9f824b7f1858e8" + " " + "h-12 md:h-16 w-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 99,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 99,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                className: "jsx-df9f824b7f1858e8" + " " + "hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "#web3",
                                        className: "jsx-df9f824b7f1858e8" + " " + "hover:text-orange-600",
                                        children: "IRÁ DIGITAL GENESIS PASS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/",
                                        className: "jsx-df9f824b7f1858e8" + " " + "text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all",
                                        children: "COMPRAR PÃO DE QUEIJO"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCartOpen(true),
                                        className: "jsx-df9f824b7f1858e8" + " " + "flex items-center gap-2 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors",
                                                children: "Carrinho"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "bg-black text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full group-hover:bg-orange-600 transition-colors",
                                                children: totalItens
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 101,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "flex items-center gap-4 md:hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCartOpen(true),
                                        className: "jsx-df9f824b7f1858e8" + " " + "relative p-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "bi bi-bag text-2xl"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            totalItens > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "absolute top-0 right-0 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold",
                                                children: totalItens
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 113,
                                                columnNumber: 34
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: toggleMenu,
                                        className: "jsx-df9f824b7f1858e8" + " " + "text-3xl text-orange-600 z-[2001] relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-df9f824b7f1858e8" + " " + ((isMenuOpen ? "bi bi-x-lg" : "bi bi-list") || "")
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 110,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + `fixed inset-20 bg-white z-[50] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                            className: "jsx-df9f824b7f1858e8" + " " + "flex flex-col bg-white  items-center pt-32 space-y-8 text-xl font-black uppercase tracking-tighter italic text-center text-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: "#web3",
                                    onClick: toggleMenu,
                                    className: "jsx-df9f824b7f1858e8" + " " + "flex items-center gap-3 border-b-2 border-black pb-1 hover:text-orange-600 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-df9f824b7f1858e8",
                                            children: "Lista de espera Genesis Pass"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "bi bi-ticket-perforated text-2xl"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 125,
                                            columnNumber: 56
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setIsCartOpen(true);
                                        toggleMenu();
                                    },
                                    className: "jsx-df9f824b7f1858e8" + " " + "flex items-center gap-3 border-b-2 border-black pb-1 hover:text-orange-600 transition-colors uppercase font-black",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-df9f824b7f1858e8",
                                            children: [
                                                "Ver Carrinho (",
                                                totalItens,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "bi bi-cart3 text-2xl"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 129,
                                            columnNumber: 55
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 123,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "jsx-df9f824b7f1858e8" + " " + "py-16 px-6 md:px-12 max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "jsx-df9f824b7f1858e8" + " " + "mb-20 text-center md:text-left pt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4",
                                children: "Loja Oficial"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 137,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: "jsx-df9f824b7f1858e8" + " " + "text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none",
                                children: [
                                    "Lifestyle & ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                        className: "jsx-df9f824b7f1858e8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 138,
                                        columnNumber: 111
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Acessórios"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + "grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24",
                        children: produtos.map((produto)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "product-card group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: produto.img,
                                            alt: produto.name,
                                            className: "jsx-df9f824b7f1858e8" + " " + "w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "mt-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "flex justify-between items-start mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-df9f824b7f1858e8" + " " + "flex-1 pr-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-df9f824b7f1858e8" + " " + "text-sm font-black uppercase tracking-widest leading-tight",
                                                            children: produto.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/loja.js",
                                                            lineNumber: 150,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "jsx-df9f824b7f1858e8" + " " + "text-xs font-bold text-orange-600 uppercase mt-2",
                                                            children: [
                                                                "R$ ",
                                                                produto.price,
                                                                ",00"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/loja.js",
                                                            lineNumber: 151,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            produto.category === 'vestuario' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "flex gap-2 mb-6",
                                                children: [
                                                    'P',
                                                    'M',
                                                    'G'
                                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleSizeChange(produto.id, size),
                                                        className: "jsx-df9f824b7f1858e8" + " " + `w-10 h-10 border-2 font-black text-xs transition-all ${selectedSizes[produto.id] === size ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-200 hover:border-black text-gray-400'}`,
                                                        children: size
                                                    }, size, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 159,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleAddToCart(produto),
                                                className: "jsx-df9f824b7f1858e8" + " " + "w-full border-2 border-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all",
                                                children: "Adicionar ao Carrinho"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, produto.id, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 143,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 141,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 135,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                id: "web3",
                className: "jsx-df9f824b7f1858e8" + " " + "py-24 px-6 md:px-12 bg-[#2D3134] text-white relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + "max-w-4xl relative z-10 mx-auto md:mx-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "jsx-df9f824b7f1858e8" + " " + "text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic",
                                children: [
                                    "IRÁ Digital ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                        className: "jsx-df9f824b7f1858e8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 190,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            WebkitTextStroke: '1px white',
                                            color: 'transparent'
                                        },
                                        className: "jsx-df9f824b7f1858e8" + " " + "outline-text",
                                        children: "Genesis Pass"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 190,
                                        columnNumber: 32
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "jsx-df9f824b7f1858e8" + " " + "text-orange-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-12",
                                children: "(Genesis Pass): Os Benefícios na sua carteira digital."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 192,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "grid grid-cols-1 md:grid-cols-2 gap-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Golden Discount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 198,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "10% de desconto fixo em todos os itens da loja."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 197,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Early Access"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 202,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Acesso a novas fornadas 24h antes do público geral."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 203,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Ira's Secret Club"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 208,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Acesso a um grupo fechado com receitas exclusivas."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "font-black uppercase text-sm tracking-widest mb-2 text-orange-500",
                                                        children: "Physical Gift"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 212,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-gray-300 text-xs leading-relaxed",
                                                        children: "Primeiro holder recebe kit físico exclusivo."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 213,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 195,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: LINK_LISTA_ESPERA,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "jsx-df9f824b7f1858e8" + " " + "mt-16 inline-block bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 transition-all shadow-xl",
                                children: "Entrar na Lista de Espera"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 217,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + "absolute top-1/2 right-[-5%] translate-y-[-50%] text-[25vw] font-black opacity-[0.05] select-none text-orange-500 pointer-events-none whitespace-nowrap",
                        children: "WEB3"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 221,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 187,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "jsx-df9f824b7f1858e8" + " " + "py-20 px-6 bg-white border-t border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-df9f824b7f1858e8" + " " + "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-df9f824b7f1858e8" + " " + "grid grid-cols-1 md:grid-cols-3 gap-12 mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-df9f824b7f1858e8" + " " + "flex flex-col items-center md:items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "/",
                                            className: "jsx-df9f824b7f1858e8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/logo-paodequeijodaira.jpg",
                                                alt: "Logo",
                                                className: "jsx-df9f824b7f1858e8" + " " + "h-20 mb-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 231,
                                                columnNumber: 27
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 231,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "flex space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.instagram.com/paodequeijodaira",
                                                    target: "_blank",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "bi bi-instagram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 233,
                                                        columnNumber: 129
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 233,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.facebook.com/share/1GWWjcK1xr/",
                                                    target: "_blank",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "bi bi-facebook"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 234,
                                                        columnNumber: 129
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 234,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://www.youtube.com/@paodequeijodaira",
                                                    target: "_blank",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "bi bi-youtube"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 235,
                                                        columnNumber: 128
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 235,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://maps.app.goo.gl/oGCHp5i9y8HnPutg9",
                                                    target: "_blank",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "text-2xl hover:text-orange-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "bi bi-geo-alt-fill"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 236,
                                                        columnNumber: 128
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 236,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-df9f824b7f1858e8" + " " + "text-center md:text-left space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-black uppercase tracking-[0.3em] text-orange-600",
                                            children: "Funcionamento & Retirada"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "text-sm text-gray-600 leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-df9f824b7f1858e8",
                                                    children: "Horário:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Seg a Sáb das 08:00 às 18:00.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                                    className: "jsx-df9f824b7f1858e8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 242,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Dom das 08:00 às 12:00."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "text-sm text-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-df9f824b7f1858e8",
                                                    children: "Endereço:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Quadra 4 Lote 26 Condomínio Flores do Cerrado II",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                                    className: "jsx-df9f824b7f1858e8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 244,
                                                    columnNumber: 92
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Recreio Mossoró - Cidade Ocidental-GO"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-df9f824b7f1858e8" + " " + "text-center md:text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "text-lg font-black uppercase mb-2",
                                            children: "Pão de Queijo da Irá"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-bold text-gray-400 uppercase tracking-widest",
                                            children: "© 2026 - Todos os direitos reservados."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 248,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-df9f824b7f1858e8" + " " + "mt-2 space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "/termos",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "hover:text-black",
                                                    children: "Termos de Uso"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-df9f824b7f1858e8",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "/privacidade",
                                                    className: "jsx-df9f824b7f1858e8" + " " + "hover:text-black",
                                                    children: "Privacidade"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/loja.js",
                                                    lineNumber: 252,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/loja.js",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/loja.js",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 229,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-df9f824b7f1858e8" + " " + "pt-8 border-t border-gray-50 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "https://sjrpovoas.vercel.app",
                                target: "_blank",
                                className: "jsx-df9f824b7f1858e8" + " " + "text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300 hover:text-orange-600 transition-all",
                                children: "Desenvolvido por SjrPovoaS"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 256,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/loja.js",
                            lineNumber: 255,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/loja.js",
                    lineNumber: 228,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 227,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isCartOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-df9f824b7f1858e8" + " " + "fixed inset-0 z-[3000] flex justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: ()=>setIsCartOpen(false),
                        className: "jsx-df9f824b7f1858e8" + " " + "absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 264,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-df9f824b7f1858e8" + " " + "relative w-full max-w-md bg-white h-full shadow-2xl p-10 flex flex-col animate-slide-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "flex justify-between items-center mb-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "text-2xl font-black uppercase tracking-tighter italic",
                                        children: "Seu Carrinho"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCartOpen(false),
                                        className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-black uppercase tracking-widest border-b-2 border-black",
                                        children: "Fechar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 266,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "flex-1 overflow-y-auto",
                                children: cart.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "flex gap-6 mb-8 items-center border-b border-gray-50 pb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: item.img,
                                                alt: item.name,
                                                className: "jsx-df9f824b7f1858e8" + " " + "w-20 h-24 object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-black uppercase tracking-widest leading-tight",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    item.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-bold text-orange-600 mt-1 uppercase",
                                                        children: [
                                                            "Tamanho: ",
                                                            item.size
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 276,
                                                        columnNumber: 35
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-bold text-gray-400 mt-1 uppercase",
                                                        children: [
                                                            "Qtd: ",
                                                            item.quantity
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 277,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "jsx-df9f824b7f1858e8" + " " + "flex justify-between items-center mt-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "jsx-df9f824b7f1858e8" + " " + "font-black text-sm tracking-tighter",
                                                                children: [
                                                                    "R$ ",
                                                                    item.price * item.quantity,
                                                                    ",00"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/loja.js",
                                                                lineNumber: 279,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>removeItem(index),
                                                                className: "jsx-df9f824b7f1858e8" + " " + "text-[9px] font-black uppercase text-red-600 hover:underline",
                                                                children: "Remover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/loja.js",
                                                                lineNumber: 280,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/loja.js",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `${item.id}-${item.size}-${index}`, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 270,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-df9f824b7f1858e8" + " " + "mt-10 pt-10 border-t-4 border-black",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-df9f824b7f1858e8" + " " + "flex justify-between items-end mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "text-[10px] font-black uppercase tracking-[0.4em] text-gray-400",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 289,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-df9f824b7f1858e8" + " " + "text-3xl font-black tracking-tighter",
                                                children: [
                                                    "R$ ",
                                                    totalCarrinho,
                                                    ",00"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/loja.js",
                                                lineNumber: 290,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 288,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: finalizarPedidoWhatsApp,
                                        className: "jsx-df9f824b7f1858e8" + " " + "w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-orange-600 transition-colors",
                                        children: "Finalizar no WhatsApp"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/loja.js",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/loja.js",
                                lineNumber: 287,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/loja.js",
                        lineNumber: 265,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 263,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: scrollToTop,
                className: "jsx-df9f824b7f1858e8" + " " + `fixed bottom-8 right-8 z-[90] bg-orange-600 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-black hover:scale-110 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                    className: "jsx-df9f824b7f1858e8" + " " + "bi bi-arrow-up text-xl font-bold"
                }, void 0, false, {
                    fileName: "[project]/src/pages/loja.js",
                    lineNumber: 306,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/loja.js",
                lineNumber: 300,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "df9f824b7f1858e8",
                children: "@keyframes slide-in{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-slide-in.jsx-df9f824b7f1858e8{animation:.4s cubic-bezier(.16,1,.3,1) slide-in}.animate-fade-in.jsx-df9f824b7f1858e8{animation:.3s ease-out fade-in}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/loja.js",
        lineNumber: 90,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Loja;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc46797d._.js.map