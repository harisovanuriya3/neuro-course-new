module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/course.ts [app-rsc] (ecmascript)");
;
;
;
const ui = {
    RU: {
        title: "Содержание курса",
        subtitle: "Выберите учебный модуль",
        module: "Модуль",
        open: "Открыть модуль →"
    },
    KZ: {
        title: "Курс мазмұны",
        subtitle: "Оқу модулін таңдаңыз",
        module: "Модуль",
        open: "Модульді ашу →"
    },
    EN: {
        title: "Course Contents",
        subtitle: "Choose a learning module",
        module: "Module",
        open: "Open module →"
    }
};
async function HomePage({ searchParams }) {
    const { lang: requestedLang } = await searchParams;
    const rawLang = Array.isArray(requestedLang) ? requestedLang[0] : requestedLang;
    const lang = rawLang === "KZ" || rawLang === "EN" ? rawLang : "RU";
    const t = ui[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "100vh",
            padding: "48px 36px 70px",
            background: "#f2f7fb",
            color: "#003f73"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "course",
            style: {
                maxWidth: "1500px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "Language",
                    style: {
                        display: "flex",
                        justifyContent: "center",
                        gap: "18px",
                        marginBottom: "28px"
                    },
                    children: [
                        "RU",
                        "KZ",
                        "EN"
                    ].map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/?lang=${code}#course`,
                            "aria-current": lang === code ? "page" : undefined,
                            style: {
                                color: "#005b9f",
                                fontWeight: lang === code ? 700 : 500
                            },
                            children: code
                        }, code, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center",
                        marginBottom: "36px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: 0,
                                fontSize: "34px",
                                lineHeight: 1.2,
                                color: "#004b87"
                            },
                            children: t.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginTop: "14px",
                                fontSize: "18px",
                                color: "#60758a"
                            },
                            children: t.subtitle
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                        gap: "18px"
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modules"][lang].map((title, index)=>{
                        const moduleNumber = index + 1;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            style: {
                                background: "#ffffff",
                                border: "1px solid #d5e1eb",
                                borderRadius: "16px",
                                padding: "26px 20px",
                                minHeight: "170px",
                                boxShadow: "0 4px 12px rgba(0, 60, 100, 0.06)",
                                display: "flex",
                                flexDirection: "column"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        letterSpacing: "1.5px",
                                        textTransform: "uppercase",
                                        color: "#7890a6",
                                        marginBottom: "10px"
                                    },
                                    children: [
                                        t.module,
                                        " ",
                                        moduleNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        margin: 0,
                                        fontSize: "19px",
                                        lineHeight: 1.35,
                                        color: "#003f73"
                                    },
                                    children: [
                                        moduleNumber,
                                        ". ",
                                        title
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/modules/${moduleNumber}?lang=${lang}`,
                                    style: {
                                        display: "inline-block",
                                        marginTop: "auto",
                                        paddingTop: "16px",
                                        color: "#0067ad",
                                        fontWeight: 700,
                                        textDecoration: "none"
                                    },
                                    children: t.open
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, moduleNumber, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 141,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/content/course.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODULE_COUNT",
    ()=>MODULE_COUNT,
    "isModuleId",
    ()=>isModuleId,
    "modules",
    ()=>modules
]);
const modules = {
    RU: [
        "Введение в нейрофизиологию",
        "История изучения и методы исследования нервной системы",
        "Нейрон, нейроглия и микросреда нервной ткани",
        "Мембранные процессы и потенциал покоя",
        "Ионные каналы и потенциал действия",
        "Синапсы, нейромедиаторы и нейромодуляция",
        "Возбуждение и торможение",
        "Рефлекторная деятельность и нейронные сети",
        "Проводящие пути нервной системы",
        "Спинной мозг и спинальная регуляция",
        "Ствол мозга и ретикулярная формация",
        "Двигательные системы и контроль движений",
        "Мозжечок",
        "Таламус и таламо-кортикальные системы",
        "Гипоталамус и гомеостаз",
        "Лимбическая система, эмоции и мотивация",
        "Базальные ганглии",
        "Кора больших полушарий и функциональная организация мозга",
        "Сенсорные системы и боль",
        "Вегетативная нервная система",
        "Высшая нервная деятельность",
        "Нейрогуморальная регуляция, сон и биологические ритмы",
        "Пластичность, восстановление и патофизиология нервной системы"
    ],
    KZ: [
        "Нейрофизиологияға кіріспе",
        "Жүйке жүйесін зерттеу тарихы мен әдістері",
        "Нейрон, нейроглия және жүйке тінінің микроортасы",
        "Мембраналық процестер және тыныштық потенциалы",
        "Иондық арналар және әрекет потенциалы",
        "Синапстар, нейромедиаторлар және нейромодуляция",
        "Қозу және тежелу",
        "Рефлекстік қызмет және нейрондық желілер",
        "Жүйке жүйесінің өткізгіш жолдары",
        "Жұлын және жұлындық реттелу",
        "Ми сабауы және ретикулярлық формация",
        "Қозғалыс жүйелері және қозғалысты басқару",
        "Мишық",
        "Таламус және таламо-кортикалық жүйелер",
        "Гипоталамус және гомеостаз",
        "Лимбиялық жүйе, эмоциялар және мотивация",
        "Базальды ганглийлер",
        "Үлкен ми сыңарларының қыртысы және мидың функционалдық ұйымдасуы",
        "Сенсорлық жүйелер және ауырсыну",
        "Вегетативтік жүйке жүйесі",
        "Жоғары жүйке қызметі",
        "Нейрогуморальдық реттелу, ұйқы және биологиялық ырғақтар",
        "Жүйке жүйесінің пластикалығы, қалпына келуі және патофизиологиясы"
    ],
    EN: [
        "Introduction to Neurophysiology",
        "History and Methods of Nervous System Research",
        "Neurons, Neuroglia, and the Neural Microenvironment",
        "Membrane Processes and the Resting Membrane Potential",
        "Ion Channels and the Action Potential",
        "Synapses, Neurotransmitters, and Neuromodulation",
        "Excitation and Inhibition",
        "Reflex Activity and Neural Networks",
        "Neural Pathways",
        "Spinal Cord and Spinal Regulation",
        "Brainstem and Reticular Formation",
        "Motor Systems and Motor Control",
        "Cerebellum",
        "Thalamus and Thalamocortical Systems",
        "Hypothalamus and Homeostasis",
        "Limbic System, Emotion, and Motivation",
        "Basal Ganglia",
        "Cerebral Cortex and Functional Organization of the Brain",
        "Sensory Systems and Pain",
        "Autonomic Nervous System",
        "Higher Nervous Activity",
        "Neurohumoral Regulation, Sleep, and Biological Rhythms",
        "Neural Plasticity, Recovery, and Pathophysiology"
    ]
};
const MODULE_COUNT = modules.RU.length;
function isModuleId(id) {
    const number = Number(id);
    return Number.isInteger(number) && number >= 1 && number <= MODULE_COUNT && String(number) === id;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hbm6b8._.js.map