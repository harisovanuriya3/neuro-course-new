module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/modules/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModulePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
const modules = {
    RU: [
        "Введение",
        "История",
        "Клеточная физиология",
        "Мембранные процессы",
        "Ионные каналы",
        "Синапсы",
        "Возбуждение",
        "Рефлексы",
        "Пути",
        "Спинной мозг",
        "Ретикулярная формация",
        "Ствол мозга",
        "Мозжечок",
        "Таламус",
        "Гипоталамус",
        "Лимбическая система",
        "Миндалина",
        "Кора",
        "Сенсорные системы",
        "Вегетативная система",
        "Высшая деятельность",
        "Нейрогуморальная регуляция",
        "Патофизиология"
    ],
    KZ: [
        "Кіріспе",
        "Тарих",
        "Жасушалық физиология",
        "Мембраналық процестер",
        "Иондық арналар",
        "Синапстар",
        "Қозу",
        "Рефлекстер",
        "Жолдар",
        "Жұлын",
        "Ретикулярлық формация",
        "Ми сабауы",
        "Мишық",
        "Таламус",
        "Гипоталамус",
        "Лимбиялық жүйе",
        "Бадамша дене",
        "Ми қыртысы",
        "Сенсорлық жүйелер",
        "Вегетативтік жүйе",
        "Жоғары жүйке қызметі",
        "Нейрогуморальдық реттелу",
        "Патофизиология"
    ],
    EN: [
        "Introduction",
        "History",
        "Cell Physiology",
        "Membrane Processes",
        "Ion Channels",
        "Synapses",
        "Excitation",
        "Reflexes",
        "Pathways",
        "Spinal Cord",
        "Reticular Formation",
        "Brainstem",
        "Cerebellum",
        "Thalamus",
        "Hypothalamus",
        "Limbic System",
        "Amygdala",
        "Cerebral Cortex",
        "Sensory Systems",
        "Autonomic Nervous System",
        "Higher Nervous Activity",
        "Neurohumoral Regulation",
        "Pathophysiology"
    ]
};
const sections = [
    "theory",
    "practice",
    "cases",
    "tests",
    "questions",
    "media"
];
const text = {
    RU: {
        module: "Модуль",
        back: "← К содержанию курса",
        sections: [
            "Теория",
            "Практика",
            "Ситуационные задачи",
            "Тесты",
            "Вопросы",
            "Медиаматериалы"
        ]
    },
    KZ: {
        module: "Модуль",
        back: "← Курс мазмұнына",
        sections: [
            "Теория",
            "Практика",
            "Ситуациялық тапсырмалар",
            "Тесттер",
            "Сұрақтар",
            "Медиаматериалдар"
        ]
    },
    EN: {
        module: "Module",
        back: "← Course contents",
        sections: [
            "Theory",
            "Practice",
            "Case studies",
            "Tests",
            "Questions",
            "Media"
        ]
    }
};
async function ModulePage({ params, searchParams }) {
    const { id } = await params;
    const { lang: requestedLang } = await searchParams;
    const lang = requestedLang === "KZ" || requestedLang === "EN" ? requestedLang : "RU";
    if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const t = text[lang];
    const title = modules[lang][Number(id) - 1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "100vh",
            padding: "40px 20px",
            background: "#eef5fa"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "900px",
                margin: "0 auto",
                padding: "32px",
                background: "white",
                borderRadius: "16px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: `/?lang=${lang}#course`,
                    style: {
                        color: "#004b87",
                        fontWeight: "bold"
                    },
                    children: t.back
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/page.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "Language",
                    style: {
                        display: "flex",
                        gap: "16px",
                        marginTop: "24px"
                    },
                    children: [
                        "RU",
                        "KZ",
                        "EN"
                    ].map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/modules/${id}?lang=${code}`,
                            "aria-current": lang === code ? "page" : undefined,
                            children: code
                        }, code, false, {
                            fileName: "[project]/app/modules/[id]/page.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/page.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: {
                        color: "#004b87"
                    },
                    children: [
                        t.module,
                        " ",
                        id,
                        ". ",
                        title
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modules/[id]/page.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": t.module,
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                        marginTop: "24px"
                    },
                    children: sections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/modules/${id}/${section}?lang=${lang}`,
                            style: {
                                padding: "24px",
                                border: "1px solid #d4e0ea",
                                borderRadius: "12px",
                                color: "#004b87",
                                fontWeight: "bold",
                                textDecoration: "none"
                            },
                            children: t.sections[index]
                        }, section, false, {
                            fileName: "[project]/app/modules/[id]/page.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/page.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/modules/[id]/page.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/modules/[id]/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/modules/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/modules/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1to0inh._.js.map