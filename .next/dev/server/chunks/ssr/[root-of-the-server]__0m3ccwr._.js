module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/modules/[id]/[section]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LessonContent.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CasesContent.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
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
        back: "← Назад к модулю",
        pending: "Материалы раздела готовятся.",
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
        back: "← Модульге оралу",
        pending: "Бөлім материалдары дайындалуда.",
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
        back: "← Back to module",
        pending: "Section materials are being prepared.",
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
async function SectionPage({ params, searchParams }) {
    const { id, section } = await params;
    const { lang: requestedLang } = await searchParams;
    const lang = requestedLang === "KZ" || requestedLang === "EN" ? requestedLang : "RU";
    const sectionIndex = sections.indexOf(section);
    if (!/^(?:[1-9]|1[0-9]|2[0-3])$/.test(id) || sectionIndex === -1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const t = text[lang];
    const lesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLesson"])(Number(id), section, lang);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "100vh",
            padding: "40px 20px",
            background: "#eef5fa"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            lang: lang === "KZ" ? "kk" : lang.toLowerCase(),
            style: {
                maxWidth: "900px",
                margin: "0 auto",
                padding: lesson ? "clamp(16px, 4vw, 32px)" : "32px",
                background: "white",
                borderRadius: "16px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: `/modules/${id}?lang=${lang}`,
                    style: {
                        color: "#004b87",
                        fontWeight: "bold"
                    },
                    children: t.back
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 33,
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
                            href: `/modules/${id}/${section}?lang=${code}`,
                            "aria-current": lang === code ? "page" : undefined,
                            children: code
                        }, code, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                lesson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        "kind" in lesson && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#526b80",
                                fontWeight: "bold"
                            },
                            children: lesson.moduleTitle
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 41,
                            columnNumber: 34
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                color: "#004b87",
                                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                                lineHeight: 1.3
                            },
                            children: lesson.title
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#526b80",
                                fontWeight: "bold"
                            },
                            children: t.sections[sectionIndex]
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        "kind" in lesson && lesson.kind === "cases" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            lesson: lesson
                        }, `${id}/${section}/${lang}`, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 44,
                            columnNumber: 60
                        }, this) : "kind" in lesson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/modules/${id}/theory?lang=${lang}`,
                                    children: lesson.ui.theory
                                }, void 0, false, {
                                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    lesson: lesson,
                                    language: lang
                                }, `${id}/${section}/${lang}`, false, {
                                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 45,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            lesson: lesson
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 49,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                color: "#004b87"
                            },
                            children: [
                                t.module,
                                " ",
                                id,
                                ": ",
                                t.sections[sectionIndex]
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: t.pending
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/modules/[id]/[section]/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/modules/[id]/[section]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/modules/[id]/[section]/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/CasesContent.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/CasesContent.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/CasesContent.tsx", "default");
}),
"[project]/components/CasesContent.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/CasesContent.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/CasesContent.tsx <module evaluation>", "default");
}),
"[project]/components/CasesContent.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/CasesContent.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/CasesContent.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/LessonContent.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "idea": "LessonContent-module__O06sTW__idea",
  "lesson": "LessonContent-module__O06sTW__lesson",
  "outcomes": "LessonContent-module__O06sTW__outcomes",
  "terms": "LessonContent-module__O06sTW__terms",
});
}),
"[project]/components/LessonContent.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/LessonContent.module.css [app-rsc] (css module)");
;
;
function Block({ block }) {
    switch(block.type){
        case "paragraph":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: block.text
            }, void 0, false, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 7,
                columnNumber: 14
            }, this);
        case "subheading":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: block.text
            }, void 0, false, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 9,
                columnNumber: 14
            }, this);
        case "list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: block.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: item
                    }, item, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 11,
                        columnNumber: 45
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 11,
                columnNumber: 14
            }, this);
        case "callout":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].idea,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: block.title
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 13,
                        columnNumber: 45
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: block.text
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 13,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 13,
                columnNumber: 14
            }, this);
    }
}
function LessonContent({ lesson }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].lesson,
        children: [
            lesson.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/components/LessonContent.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        section.blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Block, {
                                block: block
                            }, index, false, {
                                fileName: "[project]/components/LessonContent.tsx",
                                lineNumber: 23,
                                columnNumber: 49
                            }, this))
                    ]
                }, section.title, true, {
                    fileName: "[project]/components/LessonContent.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].outcomes,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: lesson.outcomes.title
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: lesson.outcomes.introduction
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: lesson.outcomes.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: item
                            }, item, false, {
                                fileName: "[project]/components/LessonContent.tsx",
                                lineNumber: 29,
                                columnNumber: 50
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].terms,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: lesson.terms.title
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: lesson.terms.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: item
                            }, item, false, {
                                fileName: "[project]/components/LessonContent.tsx",
                                lineNumber: 33,
                                columnNumber: 47
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/LessonContent.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LessonContent.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LessonContent.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/PracticeContent.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/PracticeContent.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/PracticeContent.tsx", "default");
}),
"[project]/components/PracticeContent.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/PracticeContent.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/PracticeContent.tsx <module evaluation>", "default");
}),
"[project]/components/PracticeContent.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/PracticeContent.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/content/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLesson",
    ()=>getLesson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/ru.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/kz.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/en.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/practice/ru.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/practice/kz.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/practice/en.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/cases/ru.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/cases/kz.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/cases/en.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
// Register each new module/section here; routes and rendering stay unchanged.
const lessons = {
    1: {
        theory: {
            RU: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            KZ: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            EN: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
        },
        practice: {
            RU: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            KZ: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            EN: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$practice$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
        },
        cases: {
            RU: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            KZ: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
            EN: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$cases$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
        }
    }
};
function getLesson(moduleId, section, language) {
    return lessons[moduleId]?.[section]?.[language];
}
}),
"[project]/content/modules/1/cases/en.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "cases",
    title: "Case studies. Introduction to neurophysiology",
    moduleTitle: "Module 1",
    introduction: "Analyse each situation, identify the connections between functional components of the nervous system, and explain the response mechanism. In multistage cases, additional information is revealed gradually. After developing your own solution, compare your reasoning with the explanation and mark the case as complete.",
    ui: {
        progress: "Case studies",
        completed: "completed",
        navigation: "Jump to a case",
        case: "Case",
        situation: "Situation",
        stage: "Stage",
        answer: "Your solution and reasoning",
        placeholder: "Explain how the events are connected and why this result occurs…",
        note: "Written responses are for comparison with the explanation and are not graded automatically. Responses and progress last until you reload the page or change the language.",
        next: "Show next stage",
        show: "Show explanation",
        hide: "Hide explanation",
        explanation: "Physiological explanation",
        complete: "Case completed",
        done: "Completed",
        check: "Check solution",
        reset: "Reset",
        undo: "Undo last step",
        available: "Select events in order",
        selected: "Your sequence",
        empty: "No events selected yet.",
        correct: "Correct. The sequence follows the transition from an electrical signal to chemical transmission and a postsynaptic response.",
        incorrect: "The order is not yet correct. Consider what triggers transmitter release and what must happen before postsynaptic receptors are activated. Try again or open the explanation.",
        incomplete: "Add every event before checking.",
        choose: "Select an explanation first.",
        gate: "First write your response to the questions in each revealed stage.",
        sequenceGate: "Complete and check your sequence to unlock the explanation.",
        choiceGate: "Write your reasoning, select an explanation, and check your solution to unlock the explanation.",
        diagram: "Functional pathway",
        sources: "Learning sources"
    },
    cases: [
        {
            id: "afferent",
            title: "The afferent component",
            situation: "During examination of a skin region, a stimulus acts on receptors, but information from them does not reach the central nervous system.",
            stages: [
                {
                    title: "Trace the information pathway",
                    questions: [
                        "Which functional component is impaired?",
                        "In which direction does information normally travel?",
                        "How does this situation differ from disruption of an efferent pathway?"
                    ]
                }
            ],
            explanation: [
                "The afferent component should be examined first: it carries sensory information from receptors towards the central nervous system (CNS). Applying a stimulus to the skin does not by itself establish that information has successfully reached central structures.",
                "Normally, a receptor converts stimulation into an electrical response, and sensory fibres carry information towards the spinal cord or brain. The peripheral portion of this pathway belongs to the peripheral nervous system.",
                "An efferent pathway disruption concerns transmission of a command from the CNS to an effector; sensory input may remain intact. The situation identifies a functional component to investigate, but does not establish a lesion site or clinical diagnosis. Intact receptor function also needs to be confirmed."
            ]
        },
        {
            id: "efferent",
            title: "The efferent component",
            situation: "Sensory information has reached the CNS and has been processed, but the effector organ has not received the appropriate neural command.",
            stages: [
                {
                    title: "From command to action",
                    questions: [
                        "Which component of the functional chain should be analysed?",
                        "Where does a signal travel along an efferent pathway?",
                        "How does an effector differ from an efferent pathway?"
                    ]
                }
            ],
            explanation: [
                "Analyse the efferent component: transmission of a control signal from the CNS towards a peripheral effector organ. Sensory input and central processing alone do not guarantee delivery of the command.",
                "The efferent pathway conducts the signal; the effector produces the response. For example, a motor nerve fibre conducts impulses towards skeletal muscle, whose fibres develop force following neuromuscular transmission. In other systems, smooth muscle or glands can act as effectors.",
                "Failure of a command to reach an organ differs from an inability of the organ itself to respond. Here the stated problem concerns command transmission; there is insufficient information to determine its specific cause."
            ]
        },
        {
            id: "withdrawal",
            title: "A protective reflex",
            situation: "A person accidentally touches a hot surface and rapidly withdraws their hand.",
            stages: [
                {
                    title: "Sensory input",
                    questions: [
                        "Identify the stimulus, receptor, and afferent component. How does information enter the CNS?"
                    ]
                },
                {
                    title: "Organising the movement",
                    data: "The arm begins to flex and contact with the hot surface ends. The movement requires coordinated muscle activity.",
                    questions: [
                        "Identify the central component, efferent pathway, effector, and response.",
                        "Why must the activity of muscles producing opposing movements be coordinated?"
                    ]
                },
                {
                    title: "Reflex action and awareness",
                    data: "The person then becomes aware of pain, evaluates the source of danger, and decides what to do next.",
                    questions: [
                        "Why can the protective response begin before a full conscious analysis of the stimulus?",
                        "What roles do the brain and ascending information pathways still have?"
                    ]
                }
            ],
            explanation: [
                "The stimulus is potentially damaging heat. Cutaneous nociceptive endings sensitive to this stimulus detect it, and afferent fibres carry the signal into the spinal cord.",
                "Spinal interneuronal networks link sensory input to motor neurons. Efferent motor fibres and neuromuscular synapses activate muscles that move the hand away. Coordinated excitation and inhibition, including reduced antagonist activity, help organise the movement.",
                "Spinal circuits can initiate the protective response without waiting for complete conscious analysis. Information also ascends to higher centres for pain perception and evaluation of the event. Descending brain pathways influence spinal circuits as well: a reflex does not imply that the brain is uninvolved."
            ]
        },
        {
            id: "feedback",
            title: "Feedback",
            situation: "A person tries to hold their arm in a particular position with their eyes closed. The limb position changes slightly over time, but the nervous system adjusts muscle activity.",
            stages: [
                {
                    title: "Regulation without visual monitoring",
                    questions: [
                        "Where does the nervous system obtain information about limb position?",
                        "Why is feedback necessary?",
                        "What happens to regulatory accuracy if this information is substantially reduced?"
                    ]
                }
            ],
            explanation: [
                "Proprioceptive information comes primarily from muscle spindles, which signal muscle length and its changes, and tendon organs, which are sensitive to tension. Joint and cutaneous receptors also contribute to estimates of limb position and movement.",
                "Sensory feedback reports the actual outcome of an action. Central networks use it together with the intended motor task to adjust muscle activity: deviations in position lead to changes in motor commands.",
                "Substantial loss of this input makes correction less accurate and deviations harder to detect and compensate for. Closing the eyes limits visual compensation but does not remove all other sensory and central mechanisms. This is a functional explanation, not a diagnosis."
            ]
        },
        {
            id: "excitation",
            title: "Excitation and inhibition",
            situation: "A precise movement requires activation of some neuronal groups while the activity of others is limited.",
            stages: [
                {
                    title: "Selectivity of neural control",
                    questions: [
                        "Why is activation alone insufficient for precise neural regulation?",
                        "What functional role does inhibition play?",
                        "Why is the balance of excitatory and inhibitory influences important for neural networks?"
                    ]
                }
            ],
            explanation: [
                "Indiscriminate activation could recruit competing motor programmes and muscles. A precise movement requires selection of the appropriate neuronal groups, an appropriate response magnitude, and coordinated timing.",
                "Excitatory influences generally increase the probability of an action potential, whereas inhibitory influences limit it and regulate signal transmission through the network. Inhibition is an active physiological process, not simply the absence of excitation.",
                "Their coordination restrains excessive activity and helps select relevant signals. For example, inhibitory circuits can reduce antagonist activity during movement. This balance is dynamic and depends on the task and network state; it does not mean equal numbers of excitatory and inhibitory signals."
            ]
        },
        {
            id: "synapse",
            title: "Synaptic transmission",
            situation: "An action potential has reached the presynaptic terminal of a chemical synapse. Reconstruct the causal sequence of signal transmission.",
            stages: [
                {
                    title: "From an electrical signal to chemical transmission",
                    questions: [
                        "Arrange the events in order: what must happen before each subsequent event?"
                    ]
                }
            ],
            interaction: {
                type: "sequence",
                steps: [
                    "Arrival of the action potential",
                    "Opening of voltage-gated Ca²⁺ channels",
                    "Ca²⁺ influx",
                    "Neurotransmitter exocytosis",
                    "Transmitter diffusion across the synaptic cleft",
                    "Binding to postsynaptic receptors",
                    "Change in postsynaptic conductance/potential"
                ]
            },
            explanation: [
                "Depolarisation of the presynaptic terminal opens voltage-gated calcium channels. Calcium entry triggers fusion of release-ready synaptic vesicles with the membrane and neurotransmitter exocytosis.",
                "The transmitter crosses the cleft and binds to receptors on the postsynaptic cell. Receptor activation changes ionic conductance directly or through intracellular mechanisms. The effect depends on receptor properties and ionic gradients; it is not necessarily excitatory and does not necessarily generate another action potential.",
                "If calcium entry is substantially reduced, transmitter release decreases even when an action potential arrives. This illustrates why the electrical event must engage the secretion mechanism before a postsynaptic response can occur."
            ]
        },
        {
            id: "integration",
            title: "Neural integration",
            situation: "Signals from several receptors arrive in the CNS simultaneously. Some influences favour a response, whereas others limit it.",
            stages: [
                {
                    title: "Explain the resulting response",
                    questions: [
                        "Why can the final response not be explained by a single input signal alone?",
                        "What does neural integration mean?",
                        "How do excitatory and inhibitory influences contribute to the final reaction?"
                    ]
                }
            ],
            interaction: {
                type: "choice",
                prompt: "Select the most accurate explanation.",
                options: [
                    {
                        text: "The strongest input signal always determines the result.",
                        correct: false,
                        feedback: "A strong input may matter, but its effect depends on other inputs, inhibition, and network state. Signal strength alone cannot explain the result."
                    },
                    {
                        text: "The CNS combines excitatory and inhibitory influences according to their timing, location, and the current state of neural networks.",
                        correct: true,
                        feedback: "Correct. Spatial and temporal interactions between inputs change neuronal activity, while connections between neurons organise a coordinated response. Integration is more than simply counting signals."
                    },
                    {
                        text: "Inhibition switches off the entire CNS and therefore does not contribute to the response.",
                        correct: false,
                        feedback: "Inhibitory influences act selectively and help shape the response. Limiting activity in particular circuits can help other circuits perform the required function."
                    },
                    {
                        text: "Each receptor independently specifies a complete motor command.",
                        correct: false,
                        feedback: "Receptors report stimuli. Transforming sensory input into coordinated commands requires central processing and interactions between neural networks."
                    }
                ]
            },
            explanation: [
                "Neural integration combines and transforms incoming signals within a neuron and a network. Input intensity, arrival time, synaptic location, and the cell's current state all matter.",
                "Excitatory and inhibitory synaptic influences jointly change the probability and pattern of firing. Consequently, the same sensory input can produce different responses when combined with different additional inputs.",
                "At the network level, coordinated activity across many neurons selects and adjusts the response. Treating a single input as its universal cause overlooks this organisation."
            ]
        },
        {
            id: "integrative",
            title: "An integrative case",
            situation: "A person walks over uneven ground, unexpectedly steps on a small object, adjusts their foot position, and maintains balance.",
            stages: [
                {
                    title: "What information enters the nervous system?",
                    questions: [
                        "Which changes do cutaneous receptors and proprioceptors detect?",
                        "What is the role of afferent pathways? Which other sensory systems help maintain balance?"
                    ]
                },
                {
                    title: "What happens in the CNS?",
                    data: "Pressure on the sole, muscle length, and muscle tension change together. Information about head position and the visual surroundings is also available to the nervous system.",
                    questions: [
                        "How does the CNS integrate these signals?",
                        "Why are coordinated excitatory and inhibitory influences needed to select a response?"
                    ]
                },
                {
                    title: "How is the motor response generated and adjusted?",
                    data: "Foot, leg, and trunk muscles change their activity, redistributing the load. Movement continues.",
                    questions: [
                        "Trace the command along efferent pathways towards the muscles acting as effectors.",
                        "How does sensory feedback help evaluate the result and make subsequent corrections?"
                    ]
                }
            ],
            explanation: [
                "Cutaneous receptors report contact and pressure; proprioceptors report muscle state and movement of body segments. Vestibular and visual signals supplement estimates of body position. Afferent pathways deliver this information to the CNS.",
                "Spinal and supraspinal networks, including brainstem and cerebellar mechanisms, combine sensory input with the ongoing motor task. Excitation and inhibition help coordinate muscle groups and scale the correction. Rapid responses work alongside subsequent conscious control.",
                "Efferent signals alter muscle-effector activity through motor fibres and neuromuscular transmission. Foot movement and changes in postural activity follow. New sensory input reports the result, allowing further correction. The diagram describes functional connections; many real processes occur in parallel and form closed control loops."
            ],
            diagram: [
                "Stimuli / environmental changes",
                "Receptors",
                "Afferent pathways",
                "CNS and integration",
                "Efferent pathways",
                "Effectors",
                "Response",
                "Sensory feedback",
                "Subsequent correction"
            ]
        }
    ],
    sources: [
        {
            title: "Neuroscience: Chemical Synapses",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK11009/"
        },
        {
            title: "Physiology, Withdrawal Response",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK544292/"
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/cases/kz.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "cases",
    title: "Ситуациялық тапсырмалар. Нейрофизиологияға кіріспе",
    moduleTitle: "Модуль 1",
    introduction: "Жағдайды талдап, жүйке жүйесінің функционалдық буындары арасындағы байланысты анықтаңыз және жауаптың механизмін түсіндіріңіз. Көп кезеңді тапсырмаларда қосымша мәліметтер біртіндеп ашылады. Өз шешіміңізді тұжырымдағаннан кейін оны талдаумен салыстырып, тапсырманың орындалғанын белгілеңіз.",
    ui: {
        progress: "Ситуациялық тапсырмалар",
        completed: "аяқталды",
        navigation: "Тапсырмаға жылдам өту",
        case: "Тапсырма",
        situation: "Жағдай",
        stage: "Кезең",
        answer: "Сіздің шешіміңіз және түсіндірмеңіз",
        placeholder: "Оқиғалардың өзара байланысын және нәтижесінің себебін түсіндіріңіз…",
        note: "Еркін жауап талдаумен өз бетінше салыстыруға арналған және автоматты түрде бағаланбайды. Жауаптар мен орындалу барысы бет жаңартылғанға немесе тіл ауыстырылғанға дейін ғана сақталады.",
        next: "Келесі кезеңді көрсету",
        show: "Талдауды көрсету",
        hide: "Талдауды жасыру",
        explanation: "Физиологиялық талдау",
        complete: "Тапсырма орындалды",
        done: "Орындалды",
        check: "Шешімді тексеру",
        reset: "Қалпына келтіру",
        undo: "Соңғы қадамды болдырмау",
        available: "Оқиғаларды ретімен таңдаңыз",
        selected: "Сіз құрастырған реттілік",
        empty: "Оқиғалар реттілігі әлі құрастырылған жоқ.",
        correct: "Дұрыс. Реттілік электрлік сигналдан химиялық берілуге, одан постсинапстық жауапқа өтуді көрсетеді.",
        incorrect: "Реттілік әзірше дұрыс емес. Медиатордың бөлінуін не іске қосатынын және постсинапстық рецепторлар белсенгенге дейін не болуы керектігін ойластырыңыз. Қайта орындаңыз немесе талдауды ашыңыз.",
        incomplete: "Тексеру алдында барлық оқиғаны қосыңыз.",
        choose: "Алдымен түсіндірмені таңдаңыз.",
        gate: "Алдымен ашылған әр кезеңнің сұрақтарына жауап жазыңыз.",
        sequenceGate: "Талдауды ашу үшін толық реттілікті құрастырып, тексеріңіз.",
        choiceGate: "Талдауды ашу үшін ойыңызды жазып, түсіндірмені таңдаңыз және шешімді тексеріңіз.",
        diagram: "Функционалдық сызба",
        sources: "Оқу дереккөздері"
    },
    cases: [
        {
            id: "afferent",
            title: "Афференттік буын",
            situation: "Терінің белгілі бір аймағын зерттеу кезінде тітіркендіргіш рецепторларға әсер етеді, бірақ олардан шығатын ақпарат орталық жүйке жүйесіне жетпейді.",
            stages: [
                {
                    title: "Ақпараттың өту жолын анықтаңыз",
                    questions: [
                        "Қай функционалдық буынның қызметі бұзылған?",
                        "Қалыпты жағдайда ақпарат қай бағытта беріледі?",
                        "Бұл жағдайдың эфференттік жол қызметінің бұзылуынан айырмашылығы қандай?"
                    ]
                }
            ],
            explanation: [
                "Ең алдымен афференттік буынды талдау қажет: ол сенсорлық ақпаратты рецепторлардан орталық жүйке жүйесіне (ОЖЖ) жеткізеді. Теріге әсердің болуы ақпараттың орталық құрылымдарға сәтті жеткенін өздігінен дәлелдемейді.",
                "Қалыпты жағдайда рецептор әсерді электрлік жауапқа түрлендіреді, ал сезгіш талшықтар ақпаратты жұлынға немесе миға өткізеді. Бұл жолдың шеткі бөлігі шеткі жүйке жүйесіне жатады.",
                "Эфференттік жол бұзылғанда мәселе ОЖЖ-ден атқарушы мүшеге пәрменнің берілуіне қатысты болады; сенсорлық ақпарат қалыпты түсуі мүмкін. Берілген мәліметтер талданатын функционалдық буынды анықтауға мүмкіндік береді, бірақ зақымның орнын немесе клиникалық диагнозды белгілеуге жеткіліксіз. Рецептор қызметінің сақталғанын да растау қажет."
            ]
        },
        {
            id: "efferent",
            title: "Эфференттік буын",
            situation: "Сенсорлық ақпарат ОЖЖ-ге түсіп, өңделді, алайда атқарушы мүше тиісті жүйкелік пәрменді алған жоқ.",
            stages: [
                {
                    title: "Пәрменнен әрекетке дейін",
                    questions: [
                        "Функционалдық тізбектің қай буынын талдау қажет?",
                        "Эфференттік жолмен сигнал қайда бағытталады?",
                        "Эффектордың эфференттік жолдан айырмашылығы қандай?"
                    ]
                }
            ],
            explanation: [
                "Эфференттік буынды, яғни басқарушы сигналдың ОЖЖ-ден шеткі атқарушы мүшеге берілуін талдау қажет. Сенсорлық кірістің және орталық өңдеудің болуы пәрменнің мүшеге жеткізілуіне өздігінен кепілдік бермейді.",
                "Эфференттік жол сигналды өткізеді, ал эффектор жауапты жүзеге асырады. Мысалы, қозғалтқыш жүйке талшығы импульстерді қаңқа бұлшықетіне жеткізеді; жүйке-бұлшықеттік берілуден кейін бұлшықет талшықтары күш өндіреді. Басқа жүйелерде бірыңғай салалы бұлшықеттер немесе бездер эффектор бола алады.",
                "Мүшеге пәрменнің жетпеуі мен мүшенің өздігінен жауап бере алмауы — әртүрлі функционалдық жағдайлар. Бұл тапсырмада мәселе пәрменнің берілуіне қатысты; бұзылыстың нақты себебін анықтауға мәлімет жеткіліксіз."
            ]
        },
        {
            id: "withdrawal",
            title: "Қорғаныш рефлексі",
            situation: "Адам абайсызда ыстық беткейге тиіп кетіп, қолын тез тартып алады.",
            stages: [
                {
                    title: "Сенсорлық кіріс",
                    questions: [
                        "Тітіркендіргішті, рецепторды және афференттік буынды атаңыз. Ақпарат ОЖЖ-ге қалай түседі?"
                    ]
                },
                {
                    title: "Қозғалысты ұйымдастыру",
                    data: "Қол бүгіле бастайды, ыстық беткеймен жанасу тоқтайды. Қозғалыс үшін бұлшықеттердің үйлесімді қызметі қажет.",
                    questions: [
                        "Орталық буынды, эфференттік жолды, эффекторды және жауапты анықтаңыз.",
                        "Қарама-қарсы қозғалыстарды орындайтын бұлшықеттердің белсенділігі неліктен үйлесуі керек?"
                    ]
                },
                {
                    title: "Рефлекс және саналы қабылдау",
                    data: "Одан кейін адам ауырсынуды сезінеді, қауіп көзін бағалайды және әрі қарай не істеу керектігін шешеді.",
                    questions: [
                        "Неліктен қорғаныш реакциясы тітіркендіргіш толық саналы талданғанға дейін басталуы мүмкін?",
                        "Ми мен ақпараттың жоғары бағытта берілуі қандай рөл атқарады?"
                    ]
                }
            ],
            explanation: [
                "Тітіркендіргіш — тінге зақым келтіруі ықтимал жылулық әсер. Оны осы әсерге сезімтал терінің ноцицептивтік жүйке ұштары қабылдайды. Афференттік талшықтар сигналды жұлынға жеткізеді.",
                "Жұлынның аралық нейрондар желілері сенсорлық кірісті мотонейрондармен байланыстырады. Эфференттік қозғалтқыш талшықтар мен жүйке-бұлшықеттік синапстар арқылы қолды әсер көзінен әкететін бұлшықеттер белсенеді. Қозу мен тежелудің үйлесуі, соның ішінде антагонистер белсенділігінің шектелуі, ұйымдасқан жауапты қамтамасыз етеді.",
                "Бастапқы қорғаныш жауабы толық саналы талдауды күтпей, жұлындық тізбектер арқылы іске қосылуы мүмкін. Сонымен қатар ақпарат өрлеме жолдармен жоғары бөлімдерге жеткізіліп, ауырсынуды қабылдауға және жағдайды бағалауға қатысады. Ми төмендеуші жолдар арқылы жұлын желілеріне де ықпал етеді: рефлекс мидың қатыспайтынын білдірмейді."
            ]
        },
        {
            id: "feedback",
            title: "Кері байланыс",
            situation: "Адам көзін жұмып, қолын белгілі бір қалыпта ұстап тұруға тырысады. Аяқ-қолдың қалпы үнемі аздап өзгергенімен, жүйке жүйесі бұлшықеттердің белсенділігін түзетіп отырады.",
            stages: [
                {
                    title: "Көру бақылауынсыз реттеу",
                    questions: [
                        "Жүйке жүйесі аяқ-қолдың қалпы туралы ақпаратты қайдан алады?",
                        "Кері байланыс не үшін қажет?",
                        "Мұндай ақпараттың түсуі едәуір бұзылғанда реттеу дәлдігі қалай өзгереді?"
                    ]
                }
            ],
            explanation: [
                "Проприоцептивтік ақпарат негізінен бұлшықет ұзындығы мен оның өзгерістерін хабарлайтын бұлшықет ұршықтарынан және керілуге сезімтал сіңірлік мүшелерден түседі. Буын және тері рецепторлары да аяқ-қолдың қалпы мен қозғалысын бағалауға қатысады.",
                "Сенсорлық кері байланыс әрекеттің нақты нәтижесі туралы мәлімет береді. Орталық желілер бұл ақпаратты қозғалыс міндетімен бірге пайдаланып, бұлшықеттердің белсенділігін түзетеді: қалыптың ауытқуы басқарушы ықпалдардың өзгеруіне әкеледі.",
                "Мұндай кіріс едәуір азайса, түзету дәлдігі төмендейді, ауытқуларды анықтау мен өтеу қиындайды. Көзді жұму көру арқылы өтемдеуді шектейді, бірақ қалған барлық сенсорлық және орталық механизмдерді жоймайды. Бұл — функционалдық түсіндірме, диагноз емес."
            ]
        },
        {
            id: "excitation",
            title: "Қозу және тежелу",
            situation: "Дәл қозғалысты орындау үшін нейрондардың бір топтарын белсендіріп, сол мезетте басқа топтардың белсенділігін шектеу қажет.",
            stages: [
                {
                    title: "Жүйкелік реттеудің таңдамалылығы",
                    questions: [
                        "Неліктен дәл жүйкелік реттеу үшін тек белсендіру жеткіліксіз?",
                        "Тежелудің функционалдық рөлі қандай?",
                        "Қоздырушы және тежеуші ықпалдардың теңгерімі нейрондық желілер үшін неліктен маңызды?"
                    ]
                }
            ],
            explanation: [
                "Белсенділіктің таңдамай күшеюі өзара бәсекелес қозғалыс бағдарламалары мен бұлшықеттерді іске қосуы мүмкін. Дәл қозғалыс тиісті нейрондық топтарды таңдауды, жауап күшін сәйкестендіруді және олардың жұмыс уақытын үйлестіруді талап етеді.",
                "Қоздырушы ықпалдар әдетте әрекет потенциалының пайда болу ықтималдығын арттырады, ал тежеуші ықпалдар оны шектеп, желідегі сигналдардың берілуін реттейді. Тежелу — қозудың жай ғана болмауы емес, белсенді физиологиялық үдеріс.",
                "Осы ықпалдардың үйлесуі шамадан тыс белсенділікті шектеп, маңызды сигналдарды бөліп көрсетуге көмектеседі. Мысалы, қозғалыс кезінде тежеуші тізбектер антагонистердің белсенділігін төмендете алады. Теңгерім динамикалық сипатта болады: ол міндет пен желі күйіне тәуелді және қоздырушы, тежеуші сигналдар санының теңдігін білдірмейді."
            ]
        },
        {
            id: "synapse",
            title: "Синапстық берілу",
            situation: "Әрекет потенциалы химиялық синапстың пресинапстық ұшына жетті. Сигнал берілуінің себеп-салдарлық реттілігін қалпына келтіріңіз.",
            stages: [
                {
                    title: "Электрлік сигналдан химиялық берілуге дейін",
                    questions: [
                        "Оқиғаларды ретімен орналастырыңыз: әрбір келесі оқиғаның алдында не болуы керек?"
                    ]
                }
            ],
            interaction: {
                type: "sequence",
                steps: [
                    "Әрекет потенциалының келуі",
                    "Потенциалға тәуелді Ca²⁺ арналарының ашылуы",
                    "Ca²⁺ иондарының ішке енуі",
                    "Нейромедиатордың экзоцитозы",
                    "Медиатордың синапстық саңылау арқылы диффузиясы",
                    "Постсинапстық рецепторлармен байланысу",
                    "Постсинапстық өткізгіштіктің/потенциалдың өзгеруі"
                ]
            },
            explanation: [
                "Пресинапстық ұштың деполяризациясы потенциалға тәуелді кальций арналарын ашады. Ca²⁺ иондарының енуі бөлінуге дайын синапстық көпіршіктердің мембранамен қосылуын және нейромедиатордың экзоцитозын іске қосады.",
                "Медиатор синапстық саңылаудан өтіп, постсинапстық жасушаның рецепторларымен байланысады. Олардың белсенуі иондық өткізгіштікті тікелей немесе жасушаішілік механизмдер арқылы өзгертеді. Нәтиже рецептор мен иондық градиенттерге тәуелді; ол міндетті түрде қоздырушы болмайды және әрдайым жаңа әрекет потенциалын туындатпайды.",
                "Ca²⁺ енуі едәуір шектелсе, әрекет потенциалы келгеннің өзінде медиатордың бөлінуі азаяды. Бұл постсинапстық жауап пайда болғанға дейін электрлік оқиғаның секреция механизмімен байланысуы неліктен қажет екенін көрсетеді."
            ]
        },
        {
            id: "integration",
            title: "Жүйкелік ақпараттың интеграциясы",
            situation: "ОЖЖ-ге бірнеше рецептордан сигналдар бір мезгілде түседі. Кейбір ықпалдар жауаптың қалыптасуына көмектеседі, ал басқалары оны шектейді.",
            stages: [
                {
                    title: "Қорытынды реакцияны түсіндіріңіз",
                    questions: [
                        "Неліктен қорытынды жауапты тек бір кіріс сигналының әсерімен түсіндіруге болмайды?",
                        "Жүйкелік ақпараттың интеграциясы нені білдіреді?",
                        "Қоздырушы және тежеуші ықпалдар қорытынды реакцияның қалыптасуына қалай қатысады?"
                    ]
                }
            ],
            interaction: {
                type: "choice",
                prompt: "Ең дұрыс түсіндірмені таңдаңыз.",
                options: [
                    {
                        text: "Қорытынды нәтижені әрқашан ең күшті кіріс сигналы анықтайды.",
                        correct: false,
                        feedback: "Күшті кіріс маңызды болуы мүмкін, бірақ оның әсері басқа кірістерге, тежелуге және желінің күйіне тәуелді. Нәтижені түсіндіру үшін сигналдың күші ғана жеткіліксіз."
                    },
                    {
                        text: "ОЖЖ қоздырушы және тежеуші ықпалдарды олардың уақытын, орнын және нейрондық желілердің ағымдағы күйін ескере отырып біріктіреді.",
                        correct: true,
                        feedback: "Дұрыс. Кірістердің кеңістіктік және уақыттық өзара әсері нейрондардың белсенділігін өзгертеді, ал нейронаралық байланыстар үйлесімді реакцияны қалыптастырады. Интеграция сигналдарды жай санаумен шектелмейді."
                    },
                    {
                        text: "Тежелу бүкіл ОЖЖ-ні өшіреді, сондықтан жауаптың қалыптасуына қатыспайды.",
                        correct: false,
                        feedback: "Тежеуші ықпалдар таңдамалы әсер етіп, жауапты реттеуге қатысады. Белгілі бір тізбектердің белсенділігін шектеу басқа тізбектердің қажетті қызметті орындауына көмектеседі."
                    },
                    {
                        text: "Әр рецептор дайын қозғалыс пәрменін дербес анықтайды.",
                        correct: false,
                        feedback: "Рецепторлар әсерлер туралы ақпарат береді. Сенсорлық кірісті үйлесімді пәрмендерге айналдыру орталық өңдеуді және нейрондық желілердің өзара әрекеттесуін талап етеді."
                    }
                ]
            },
            explanation: [
                "Жүйкелік ақпараттың интеграциясы — нейрон мен желіге түсетін сигналдарды біріктіру және түрлендіру. Кірістің қарқындылығымен қатар оның түсу уақыты, синапстық байланыстың орны және жасушаның ағымдағы күйі маңызды.",
                "Қоздырушы және тежеуші синапстық ықпалдар импульстердің пайда болу ықтималдығы мен сипатын бірлесіп өзгертеді. Сондықтан бірдей сенсорлық кіріс басқа кірістердің әртүрлі үйлесімінде әртүрлі реакция туындатуы мүмкін.",
                "Желі деңгейінде көптеген нейрондардың үйлесімді белсенділігі жауапты таңдауды және реттеуді қамтамасыз етеді. Жалғыз сигналды әмбебап себеп деп қарастыру осы ұйымдасуды ескермейді."
            ]
        },
        {
            id: "integrative",
            title: "Интегративтік тапсырма",
            situation: "Адам тегіс емес жермен жүріп келе жатып, күтпеген жерден шағын затты басып кетеді, табанының қалпын өзгертеді және тепе-теңдігін сақтайды.",
            stages: [
                {
                    title: "Жүйке жүйесіне қандай ақпарат түседі?",
                    questions: [
                        "Тері рецепторлары мен проприорецепторлар қандай өзгерістерді қабылдайды?",
                        "Афференттік жолдардың рөлі қандай? Тепе-теңдікті сақтауға тағы қандай сенсорлық жүйелер көмектеседі?"
                    ]
                },
                {
                    title: "ОЖЖ-де ақпаратпен не болады?",
                    data: "Табанға түсетін қысым, бұлшықеттердің ұзындығы мен керілуі бір мезгілде өзгерді. Жүйке жүйесіне бастың қалпы және көзге көрінетін орта туралы ақпарат та қолжетімді.",
                    questions: [
                        "ОЖЖ осы сигналдарды қалай біріктіреді?",
                        "Жауапты таңдау үшін қоздырушы және тежеуші ықпалдардың үйлесуі неліктен қажет?"
                    ]
                },
                {
                    title: "Қозғалыс жауабы қалай қалыптасады және түзетіледі?",
                    data: "Табан, сирақ және тұлға бұлшықеттерінің белсенділігі өзгеріп, жүктеме қайта бөлінді. Қозғалыс жалғасуда.",
                    questions: [
                        "Пәрменнің эфференттік жолдар арқылы эффектор ретіндегі бұлшықеттерге берілуін сипаттаңыз.",
                        "Сенсорлық кері байланыс нәтижені бағалауға және кейінгі түзетуге қалай көмектеседі?"
                    ]
                }
            ],
            explanation: [
                "Тері рецепторлары жанасу мен қысым туралы, ал проприорецепторлар бұлшықеттердің күйі және дене бөліктерінің қозғалысы туралы сигнал береді. Вестибулярлық және көру сигналдары дене қалпын бағалауды толықтырады. Афференттік жолдар осы мәліметтерді ОЖЖ-ге жеткізеді.",
                "Жұлындық және жұлынүстілік желілер, соның ішінде ми бағаны мен мишық механизмдері, сенсорлық кірісті ағымдағы қозғалыс міндетімен біріктіреді. Қозу мен тежелу бұлшықет топтарын және түзету шамасын үйлестіруге көмектеседі; жылдам реакциялар кейінгі саналы басқарумен ұштасады.",
                "Эфференттік сигналдар қозғалтқыш талшықтар мен жүйке-бұлшықеттік берілу арқылы бұлшықет-эффекторлардың белсенділігін өзгертеді. Табан қозғалып, дене қалпын ұстайтын бұлшықеттердің белсенділігі қайта бөлінеді. Жаңа сенсорлық кіріс нәтиже туралы хабарлап, түзетуді жалғастыруға мүмкіндік береді. Сызба функционалдық байланыстарды көрсетеді; нақты жүйеде көптеген үдеріс қатар жүріп, тұйық реттеу контурларын құрайды."
            ],
            diagram: [
                "Тітіркендіргіштер / орта өзгерістері",
                "Рецепторлар",
                "Афференттік жолдар",
                "ОЖЖ және интеграция",
                "Эфференттік жолдар",
                "Эффекторлар",
                "Жауап",
                "Сенсорлық кері байланыс",
                "Кейінгі түзету"
            ]
        }
    ],
    sources: [
        {
            title: "Neuroscience: Chemical Synapses",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK11009/"
        },
        {
            title: "Physiology, Withdrawal Response",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK544292/"
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/cases/ru.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "cases",
    title: "Ситуационные задачи. Введение в нейрофизиологию",
    moduleTitle: "Модуль 1",
    introduction: "Проанализируйте ситуацию, определите связи между звеньями нервной системы и объясните механизм ответа. В многоэтапных задачах новые данные открываются постепенно. После собственного решения сравните рассуждение с разбором и отметьте задачу как выполненную.",
    ui: {
        progress: "Ситуационные задачи",
        completed: "завершено",
        navigation: "Быстрый переход к задаче",
        case: "Задача",
        situation: "Ситуация",
        stage: "Этап",
        answer: "Ваше решение и объяснение",
        placeholder: "Объясните, как связаны события и почему возникает такой результат…",
        note: "Свободный ответ предназначен для самостоятельного сравнения с разбором и не оценивается автоматически. Ответы и прогресс сохраняются только до перезагрузки страницы или смены языка.",
        next: "Показать следующий этап",
        show: "Показать разбор",
        hide: "Скрыть разбор",
        explanation: "Физиологический разбор",
        complete: "Задача выполнена",
        done: "Выполнено",
        check: "Проверить решение",
        reset: "Сбросить",
        undo: "Отменить последний шаг",
        available: "Выберите события по порядку",
        selected: "Ваша последовательность",
        empty: "Последовательность пока не составлена.",
        correct: "Верно. Последовательность отражает переход от электрического сигнала к химической передаче и постсинаптическому ответу.",
        incorrect: "Порядок пока неверен. Подумайте, какое событие запускает выделение медиатора и что должно произойти до активации постсинаптических рецепторов. Попробуйте снова или откройте разбор.",
        incomplete: "Добавьте все события перед проверкой.",
        choose: "Сначала выберите объяснение.",
        gate: "Сначала сформулируйте ответ на вопросы каждого открытого этапа.",
        sequenceGate: "Составьте полную последовательность и проверьте её, чтобы открыть разбор.",
        choiceGate: "Запишите рассуждение, выберите объяснение и проверьте решение, чтобы открыть разбор.",
        diagram: "Функциональная схема",
        sources: "Учебные источники"
    },
    cases: [
        {
            id: "afferent",
            title: "Афферентное звено",
            situation: "При исследовании определённого участка кожи раздражитель действует на рецепторы, однако информация от них не достигает центральной нервной системы.",
            stages: [
                {
                    title: "Проследите путь информации",
                    questions: [
                        "Какое функциональное звено нарушено?",
                        "В каком направлении в норме передаётся информация?",
                        "Чем эта ситуация отличается от нарушения эфферентного пути?"
                    ]
                }
            ],
            explanation: [
                "В первую очередь следует анализировать афферентное звено: оно передаёт сенсорную информацию от рецепторов к центральной нервной системе (ЦНС). Воздействие на кожу ещё не означает, что информация успешно достигла центральных структур.",
                "В норме рецептор преобразует воздействие в электрический ответ, а чувствительные волокна проводят информацию к спинному или головному мозгу. Периферическая часть этого пути относится к периферической нервной системе.",
                "При нарушении эфферентного пути проблема относится к передаче команды от ЦНС к исполнительному органу: сенсорная информация при этом может поступать нормально. По условию можно определить функциональное звено для анализа, но нельзя установить место повреждения или клинический диагноз; также необходимо подтвердить сохранность рецепции."
            ]
        },
        {
            id: "efferent",
            title: "Эфферентное звено",
            situation: "Сенсорная информация поступила в ЦНС и была обработана, но исполнительный орган не получил соответствующую нервную команду.",
            stages: [
                {
                    title: "От команды к действию",
                    questions: [
                        "Какое звено функциональной цепи следует анализировать?",
                        "Куда направляется сигнал по эфферентному пути?",
                        "Чем эффектор отличается от эфферентного пути?"
                    ]
                }
            ],
            explanation: [
                "Следует анализировать эфферентное звено — передачу управляющего сигнала от ЦНС к периферическому исполнительному органу. Наличие сенсорного входа и центральной обработки само по себе не гарантирует доставки команды.",
                "Эфферентный путь проводит сигнал, а эффектор выполняет ответ. Например, двигательное нервное волокно проводит импульсы к скелетной мышце, а мышечные волокна после нервно-мышечной передачи развивают силу. В других системах эффекторами могут быть гладкие мышцы или железы.",
                "Отсутствие команды у органа и неспособность самого органа ответить — разные функциональные ситуации. Здесь условие указывает на передачу команды; данных для определения конкретной причины нарушения недостаточно."
            ]
        },
        {
            id: "withdrawal",
            title: "Защитный рефлекс",
            situation: "Человек случайно касается горячей поверхности и быстро отдёргивает руку.",
            stages: [
                {
                    title: "Сенсорный вход",
                    questions: [
                        "Назовите раздражитель, рецептор и афферентное звено. Как информация поступает в ЦНС?"
                    ]
                },
                {
                    title: "Организация движения",
                    data: "Рука начинает сгибаться, контакт с горячей поверхностью прекращается. Для движения требуется согласованная работа мышц.",
                    questions: [
                        "Определите центральное звено, эфферентный путь, эффектор и ответ.",
                        "Почему активность мышц, выполняющих противоположные движения, должна быть согласована?"
                    ]
                },
                {
                    title: "Рефлекс и осознание",
                    data: "Человек затем осознаёт боль, оценивает источник опасности и решает, как действовать дальше.",
                    questions: [
                        "Почему защитная реакция может начаться до полного осознанного анализа раздражителя?",
                        "Какую роль сохраняют головной мозг и восходящая передача информации?"
                    ]
                }
            ],
            explanation: [
                "Раздражитель — потенциально повреждающее тепловое воздействие. Его воспринимают чувствительные к такому воздействию ноцицептивные окончания кожи. Афферентные волокна передают сигнал в спинной мозг.",
                "Спинальные сети вставочных нейронов связывают сенсорный вход с мотонейронами. Через эфферентные двигательные волокна и нервно-мышечные синапсы активируются мышцы, отводящие руку от источника воздействия. Согласование возбуждения и торможения, включая ограничение активности антагонистов, обеспечивает организованный ответ.",
                "Начальный защитный ответ может запускаться спинальными цепями без ожидания полного осознанного анализа. Одновременно информация по восходящим путям передаётся в вышележащие отделы для восприятия боли и оценки ситуации. Головной мозг также влияет на спинальные сети нисходящими путями: рефлекс не означает отсутствия участия мозга."
            ]
        },
        {
            id: "feedback",
            title: "Обратная связь",
            situation: "Человек пытается удерживать руку в определённом положении с закрытыми глазами. Положение конечности постоянно немного изменяется, однако нервная система корректирует активность мышц.",
            stages: [
                {
                    title: "Регуляция без зрительного контроля",
                    questions: [
                        "Откуда нервная система получает информацию о положении конечности?",
                        "Зачем необходима обратная связь?",
                        "Что произойдёт с точностью регуляции при существенном нарушении поступления такой информации?"
                    ]
                }
            ],
            explanation: [
                "Проприоцептивная информация поступает прежде всего от мышечных веретён, сигнализирующих о длине мышц и её изменениях, и сухожильных органов, чувствительных к натяжению. Информация от суставных и кожных рецепторов также помогает оценивать положение и движение конечности.",
                "Сенсорная обратная связь сообщает о фактическом результате действия. Центральные сети используют её вместе с двигательной задачей для коррекции активности мышц: отклонение положения вызывает изменение управляющих влияний.",
                "При существенном уменьшении такого входа коррекция становится менее точной, а отклонения труднее обнаружить и компенсировать. Закрытые глаза ограничивают зрительную компенсацию, но не выключают все остальные сенсорные и центральные механизмы. Это функциональное объяснение, а не диагноз."
            ]
        },
        {
            id: "excitation",
            title: "Возбуждение и торможение",
            situation: "Для выполнения точного движения необходимо активировать одни группы нейронов и одновременно ограничить активность других.",
            stages: [
                {
                    title: "Избирательность нервной регуляции",
                    questions: [
                        "Почему одной активации недостаточно для точной нервной регуляции?",
                        "Какую функциональную роль играет торможение?",
                        "Почему баланс возбуждающих и тормозных влияний важен для нейронных сетей?"
                    ]
                }
            ],
            explanation: [
                "Неспецифическое усиление активности могло бы вовлечь конкурирующие двигательные программы и мышцы. Точное движение требует отбора нужных нейронных групп, соответствующей силы ответа и согласованного времени их работы.",
                "Возбуждающие влияния обычно повышают вероятность генерации потенциала действия, а тормозные ограничивают её и регулируют передачу сигналов в сети. Торможение — активный физиологический процесс, а не просто отсутствие возбуждения.",
                "Согласование этих влияний позволяет ограничивать избыточную активность и выделять значимые сигналы. Например, при движении тормозные цепи могут снижать активность антагонистов. Баланс динамичен: он зависит от задачи и состояния сети и не означает равенства числа возбуждающих и тормозных сигналов."
            ]
        },
        {
            id: "synapse",
            title: "Синаптическая передача",
            situation: "Потенциал действия достиг пресинаптического окончания химического синапса. Восстановите причинную последовательность передачи сигнала.",
            stages: [
                {
                    title: "От электрического сигнала к химическому",
                    questions: [
                        "Расположите события по порядку: что должно произойти перед каждым следующим событием?"
                    ]
                }
            ],
            interaction: {
                type: "sequence",
                steps: [
                    "Приход потенциала действия",
                    "Открытие потенциал-зависимых Ca²⁺-каналов",
                    "Вход Ca²⁺",
                    "Экзоцитоз нейромедиатора",
                    "Диффузия медиатора через синаптическую щель",
                    "Связывание с постсинаптическими рецепторами",
                    "Изменение постсинаптической проводимости/потенциала"
                ]
            },
            explanation: [
                "Деполяризация пресинаптического окончания открывает потенциал-зависимые кальциевые каналы. Вход Ca²⁺ запускает слияние готовых к выделению синаптических везикул с мембраной и экзоцитоз нейромедиатора.",
                "Медиатор проходит через синаптическую щель и связывается с рецепторами постсинаптической клетки. Их активация изменяет ионную проводимость непосредственно либо через внутриклеточные механизмы. Результат зависит от рецептора и ионных градиентов; он не обязательно возбуждающий и не обязательно вызывает новый потенциал действия.",
                "Если существенно ограничить вход Ca²⁺, выделение медиатора уменьшится даже при приходе потенциала действия. Это показывает, почему электрическое событие должно быть связано с механизмом секреции, прежде чем возникнет постсинаптический ответ."
            ]
        },
        {
            id: "integration",
            title: "Интеграция информации",
            situation: "В ЦНС одновременно поступают сигналы от нескольких рецепторов. Некоторые влияния способствуют формированию ответа, другие ограничивают его.",
            stages: [
                {
                    title: "Объясните итоговую реакцию",
                    questions: [
                        "Почему итоговый ответ нельзя объяснить действием только одного входного сигнала?",
                        "Что означает интеграция нервной информации?",
                        "Как возбуждающие и тормозные влияния участвуют в формировании итоговой реакции?"
                    ]
                }
            ],
            interaction: {
                type: "choice",
                prompt: "Выберите наиболее корректное объяснение.",
                options: [
                    {
                        text: "Итог всегда определяется самым сильным входным сигналом.",
                        correct: false,
                        feedback: "Сильный вход может быть значимым, но его действие зависит от других входов, торможения и состояния сети. Одной силы сигнала недостаточно для объяснения результата."
                    },
                    {
                        text: "ЦНС объединяет возбуждающие и тормозные влияния с учётом их времени, места и текущего состояния нейронных сетей.",
                        correct: true,
                        feedback: "Верно. Пространственное и временное взаимодействие входов меняет активность нейронов, а связи между ними формируют согласованную реакцию. Интеграция не сводится к простому подсчёту сигналов."
                    },
                    {
                        text: "Торможение выключает всю ЦНС, поэтому в формировании ответа оно не участвует.",
                        correct: false,
                        feedback: "Тормозные влияния действуют избирательно и участвуют в настройке ответа. Ограничение активности определённых цепей помогает другим цепям выполнять нужную функцию."
                    },
                    {
                        text: "Каждый рецептор независимо задаёт готовую двигательную команду.",
                        correct: false,
                        feedback: "Рецепторы передают информацию о воздействиях. Преобразование сенсорного входа в согласованные команды требует центральной обработки и взаимодействия нейронных сетей."
                    }
                ]
            },
            explanation: [
                "Интеграция нервной информации — объединение и преобразование поступающих сигналов в нейроне и сети. Значимы не только интенсивность входа, но и время его поступления, место синаптического контакта и текущее состояние клетки.",
                "Возбуждающие и тормозные синаптические влияния совместно меняют вероятность и характер разрядов. Поэтому одинаковый сенсорный вход при разных сочетаниях других входов может приводить к различным реакциям.",
                "На уровне сети согласованная активность множества нейронов обеспечивает выбор и настройку ответа. Утверждение о единственном сигнале как универсальной причине упускает эту организацию."
            ]
        },
        {
            id: "integrative",
            title: "Интегративная задача",
            situation: "Человек идёт по неровной поверхности, неожиданно наступает на небольшой предмет, изменяет положение стопы и сохраняет равновесие.",
            stages: [
                {
                    title: "Какая информация поступает?",
                    questions: [
                        "Какие изменения воспринимают кожные рецепторы и проприорецепторы?",
                        "Какова роль афферентных путей? Какие другие сенсорные системы помогают сохранять равновесие?"
                    ]
                },
                {
                    title: "Что происходит в ЦНС?",
                    data: "Одновременно изменились давление на подошву, длина и натяжение мышц. Информация о положении головы и зрительном окружении также доступна нервной системе.",
                    questions: [
                        "Как ЦНС интегрирует эти сигналы?",
                        "Почему для выбора ответа нужны согласованные возбуждающие и тормозные влияния?"
                    ]
                },
                {
                    title: "Как формируется и корректируется ответ?",
                    data: "Мышцы стопы, голени и туловища изменили активность; распределение нагрузки стало другим. Движение продолжается.",
                    questions: [
                        "Проследите передачу команды по эфферентным путям к мышцам как эффекторам.",
                        "Как сенсорная обратная связь помогает оценить результат и выполнить последующую коррекцию?"
                    ]
                }
            ],
            explanation: [
                "Кожные рецепторы сигнализируют о контакте и давлении, проприорецепторы — о состоянии мышц и движении сегментов тела. Вестибулярные и зрительные сигналы дополняют оценку положения тела. Афферентные пути доставляют эти сведения в ЦНС.",
                "Спинальные и надспинальные сети, включая стволовые и мозжечковые механизмы, объединяют сенсорный вход с текущей двигательной задачей. Возбуждение и торможение помогают согласовать мышечные группы и масштаб коррекции; быстрые реакции сочетаются с дальнейшим осознанным управлением.",
                "Эфферентные сигналы через двигательные волокна и нервно-мышечную передачу изменяют активность мышц-эффекторов. Возникает движение стопы и перераспределение позной активности. Новый сенсорный вход сообщает о результате, позволяя продолжать коррекцию. Схема описывает функциональные связи; в реальной системе многие процессы идут параллельно и образуют замкнутые контуры."
            ],
            diagram: [
                "Раздражители / изменения среды",
                "Рецепторы",
                "Афферентные пути",
                "ЦНС и интеграция",
                "Эфферентные пути",
                "Эффекторы",
                "Ответ",
                "Сенсорная обратная связь",
                "Последующая коррекция"
            ]
        }
    ],
    sources: [
        {
            title: "Neuroscience: Chemical Synapses",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK11009/"
        },
        {
            title: "Physiology, Withdrawal Response",
            href: "https://www.ncbi.nlm.nih.gov/books/NBK544292/"
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/practice/en.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "practice",
    title: "Practical Lesson. Introduction to Neurophysiology",
    moduleTitle: "Module 1. Introduction",
    ui: {
        showAnswer: "Show answers and explanations",
        check: "Check sequence",
        reset: "Start again",
        undo: "Remove last step",
        correct: "Correct: the steps are in the right order.",
        incorrect: "The order is not yet correct. Review the direction of information flow and try again.",
        incomplete: "Arrange all steps first.",
        available: "Choose the next step",
        selected: "Your sequence",
        empty: "No steps selected yet.",
        input: "Your answer",
        theory: "Open Module 1 theory",
        localNote: "Answers and check marks are for independent study. They are not saved after reloading the page or changing language."
    },
    sections: [
        {
            title: "1. Aim of the Lesson",
            blocks: [
                {
                    type: "paragraph",
                    text: "To develop an understanding of the structural and functional organization of the nervous system and the fundamental principles of neural regulation."
                }
            ]
        },
        {
            title: "2. Learning Objectives",
            blocks: [
                {
                    type: "paragraph",
                    text: "After completing the practical work, the student should be able to:"
                },
                {
                    type: "list",
                    items: [
                        "Distinguish the central and peripheral nervous systems.",
                        "Identify the main structural components of the nervous system.",
                        "Explain the functional roles of afferent and efferent components.",
                        "Explain the principle of neural regulation.",
                        "Analyze a simple functional diagram of the nervous system.",
                        "Use basic neurophysiology terminology."
                    ]
                }
            ]
        },
        {
            title: "3. Required Materials",
            blocks: [
                {
                    type: "list",
                    items: [
                        "A diagram of the nervous system.",
                        "A diagram of a neuron.",
                        "A diagram of a reflex arc.",
                        "Study tables.",
                        "Materials from the Theory section of Module 1."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Prepare diagrams from an educational atlas or the instructor's materials. Identify the cell body, dendrites, and axon on the neuron diagram, and central and peripheral structures on the nervous system diagram. Complete the tasks independently before comparing your explanations with the model answers."
                }
            ]
        },
        {
            title: "4. Brief Theoretical Rationale",
            blocks: [
                {
                    type: "paragraph",
                    text: "A receptor converts the effect of a stimulus into a signal. Information travels along an afferent pathway to the CNS, where it is processed and integrated. A command then travels along an efferent pathway to an effector, such as a muscle or gland, whose activity produces a response."
                },
                {
                    type: "callout",
                    title: "Principle of Neural Regulation",
                    text: "Receptor → afferent pathway → CNS → information processing and integration → efferent pathway → effector → response. Processing and integration occur within the CNS, rather than in a separate anatomical component beyond it."
                },
                {
                    type: "paragraph",
                    text: "Feedback is information about the outcome of a response and the current state of the body. It allows the actual outcome to be compared with the required outcome and effector activity to be adjusted. For example, signals from muscle and joint receptors help refine limb position during movement. Excitation and inhibition coordinate the activity of neural networks."
                }
            ]
        },
        {
            title: "5. Practical Task 1. Structural Organization of the Nervous System",
            blocks: [
                {
                    type: "paragraph",
                    text: "Assign the structures to two groups: CNS and PNS. Briefly state the common feature that justifies each grouping."
                },
                {
                    type: "list",
                    items: [
                        "Ganglia.",
                        "Brain.",
                        "Cranial nerves.",
                        "Nerve endings.",
                        "Spinal cord.",
                        "Spinal nerves."
                    ]
                },
                {
                    type: "response",
                    label: "List the CNS and PNS structures and explain your classification."
                },
                {
                    type: "answer",
                    items: [
                        "CNS: the brain and spinal cord. These structures contain central networks for information processing and integration.",
                        "PNS: cranial nerves, spinal nerves, ganglia, and nerve endings. In this introductory scheme, these are grouped as peripheral structures connecting organs and tissues with central structures.",
                        "Anatomical qualification: despite its name, the optic nerve (cranial nerve II) belongs to the CNS in its structure and development. The general statement about cranial nerves in this task is an educational simplification."
                    ]
                }
            ]
        },
        {
            title: "6. Practical Task 2. Afferent and Efferent Components",
            blocks: [
                {
                    type: "paragraph",
                    text: "A person accidentally touches a hot object and rapidly withdraws their hand. Analyze this protective reflex: identify the stimulus, receptor, afferent pathway, central component, efferent pathway, effector, and response."
                },
                {
                    type: "response",
                    label: "Write down the seven components and explain the direction of signal transmission."
                },
                {
                    type: "answer",
                    items: [
                        "Stimulus: a high temperature capable of damaging tissue.",
                        "Receptor: sensory free nerve endings in the skin, specifically heat-sensitive nociceptors.",
                        "Afferent pathway: sensory fibers in a peripheral nerve; the corresponding neuronal cell bodies lie in a dorsal root ganglion, and their central processes enter the spinal cord through the dorsal root.",
                        "Central component: spinal interneuron networks that activate the appropriate motor neurons and coordinate inhibition of antagonist muscles. Information also ascends to the brain for perception and further evaluation.",
                        "Efferent pathway: axons of spinal motor neurons passing through the ventral root and peripheral nerves to the muscles.",
                        "Effector: skeletal muscles that withdraw the hand, primarily the appropriate flexors.",
                        "Response: rapid withdrawal of the hand from the hot object. Initiation of the spinal reflex does not require a prior conscious decision."
                    ]
                }
            ]
        },
        {
            title: "7. Practical Task 3. Construct a Functional Sequence",
            blocks: [
                {
                    type: "paragraph",
                    text: "Select the steps one at a time in the order of information flow, from the initial stimulus to the response. If you make a mistake, remove the last step or start again. Then select “Check sequence”."
                },
                {
                    type: "sequence",
                    steps: [
                        "Stimulus",
                        "Receptor",
                        "Afferent pathway",
                        "CNS",
                        "Efferent pathway",
                        "Effector",
                        "Response"
                    ]
                }
            ]
        },
        {
            title: "8. Table for Independent Completion",
            blocks: [
                {
                    type: "paragraph",
                    text: "Identify the system or functional component to which each structure belongs and state its main function. Categories are not restricted to the CNS and PNS: an effector may be a muscle or gland. For the receptor, consider a peripheral sensory ending in this exercise."
                },
                {
                    type: "table",
                    headers: [
                        "Structure",
                        "Belongs to",
                        "Main function"
                    ],
                    rows: [
                        [
                            "Brain",
                            "CNS",
                            "Processing and integration of information; organization of behavior, movement, and regulation of bodily functions."
                        ],
                        [
                            "Spinal cord",
                            "CNS",
                            "Conduction of signals and organization of spinal reflexes."
                        ],
                        [
                            "Peripheral nerve",
                            "PNS",
                            "Conduction of afferent and/or efferent signals, depending on its fiber composition."
                        ],
                        [
                            "Ganglion",
                            "PNS",
                            "A cluster of neuronal cell bodies: sensory ganglia contain afferent neuron cell bodies, while autonomic ganglia participate in signal relay and processing."
                        ],
                        [
                            "Receptor",
                            "Peripheral sensory component; PNS in this example",
                            "Detection of a stimulus and its conversion into a signal. In other sensory systems, a receptor may be a specialized cell."
                        ],
                        [
                            "Effector",
                            "An executing organ: muscle or gland",
                            "Production of a response, such as contraction or secretion; the effector itself is not classified as CNS or PNS."
                        ]
                    ]
                }
            ]
        },
        {
            title: "9. Analysis of Results",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Why does damage to an afferent pathway disrupt the delivery of sensory information?",
                        "What happens if an efferent pathway is damaged?",
                        "Why is the CNS considered an integrative component?",
                        "What role does feedback play?",
                        "Why does a normal response require coordinated activity across several components?"
                    ]
                },
                {
                    type: "response",
                    label: "Provide cause-and-effect explanations for the five questions."
                },
                {
                    type: "answer",
                    items: [
                        "Disruption of an afferent pathway reduces or prevents signal transmission from receptors to the relevant central structures.",
                        "If an efferent pathway is disrupted, the command may not reach the effector, weakening or abolishing the response even when sensory information arrives.",
                        "The CNS compares multiple inputs, combines them with information about the body's current state, and organizes coordinated output.",
                        "Feedback reports the outcome of an action and allows subsequent responses to be adjusted.",
                        "Reception, conduction, integration, and execution perform different tasks; disruption of any component can alter the overall result."
                    ]
                }
            ]
        },
        {
            title: "10. Review Questions",
            blocks: [
                {
                    type: "list",
                    items: [
                        "1. What are the major functions of the nervous system?",
                        "2. Which structures belong to the CNS and PNS?",
                        "3. How does an afferent pathway differ from an efferent pathway?",
                        "4. How does a receptor differ from an effector?",
                        "5. What is neural information integration?",
                        "6. How do excitation and inhibition interact?",
                        "7. What are the main stages of chemical synaptic transmission?",
                        "8. How does feedback contribute to homeostasis?"
                    ]
                },
                {
                    type: "response",
                    label: "Write your answers to the eight review questions."
                },
                {
                    type: "answer",
                    items: [
                        "1. Detection, conduction, and integration of information; organization of motor and autonomic responses; maintenance of homeostasis and higher nervous functions.",
                        "2. CNS: brain and spinal cord. PNS: peripheral nerves, ganglia, and nerve endings. The anatomical qualification concerning the optic nerve is given in Task 1.",
                        "3. Afferent pathways lead from receptors to the CNS; efferent pathways lead from the CNS to effectors.",
                        "4. A receptor detects an influence and converts it into a signal; an effector executes the response.",
                        "5. Integration combines and processes signals to produce a coordinated response.",
                        "6. Excitatory influences increase the probability of neuronal firing, whereas inhibitory influences reduce it; their interaction makes responses selective.",
                        "7. An action potential reaches the terminal, calcium channels open, and transmitter is released; it binds to postsynaptic receptors and changes the receiving cell's activity.",
                        "8. Information about the current value of a regulated variable enables adjustment of the response; negative feedback reduces deviation from the required level."
                    ]
                }
            ]
        },
        {
            title: "11. Practical Mini-Case",
            blocks: [
                {
                    type: "paragraph",
                    text: "During a neurological examination, a patient feels touch on the skin of the hand but cannot voluntarily move the fingers. Which functional component may be impaired? Justify your answer by distinguishing the arrival of sensory information from execution of a motor command."
                },
                {
                    type: "response",
                    label: "Identify a potentially impaired functional component and explain the limits of this conclusion."
                },
                {
                    type: "answer",
                    items: [
                        "Within the teaching model, consider impairment of motor output: the efferent component or the mechanisms that execute a motor command. Preserved touch perception indicates preservation of the sensory channel tested, not of every sensory modality.",
                        "This description alone cannot establish the site of a lesion or a medical diagnosis: voluntary movement depends on central motor systems, peripheral motor fibers, neuromuscular transmission, and the muscle itself. The case illustrates the distinction between afferent and efferent functions."
                    ]
                }
            ]
        },
        {
            title: "12. Conclusion",
            blocks: [
                {
                    type: "paragraph",
                    text: "The nervous system follows a structural and functional organization: central and peripheral structures jointly support reception, conduction, and integration of information and control of effectors. Afferent and efferent components transmit signals in different directions but operate in coordination. Feedback refines the outcome and supports adaptive neural regulation."
                }
            ]
        },
        {
            title: "13. Self-Assessment",
            blocks: [
                {
                    type: "paragraph",
                    text: "After this lesson, I can:"
                },
                {
                    type: "checklist",
                    items: [
                        "Distinguish the CNS and PNS.",
                        "Explain the afferent pathway.",
                        "Explain the efferent pathway.",
                        "Construct a functional sequence of neural regulation.",
                        "Explain the roles of integration and feedback."
                    ]
                }
            ]
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/practice/kz.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "practice",
    title: "Практикалық сабақ. Нейрофизиологияға кіріспе",
    moduleTitle: "Модуль 1. Кіріспе",
    ui: {
        showAnswer: "Жауаптар мен түсіндірмелерді көрсету",
        check: "Ретін тексеру",
        reset: "Қайта бастау",
        undo: "Соңғы кезеңді алып тастау",
        correct: "Дұрыс: кезеңдер дұрыс ретпен орналастырылған.",
        incorrect: "Реті әзірше дұрыс емес. Ақпараттың берілу бағытын салыстырып, қайта орындаңыз.",
        incomplete: "Алдымен барлық кезеңдерді орналастырыңыз.",
        available: "Келесі кезеңді таңдаңыз",
        selected: "Сіздің реттілігіңіз",
        empty: "Әзірше ешбір кезең таңдалмады.",
        input: "Сіздің жауабыңыз",
        theory: "1-модульдің теориясын ашу",
        localNote: "Жауаптар мен белгілер өздік жұмысқа арналған. Бет қайта жүктелгенде немесе тіл ауыстырылғанда олар сақталмайды."
    },
    sections: [
        {
            title: "1. Сабақтың мақсаты",
            blocks: [
                {
                    type: "paragraph",
                    text: "Жүйке жүйесінің құрылымдық-қызметтік ұйымдасуы және жүйкелік реттелудің негізгі принциптері туралы түсінік қалыптастыру."
                }
            ]
        },
        {
            title: "2. Оқу міндеттері",
            blocks: [
                {
                    type: "paragraph",
                    text: "Практикалық жұмысты орындағаннан кейін студент:"
                },
                {
                    type: "list",
                    items: [
                        "Орталық және шеткі жүйке жүйесін ажырата алуы тиіс.",
                        "Жүйке жүйесінің негізгі құрылымдық құрамбөліктерін анықтай алуы тиіс.",
                        "Афференттік және эфференттік буындардың қызметтік рөлін түсіндіре алуы тиіс.",
                        "Жүйкелік реттелу принципін түсіндіре алуы тиіс.",
                        "Жүйке жүйесінің қарапайым қызметтік сызбасын талдай алуы тиіс.",
                        "Нейрофизиологияның негізгі терминдерін қолдана алуы тиіс."
                    ]
                }
            ]
        },
        {
            title: "3. Қажетті материалдар",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Жүйке жүйесінің сызбасы.",
                        "Нейронның сызбасы.",
                        "Рефлекс доғасының сызбасы.",
                        "Оқу кестелері.",
                        "1-модульдің Theory (Теория) бөлімінің материалдары."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Оқу атласынан немесе оқытушы материалдарынан сызбаларды дайындаңыз. Нейрон сызбасынан денесін, дендриттерін және аксонын; жүйке жүйесінің сызбасынан орталық және шеткі құрылымдарды табыңыз. Тапсырмаларды өз бетіңізше орындап, содан кейін түсіндірмелеріңізді үлгі жауаптармен салыстырыңыз."
                }
            ]
        },
        {
            title: "4. Қысқаша теориялық негіздеме",
            blocks: [
                {
                    type: "paragraph",
                    text: "Рецептор тітіркендіргіштің әсерін сигналға түрлендіреді. Афференттік жол арқылы ақпарат ОЖЖ-ге түсіп, онда өңделеді және біріктіріледі. Эфференттік жол арқылы басқарушы сигнал эффекторға — бұлшықетке немесе безге жеткізіледі; оның қызметі жауап реакциясын қалыптастырады."
                },
                {
                    type: "callout",
                    title: "Жүйкелік реттелу принципі",
                    text: "Рецептор → афференттік жол → ОЖЖ → ақпаратты өңдеу және интеграциялау → эфференттік жол → эффектор → жауап реакциясы. Ақпаратты өңдеу мен интеграциялау ОЖЖ-де жүреді, одан кейінгі жеке анатомиялық буында емес."
                },
                {
                    type: "paragraph",
                    text: "Кері байланыс — реакцияның нәтижесі және организмнің ағымдағы күйі туралы ақпараттың келуі. Ол алынған нәтижені қажетті нәтижемен салыстыруға және атқарушы мүшелердің қызметін түзетуге мүмкіндік береді. Мысалы, бұлшықеттер мен буындар рецепторларының сигналдары қозғалыс кезінде аяқ-қолдың қалпын нақтылауға көмектеседі. Қозу мен тежелу нейрондық желілер белсенділігінің үйлесуін қамтамасыз етеді."
                }
            ]
        },
        {
            title: "5. №1 практикалық тапсырма. Жүйке жүйесінің құрылымдық ұйымдасуы",
            blocks: [
                {
                    type: "paragraph",
                    text: "Құрылымдарды екі топқа — ОЖЖ және ШЖЖ-ге бөліңіз. Әр топқа біріктірудің ортақ белгісін қысқаша түсіндіріңіз."
                },
                {
                    type: "list",
                    items: [
                        "Ганглийлер.",
                        "Ми.",
                        "Бассүйек жүйкелері.",
                        "Жүйке ұштары.",
                        "Жұлын.",
                        "Жұлын жүйкелері."
                    ]
                },
                {
                    type: "response",
                    label: "ОЖЖ мен ШЖЖ құрамын жазып, топтастыруды негіздеңіз."
                },
                {
                    type: "answer",
                    items: [
                        "ОЖЖ: ми және жұлын. Бұл құрылымдар ақпаратты өңдеу мен интеграциялаудың орталық желілерін қамтиды.",
                        "ШЖЖ: бассүйек жүйкелері, жұлын жүйкелері, ганглийлер және жүйке ұштары. Осы кіріспе сызбада олар мүшелермен және тіндермен байланысты қамтамасыз ететін шеткі құрылымдар ретінде біріктірілген.",
                        "Нақтылау: көру жүйкесі (II жұп) атауына қарамастан, құрылысы мен дамуы бойынша ОЖЖ-ге жатады. Бұл тапсырмадағы бассүйек жүйкелері туралы жалпы ереже оқу мақсатында ықшамдалған."
                    ]
                }
            ]
        },
        {
            title: "6. №2 практикалық тапсырма. Афференттік және эфференттік буын",
            blocks: [
                {
                    type: "paragraph",
                    text: "Адам ыстық затқа байқаусызда тиіп, қолын тез тартып алады. Қорғаныш рефлексін талдаңыз: тітіркендіргішті, рецепторды, афференттік жолды, орталық буынды, эфференттік жолды, эффекторды және жауап реакциясын анықтаңыз."
                },
                {
                    type: "response",
                    label: "Жеті буынды жазып, сигналдың берілу бағытын түсіндіріңіз."
                },
                {
                    type: "answer",
                    items: [
                        "Тітіркендіргіш: тіндерді зақымдауы мүмкін жоғары температура.",
                        "Рецептор: терінің сезімтал бос жүйке ұштары — жылуға сезімтал ноцицепторлар.",
                        "Афференттік жол: шеткі жүйкенің сезімтал талшықтары; тиісті нейрондардың денелері жұлын түйінінде орналасады, ал орталық өсінділері жұлынға артқы түбіршік арқылы кіреді.",
                        "Орталық буын: қажетті мотонейрондарды белсендіріп, антагонист бұлшықеттердің тежелуін үйлестіретін жұлынның аралық нейрондар желілері. Ақпарат қабылдау және әрі қарай бағалау үшін миға да беріледі.",
                        "Эфференттік жол: алдыңғы түбіршік пен шеткі жүйкелер арқылы бұлшықеттерге баратын жұлын мотонейрондарының аксондары.",
                        "Эффектор: қолды тартып алуды қамтамасыз ететін қаңқа бұлшықеттері, ең алдымен тиісті бүккіштер.",
                        "Жауап реакциясы: қолды ыстық заттан тез алыстату. Жұлын рефлексінің басталуы үшін алдын ала саналы шешім қабылдау қажет емес."
                    ]
                }
            ]
        },
        {
            title: "7. №3 практикалық тапсырма. Қызметтік сызбаны құрастырыңыз",
            blocks: [
                {
                    type: "paragraph",
                    text: "Кезеңдерді организмге әсер етуден бастап жауапқа дейінгі ақпараттың берілу ретімен бір-бірден таңдаңыз. Қателессеңіз, соңғы кезеңді алып тастаңыз немесе қайта бастаңыз. Содан кейін «Ретін тексеру» батырмасын басыңыз."
                },
                {
                    type: "sequence",
                    steps: [
                        "Тітіркендіргіш",
                        "Рецептор",
                        "Афференттік жол",
                        "ОЖЖ",
                        "Эфференттік жол",
                        "Эффектор",
                        "Жауап реакциясы"
                    ]
                }
            ]
        },
        {
            title: "8. Өздігінен толтыруға арналған кесте",
            blocks: [
                {
                    type: "paragraph",
                    text: "Әр құрылымның қай жүйеге немесе буынға жататынын және негізгі қызметін көрсетіңіз. Санаттар ОЖЖ мен ШЖЖ-мен шектелмейді: эффектор бұлшықет немесе без болуы мүмкін. Бұл тапсырмада рецептор ретінде шеткі сезімтал ұш қарастырылатынын ескеріңіз."
                },
                {
                    type: "table",
                    headers: [
                        "Құрылым",
                        "Жататын жүйесі немесе буыны",
                        "Негізгі қызметі"
                    ],
                    rows: [
                        [
                            "Ми",
                            "ОЖЖ",
                            "Ақпаратты өңдеу және интеграциялау, мінез-құлықты, қозғалыстарды және қызметтердің реттелуін ұйымдастыру."
                        ],
                        [
                            "Жұлын",
                            "ОЖЖ",
                            "Сигналдарды өткізу және жұлын рефлекстерін ұйымдастыру."
                        ],
                        [
                            "Шеткі жүйке",
                            "ШЖЖ",
                            "Талшықтар құрамына қарай афференттік және/немесе эфференттік сигналдарды өткізу."
                        ],
                        [
                            "Ганглий",
                            "ШЖЖ",
                            "Нейрон денелерінің шоғыры: сезімтал ганглийлерде афференттік нейрондардың денелері орналасады, вегетативтік ганглийлер сигналдарды ауыстырып жеткізуге және өңдеуге қатысады."
                        ],
                        [
                            "Рецептор",
                            "Шеткі сезімтал буын; осы мысалда — ШЖЖ",
                            "Тітіркенуді қабылдау және оны сигналға түрлендіру. Басқа сенсорлық жүйелерде рецептор маманданған жасуша болуы мүмкін."
                        ],
                        [
                            "Эффектор",
                            "Атқарушы мүше: бұлшықет немесе без",
                            "Жауапты орындау, мысалы, жиырылу немесе секреция; эффектордың өзі ОЖЖ не ШЖЖ құрамына жатпайды."
                        ]
                    ]
                }
            ]
        },
        {
            title: "9. Нәтижелерді талдау",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Афференттік жолдың зақымдануы неліктен сенсорлық ақпараттың келуін бұзады?",
                        "Эфференттік жол зақымданғанда не болады?",
                        "ОЖЖ неліктен интегративтік буын ретінде қарастырылады?",
                        "Кері байланыс қандай рөл атқарады?",
                        "Организмнің қалыпты жауабы неліктен бірнеше буынның үйлесімді жұмысын талап етеді?"
                    ]
                },
                {
                    type: "response",
                    label: "Бес сұрақ бойынша себеп-салдарлық түсіндірмелерді тұжырымдаңыз."
                },
                {
                    type: "answer",
                    items: [
                        "Афференттік жолдың бұзылуы рецепторлардан тиісті орталық құрылымдарға сигналдардың берілуін шектейді немесе тоқтатады.",
                        "Эфференттік жол бұзылғанда басқарушы сигнал эффекторға жетпеуі мүмкін, сондықтан сезімтал ақпарат келіп тұрса да, жауап әлсірейді немесе болмайды.",
                        "ОЖЖ көптеген кіріс сигналдарын салыстырып, оларды организмнің ағымдағы күйімен біріктіреді және үйлесімді шығыс сигналын ұйымдастырады.",
                        "Кері байланыс әрекеттің нәтижесі туралы хабарлап, кейінгі жауапты түзетуге мүмкіндік береді.",
                        "Қабылдау, өткізу, интеграциялау және орындау әртүрлі міндеттерді шешеді; кез келген буынның бұзылуы жалпы нәтижені өзгертуі мүмкін."
                    ]
                }
            ]
        },
        {
            title: "10. Бақылау сұрақтары",
            blocks: [
                {
                    type: "list",
                    items: [
                        "1. Жүйке жүйесінің негізгі қызметтері қандай?",
                        "2. ОЖЖ мен ШЖЖ құрамына қандай құрылымдар кіреді?",
                        "3. Афференттік жолдың эфференттік жолдан айырмашылығы неде?",
                        "4. Рецептордың эффектордан айырмашылығы неде?",
                        "5. Жүйкелік ақпараттың интеграциясы дегеніміз не?",
                        "6. Қозу мен тежелу қалай өзара әрекеттеседі?",
                        "7. Химиялық синапстық берілудің негізгі кезеңдері қандай?",
                        "8. Кері байланыс гомеостазды сақтауға қалай қатысады?"
                    ]
                },
                {
                    type: "response",
                    label: "Сегіз бақылау сұрағына жауап жазыңыз."
                },
                {
                    type: "answer",
                    items: [
                        "1. Ақпаратты қабылдау, өткізу және интеграциялау, қозғалтқыш және вегетативтік жауаптарды ұйымдастыру, гомеостаз бен жоғары жүйке қызметтерін қамтамасыз ету.",
                        "2. ОЖЖ — ми мен жұлын. ШЖЖ — шеткі жүйкелер, ганглийлер және жүйке ұштары; көру жүйкесіне қатысты анатомиялық нақтылау №1 тапсырмада берілген.",
                        "3. Афференттік жол рецепторлардан ОЖЖ-ге, эфференттік жол ОЖЖ-ден атқарушы мүшелерге бағытталған.",
                        "4. Рецептор әсерді қабылдап, оны сигналға түрлендіреді, ал эффектор жауапты орындайды.",
                        "5. Интеграция — үйлесімді жауап қалыптастыру үшін сигналдарды біріктіру және өңдеу.",
                        "6. Қоздырушы әсерлер нейрон разрядының ықтималдығын арттырады, тежеуші әсерлер төмендетеді; олардың өзара әрекеттесуі жауаптардың таңдамалылығын қамтамасыз етеді.",
                        "7. Әрекет потенциалы жүйке ұшына жетеді, кальций арналары ашылады, медиатор бөлініп, постсинапстық рецепторлармен байланысады және жасуша белсенділігін өзгертеді.",
                        "8. Реттелетін көрсеткіштің ағымдағы күйі туралы ақпарат жауапты түзетуге мүмкіндік береді; теріс кері байланыс қажетті деңгейден ауытқуды азайтады."
                    ]
                }
            ]
        },
        {
            title: "11. Қысқаша практикалық есеп",
            blocks: [
                {
                    type: "paragraph",
                    text: "Неврологиялық тексеру кезінде пациент қол басының терісіне жанасуды сезеді, бірақ саусақтарын ерікті түрде қозғалта алмайды. Қай қызметтік буын бұзылуы мүмкін? Сезімтал ақпараттың келуі мен қозғалтқыш команданың орындалуын ажырата отырып, жауабыңызды негіздеңіз."
                },
                {
                    type: "response",
                    label: "Бұзылуы мүмкін қызметтік буынды және мұндай қорытындының шектеулерін көрсетіңіз."
                },
                {
                    type: "answer",
                    items: [
                        "Оқу мақсатындағы қызметтік сызбада қозғалтқыш шығыстың — эфференттік буынның немесе қозғалтқыш команданы іске асыру механизмдерінің бұзылуын болжауға болады. Жанасуды сезінудің сақталуы тек зерттелген сезімтал арнаның сақталғанын көрсетеді, барлық сезімталдық түрлерінің емес.",
                        "Бұл сипаттама бойынша зақымдану орнын немесе медициналық диагнозды анықтауға болмайды: ерікті қозғалыс орталық қозғалтқыш жүйелерге, шеткі қозғалтқыш талшықтарға, жүйке-бұлшықет берілуіне және бұлшықеттің өзіне тәуелді. Есеп афференттік және эфференттік қызметтердің айырмашылығын көрсетеді."
                    ]
                }
            ]
        },
        {
            title: "12. Қорытынды",
            blocks: [
                {
                    type: "paragraph",
                    text: "Жүйке жүйесі құрылымдық-қызметтік принцип бойынша ұйымдасқан: орталық және шеткі құрылымдар бірлесіп ақпаратты қабылдауды, өткізуді, интеграциялауды және атқарушы мүшелерді басқаруды қамтамасыз етеді. Афференттік және эфференттік буындардағы сигналдардың берілу бағыты әртүрлі болғанымен, олардың қызметі үйлесімді. Кері байланыс нәтижені нақтылауға және жүйкелік реттелудің бейімделгіштігін сақтауға мүмкіндік береді."
                }
            ]
        },
        {
            title: "13. Өзін-өзі бағалау",
            blocks: [
                {
                    type: "paragraph",
                    text: "Сабақтан кейін мен:"
                },
                {
                    type: "checklist",
                    items: [
                        "ОЖЖ мен ШЖЖ-ні ажырата аламын.",
                        "Афференттік жолды түсіндіре аламын.",
                        "Эфференттік жолды түсіндіре аламын.",
                        "Жүйкелік реттелудің қызметтік сызбасын құрастыра аламын.",
                        "Интеграция мен кері байланыстың рөлін түсіндіре аламын."
                    ]
                }
            ]
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/practice/ru.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    kind: "practice",
    title: "Практическое занятие. Введение в нейрофизиологию",
    moduleTitle: "Модуль 1. Введение",
    ui: {
        showAnswer: "Показать ответы и объяснения",
        check: "Проверить порядок",
        reset: "Начать заново",
        undo: "Убрать последний этап",
        correct: "Верно: этапы расположены в правильном порядке.",
        incorrect: "Порядок пока неверный. Сопоставьте направление передачи информации и попробуйте снова.",
        incomplete: "Сначала расположите все этапы.",
        available: "Выберите следующий этап",
        selected: "Ваша последовательность",
        empty: "Пока не выбран ни один этап.",
        input: "Ваш ответ",
        theory: "Открыть теорию Модуля 1",
        localNote: "Ответы и отметки предназначены для самостоятельной работы и не сохраняются после перезагрузки страницы или смены языка."
    },
    sections: [
        {
            title: "1. Цель занятия",
            blocks: [
                {
                    type: "paragraph",
                    text: "Сформировать представление о структурно-функциональной организации нервной системы и основных принципах нервной регуляции."
                }
            ]
        },
        {
            title: "2. Учебные задачи",
            blocks: [
                {
                    type: "paragraph",
                    text: "После выполнения практической работы студент должен уметь:"
                },
                {
                    type: "list",
                    items: [
                        "Различать центральную и периферическую нервную систему.",
                        "Определять основные структурные компоненты нервной системы.",
                        "Объяснять функциональную роль афферентного и эфферентного звеньев.",
                        "Объяснять принцип нервной регуляции.",
                        "Анализировать простую функциональную схему нервной системы.",
                        "Использовать основные термины нейрофизиологии."
                    ]
                }
            ]
        },
        {
            title: "3. Необходимые материалы",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Схема нервной системы.",
                        "Схема нейрона.",
                        "Схема рефлекторной дуги.",
                        "Учебные таблицы.",
                        "Материалы раздела Theory (Теория) Модуля 1."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Подготовьте схемы из учебного атласа или материалов преподавателя. На схеме нейрона найдите тело, дендриты и аксон; на схеме нервной системы — центральные и периферические структуры. Выполняйте задания самостоятельно, затем сравнивайте свои объяснения с эталонами."
                }
            ]
        },
        {
            title: "4. Краткое теоретическое обоснование",
            blocks: [
                {
                    type: "paragraph",
                    text: "Рецептор преобразует действие раздражителя в сигнал. По афферентному пути информация поступает в ЦНС, где происходит её обработка и интеграция. По эфферентному пути команда направляется к эффектору — мышце или железе, деятельность которой формирует ответную реакцию."
                },
                {
                    type: "callout",
                    title: "Принцип нервной регуляции",
                    text: "Рецептор → афферентный путь → ЦНС → обработка и интеграция информации → эфферентный путь → эффектор → ответная реакция. Обработка и интеграция происходят в ЦНС, а не в отдельном анатомическом звене после неё."
                },
                {
                    type: "paragraph",
                    text: "Обратная связь — поступление информации о результате реакции и текущем состоянии организма. Она позволяет сопоставлять полученный результат с необходимым и корректировать деятельность исполнительных органов. Например, сигналы от рецепторов мышц и суставов помогают уточнять положение конечности во время движения. Возбуждение и торможение обеспечивают согласование активности нейронных сетей."
                }
            ]
        },
        {
            title: "5. Практическое задание №1. Структурная организация нервной системы",
            blocks: [
                {
                    type: "paragraph",
                    text: "Распределите структуры по двум группам — ЦНС и ПНС. Для каждой группы кратко укажите общий признак объединения."
                },
                {
                    type: "list",
                    items: [
                        "Ганглии.",
                        "Головной мозг.",
                        "Черепные нервы.",
                        "Нервные окончания.",
                        "Спинной мозг.",
                        "Спинномозговые нервы."
                    ]
                },
                {
                    type: "response",
                    label: "Запишите состав ЦНС и ПНС и обоснуйте распределение."
                },
                {
                    type: "answer",
                    items: [
                        "ЦНС: головной мозг и спинной мозг. Эти структуры содержат центральные сети обработки и интеграции информации.",
                        "ПНС: черепные нервы, спинномозговые нервы, ганглии и нервные окончания. В данной вводной схеме они объединены как периферические структуры связи с органами и тканями.",
                        "Уточнение: зрительный нерв (II пара), несмотря на название, по строению и развитию относится к ЦНС. Общее правило о черепных нервах в этом задании является учебным упрощением."
                    ]
                }
            ]
        },
        {
            title: "6. Практическое задание №2. Афферентное и эфферентное звено",
            blocks: [
                {
                    type: "paragraph",
                    text: "Человек случайно касается горячего предмета и быстро отдёргивает руку. Разберите защитный рефлекс: определите раздражитель, рецептор, афферентный путь, центральное звено, эфферентный путь, эффектор и ответную реакцию."
                },
                {
                    type: "response",
                    label: "Запишите семь звеньев и объясните направление передачи сигнала."
                },
                {
                    type: "answer",
                    items: [
                        "Раздражитель: высокая температура, способная повредить ткани.",
                        "Рецептор: чувствительные свободные нервные окончания кожи — термочувствительные ноцицепторы.",
                        "Афферентный путь: чувствительные волокна периферического нерва; тела соответствующих нейронов находятся в спинномозговом ганглии, а центральные отростки входят в спинной мозг через задний корешок.",
                        "Центральное звено: сети вставочных нейронов спинного мозга, активирующие нужные мотонейроны и координирующие торможение мышц-антагонистов. Информация также передаётся в головной мозг для восприятия и дальнейшей оценки.",
                        "Эфферентный путь: аксоны спинальных мотонейронов, проходящие через передний корешок и периферические нервы к мышцам.",
                        "Эффектор: скелетные мышцы, обеспечивающие отдёргивание руки, прежде всего соответствующие сгибатели.",
                        "Ответная реакция: быстрое отведение руки от горячего предмета. Для запуска спинального рефлекса не требуется предварительное осознанное решение."
                    ]
                }
            ]
        },
        {
            title: "7. Практическое задание №3. Построй функциональную схему",
            blocks: [
                {
                    type: "paragraph",
                    text: "Выбирайте этапы по одному в порядке передачи информации — от воздействия на организм до ответа. При ошибке уберите последний этап или начните заново. Затем нажмите «Проверить порядок»."
                },
                {
                    type: "sequence",
                    steps: [
                        "Раздражитель",
                        "Рецептор",
                        "Афферентный путь",
                        "ЦНС",
                        "Эфферентный путь",
                        "Эффектор",
                        "Ответная реакция"
                    ]
                }
            ]
        },
        {
            title: "8. Таблица для самостоятельного заполнения",
            blocks: [
                {
                    type: "paragraph",
                    text: "Укажите принадлежность каждой структуры и её основную функцию. Категории не ограничены ЦНС и ПНС: эффектор может быть мышцей или железой. Для рецептора учитывайте, что в этом задании рассматривается периферическое чувствительное окончание."
                },
                {
                    type: "table",
                    headers: [
                        "Структура",
                        "Относится к",
                        "Основная функция"
                    ],
                    rows: [
                        [
                            "Головной мозг",
                            "ЦНС",
                            "Обработка и интеграция информации, организация поведения, движений и регуляции функций."
                        ],
                        [
                            "Спинной мозг",
                            "ЦНС",
                            "Проведение сигналов и организация спинальных рефлексов."
                        ],
                        [
                            "Периферический нерв",
                            "ПНС",
                            "Проведение афферентных и/или эфферентных сигналов в зависимости от состава волокон."
                        ],
                        [
                            "Ганглий",
                            "ПНС",
                            "Скопление тел нейронов: чувствительные ганглии содержат тела афферентных нейронов, вегетативные участвуют в переключении и обработке сигналов."
                        ],
                        [
                            "Рецептор",
                            "Периферическое чувствительное звено; в данном примере — ПНС",
                            "Восприятие раздражения и преобразование его в сигнал. В других сенсорных системах рецептором может быть специализированная клетка."
                        ],
                        [
                            "Эффектор",
                            "Исполнительный орган: мышца или железа",
                            "Выполнение ответа, например сокращение или секреция; сам эффектор не относят к ЦНС или ПНС."
                        ]
                    ]
                }
            ]
        },
        {
            title: "9. Анализ результатов",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Почему повреждение афферентного пути нарушает поступление сенсорной информации?",
                        "Что произойдёт при повреждении эфферентного пути?",
                        "Почему ЦНС рассматривается как интегративное звено?",
                        "Какую роль играет обратная связь?",
                        "Почему нормальная реакция организма требует согласованной работы нескольких звеньев?"
                    ]
                },
                {
                    type: "response",
                    label: "Сформулируйте причинно-следственные объяснения по пяти вопросам."
                },
                {
                    type: "answer",
                    items: [
                        "Нарушение афферентного пути ограничивает или прекращает передачу сигналов от рецепторов к соответствующим центральным структурам.",
                        "При нарушении эфферентного пути команда может не достигать эффектора, поэтому ответ ослабевает или отсутствует, даже если чувствительная информация поступает.",
                        "ЦНС сопоставляет множество входных сигналов, объединяет их с текущим состоянием организма и организует согласованный выходной сигнал.",
                        "Обратная связь сообщает о результате действия и позволяет корректировать последующий ответ.",
                        "Рецепция, проведение, интеграция и исполнение решают разные задачи; нарушение любого звена может изменить общий результат."
                    ]
                }
            ]
        },
        {
            title: "10. Контрольные вопросы",
            blocks: [
                {
                    type: "list",
                    items: [
                        "1. Какие основные функции выполняет нервная система?",
                        "2. Какие структуры входят в ЦНС и ПНС?",
                        "3. Чем афферентный путь отличается от эфферентного?",
                        "4. Чем рецептор отличается от эффектора?",
                        "5. Что такое интеграция нервной информации?",
                        "6. Как соотносятся возбуждение и торможение?",
                        "7. Каковы основные этапы химической синаптической передачи?",
                        "8. Как обратная связь участвует в поддержании гомеостаза?"
                    ]
                },
                {
                    type: "response",
                    label: "Запишите ответы на восемь контрольных вопросов."
                },
                {
                    type: "answer",
                    items: [
                        "1. Восприятие, проведение и интеграция информации, организация двигательных и вегетативных реакций, поддержание гомеостаза и высших нервных функций.",
                        "2. ЦНС — головной и спинной мозг. ПНС — периферические нервы, ганглии и нервные окончания; анатомическое уточнение о зрительном нерве приведено в задании №1.",
                        "3. Афферентный путь направлен от рецепторов к ЦНС, эфферентный — от ЦНС к исполнительным органам.",
                        "4. Рецептор обнаруживает воздействие и преобразует его в сигнал, эффектор выполняет ответ.",
                        "5. Интеграция — объединение и обработка сигналов для формирования согласованного ответа.",
                        "6. Возбуждающие влияния повышают вероятность разряда нейрона, тормозные — снижают её; их взаимодействие делает ответы избирательными.",
                        "7. Потенциал действия достигает окончания, открываются кальциевые каналы, выделяется медиатор, который связывается с постсинаптическими рецепторами и изменяет активность клетки.",
                        "8. Информация о текущем состоянии регулируемой величины позволяет корректировать ответ; отрицательная обратная связь уменьшает отклонение от необходимого уровня."
                    ]
                }
            ]
        },
        {
            title: "11. Практическая мини-задача",
            blocks: [
                {
                    type: "paragraph",
                    text: "При неврологическом обследовании пациент чувствует прикосновение к коже кисти, но не может произвольно выполнить движение пальцами. Какое функциональное звено может быть нарушено? Обоснуйте ответ, различая поступление чувствительной информации и выполнение двигательной команды."
                },
                {
                    type: "response",
                    label: "Укажите возможное функциональное звено и пределы такого вывода."
                },
                {
                    type: "answer",
                    items: [
                        "В учебной функциональной схеме следует предположить нарушение двигательного выхода — эфферентного звена или механизмов реализации двигательной команды. Сохранённое восприятие прикосновения указывает на сохранность исследуемого чувствительного канала, но не всех видов чувствительности.",
                        "По этому описанию нельзя установить место повреждения или медицинский диагноз: произвольное движение зависит от центральных двигательных систем, периферических двигательных волокон, нервно-мышечной передачи и самой мышцы. Задача иллюстрирует различие афферентной и эфферентной функций."
                    ]
                }
            ]
        },
        {
            title: "12. Вывод",
            blocks: [
                {
                    type: "paragraph",
                    text: "Нервная система организована по структурно-функциональному принципу: центральные и периферические структуры совместно обеспечивают восприятие, проведение и интеграцию информации, а также управление исполнительными органами. Афферентное и эфферентное звенья имеют различное направление передачи сигналов, но действуют согласованно. Обратная связь позволяет уточнять результат и поддерживать адаптивность нервной регуляции."
                }
            ]
        },
        {
            title: "13. Самооценка",
            blocks: [
                {
                    type: "paragraph",
                    text: "После занятия я могу:"
                },
                {
                    type: "checklist",
                    items: [
                        "Различать ЦНС и ПНС.",
                        "Объяснить афферентный путь.",
                        "Объяснить эфферентный путь.",
                        "Построить функциональную схему нервной регуляции.",
                        "Объяснить роль интеграции и обратной связи."
                    ]
                }
            ]
        }
    ]
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/theory/en.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    title: "Module 1. Introduction to Neurophysiology",
    sections: [
        {
            title: "1. General Organization of the Nervous System",
            blocks: [
                {
                    type: "paragraph",
                    text: "The nervous system is a complex functional system that receives, transmits, processes, and integrates information from the body's external and internal environments."
                },
                {
                    type: "paragraph",
                    text: "It coordinates organs and functional systems, enables the body to adapt to changing environmental conditions, and contributes to the organization of behavior."
                },
                {
                    type: "paragraph",
                    text: "The neuron is the fundamental structural and functional unit of the nervous system: a specialized cell that receives, processes, and transmits signals. Glial cells support neuronal function, help maintain the local cellular environment, and participate in the formation of myelin sheaths."
                }
            ]
        },
        {
            title: "2. Major Functions of the Nervous System",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Detection of information.",
                        "Conduction of neural signals.",
                        "Analysis and integration of information.",
                        "Generation of motor responses.",
                        "Regulation of autonomic functions.",
                        "Coordination of internal organ activity.",
                        "Maintenance of homeostasis.",
                        "Support of higher nervous functions."
                    ]
                },
                {
                    type: "paragraph",
                    text: "The nervous system does more than relay signals: it evaluates information in relation to the body's current state and previous experience to produce an appropriate response. For example, touching a hot object triggers rapid withdrawal of the hand, while processing in the brain supports conscious perception of pain and subsequent changes in behavior."
                },
                {
                    type: "paragraph",
                    text: "Homeostasis is the maintenance of a relatively stable internal environment. Together with endocrine and local mechanisms, the nervous system helps regulate circulation, breathing, and body temperature."
                }
            ]
        },
        {
            title: "3. Central and Peripheral Nervous Systems",
            blocks: [
                {
                    type: "subheading",
                    text: "Central nervous system (CNS)"
                },
                {
                    type: "list",
                    items: [
                        "Brain.",
                        "Spinal cord."
                    ]
                },
                {
                    type: "paragraph",
                    text: "The CNS processes and integrates incoming signals, organizes reflex responses, and participates in the regulation of movement, internal organ activity, and higher nervous functions. The spinal cord is not merely a conduction pathway: it also contains neural circuits that mediate a range of reflexes."
                },
                {
                    type: "subheading",
                    text: "Peripheral nervous system (PNS)"
                },
                {
                    type: "list",
                    items: [
                        "Nerves: bundles of nerve fibers connecting different structures of the body.",
                        "Ganglia: clusters of neuronal cell bodies outside the CNS.",
                        "Nerve endings, including sensory and motor endings.",
                        "Other peripheral neural structures that connect the CNS with organs and tissues."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Afferent (sensory) pathways carry information from receptors to the CNS. Efferent pathways carry commands to effectors, such as muscles and glands. Feedback about the outcome of an action allows the response to be adjusted. The CNS and PNS therefore function as interconnected parts of a unified system."
                }
            ]
        },
        {
            title: "4. Fundamental Principles of Nervous System Function",
            blocks: [
                {
                    type: "subheading",
                    text: "Excitability and conduction"
                },
                {
                    type: "paragraph",
                    text: "Excitability is the ability of a cell to respond to a stimulus by changing the electrical state of its membrane. An action potential may be generated when threshold is reached. Conduction is the propagation of an electrical signal along the membrane of a nerve fiber. In myelinated axons, action potentials are regenerated at successive nodes of Ranvier, increasing the speed of signal transmission."
                },
                {
                    type: "subheading",
                    text: "Excitation and inhibition"
                },
                {
                    type: "paragraph",
                    text: "Excitation is an active process associated with an electrical response in a cell; in synaptic communication, an excitatory influence increases the probability of action potential generation. Inhibition reduces the probability or frequency of neuronal firing. It is an active regulatory mechanism, rather than simply the absence of excitation. The combined action of excitatory and inhibitory influences makes neural responses selective and coordinated."
                },
                {
                    type: "subheading",
                    text: "Synaptic transmission"
                },
                {
                    type: "paragraph",
                    text: "A synapse is a specialized junction through which a neuron signals to another cell. At a chemical synapse, arrival of an action potential at the presynaptic terminal triggers calcium entry and neurotransmitter release. The transmitter binds to receptors on the postsynaptic membrane and changes the activity of the receiving cell. The effect depends on the receptors and their associated mechanisms. At electrical synapses, current passes between cells through gap junctions."
                },
                {
                    type: "subheading",
                    text: "Neural information integration"
                },
                {
                    type: "paragraph",
                    text: "A neuron receives multiple signals that interact across time and space. Their combined effect determines the cell's response. Within neural networks, information is evaluated in relation to current physiological needs and previous experience, enabling coordinated responses."
                },
                {
                    type: "callout",
                    title: "Key Idea",
                    text: "The nervous system does more than conduct impulses. It selects, compares, and integrates information before generating an appropriate response by the body."
                }
            ]
        },
        {
            title: "5. Importance of Neurophysiology",
            blocks: [
                {
                    type: "paragraph",
                    text: "Neurophysiology investigates the mechanisms and principles of nervous system function at several interconnected levels:"
                },
                {
                    type: "list",
                    items: [
                        "Membrane level: ion channels, membrane potential, and electrical signals.",
                        "Cellular level: the excitability and activity of individual neurons and their interactions with glia.",
                        "Synaptic level: signaling between cells and changes in the effectiveness of transmission.",
                        "Neural network level: interactions among groups of neurons and information processing.",
                        "Systems level: the organization of sensory, motor, and autonomic functions.",
                        "Integrative level: coordination of bodily functions, behavior, and adaptation."
                    ]
                },
                {
                    type: "paragraph",
                    text: "This knowledge explains how sensory systems detect stimuli and how motor control and autonomic regulation operate. It also provides a foundation for studying behavior, memory, and learning, which involve changes in neural network activity and synaptic plasticity."
                },
                {
                    type: "paragraph",
                    text: "Understanding normal mechanisms is essential for studying nervous system pathophysiology: it helps explain how disturbances of excitability, conduction, or synaptic transmission can lead to functional impairment."
                }
            ]
        }
    ],
    outcomes: {
        title: "6. Learning Outcomes",
        introduction: "After completing this section, the student should be able to:",
        items: [
            "Describe the major functions of the nervous system.",
            "Distinguish the central and peripheral nervous systems.",
            "Explain neural information integration.",
            "Explain the roles of excitation and inhibition.",
            "Describe the basic principles of synaptic transmission.",
            "Define the subject and objectives of neurophysiology."
        ]
    },
    terms: {
        title: "7. Key Terms",
        items: [
            "Nervous system",
            "CNS",
            "PNS",
            "Neuron",
            "Excitation",
            "Inhibition",
            "Synapse",
            "Integration",
            "Homeostasis",
            "Neurophysiology"
        ]
    }
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/theory/kz.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    title: "Модуль 1. Нейрофизиологияға кіріспе",
    sections: [
        {
            title: "1. Жүйке жүйесінің жалпы сипаттамасы",
            blocks: [
                {
                    type: "paragraph",
                    text: "Жүйке жүйесі — организмнің сыртқы және ішкі ортасынан келетін ақпаратты қабылдауды, өткізуді, өңдеуді және біріктіруді қамтамасыз ететін күрделі қызметтік жүйе."
                },
                {
                    type: "paragraph",
                    text: "Ол мүшелер мен қызметтік жүйелердің жұмысын үйлестіреді, организмнің қоршаған ортаның өзгермелі жағдайларына бейімделуін қамтамасыз етеді және мінез-құлықтың қалыптасуына қатысады."
                },
                {
                    type: "paragraph",
                    text: "Жүйке жүйесінің негізгі құрылымдық-қызметтік бірлігі — нейрон. Ол сигналдарды қабылдауға, өңдеуге және беруге маманданған жасуша. Глия жасушалары нейрондардың қызметін қолдайды, олардың айналасындағы ортаның тұрақтылығын сақтауға және миелин қабықшаларын түзуге қатысады."
                }
            ]
        },
        {
            title: "2. Жүйке жүйесінің негізгі қызметтері",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Ақпаратты қабылдау.",
                        "Жүйке сигналдарын өткізу.",
                        "Ақпаратты талдау және интеграциялау.",
                        "Қимыл-қозғалыс жауаптарын қалыптастыру.",
                        "Вегетативтік қызметтерді реттеу.",
                        "Ішкі мүшелердің жұмысын үйлестіру.",
                        "Гомеостазды сақтау.",
                        "Жоғары жүйке қызметін қамтамасыз ету."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Жүйке жүйесі сигналдарды жай ғана өткізбейді: организмнің күйі мен бұрынғы тәжірибесін ескере отырып, ақпаратты талдайды және оған сәйкес жауап қалыптастырады. Мысалы, ыстық затқа жанасқанда қол тез тартып алынады, ал ақпараттың мида өңделуі ауырсынуды саналы түрде сезінуге және кейінгі мінез-құлықты өзгертуге мүмкіндік береді."
                },
                {
                    type: "paragraph",
                    text: "Гомеостаз — организмнің ішкі ортасының салыстырмалы тұрақтылығын сақтау. Жүйке жүйесі эндокриндік және жергілікті механизмдермен бірлесіп, қан айналымын, тыныс алуды және дене температурасын реттеуге қатысады."
                }
            ]
        },
        {
            title: "3. Орталық және шеткі жүйке жүйесі",
            blocks: [
                {
                    type: "subheading",
                    text: "Орталық жүйке жүйесі (ОЖЖ)"
                },
                {
                    type: "list",
                    items: [
                        "Ми.",
                        "Жұлын."
                    ]
                },
                {
                    type: "paragraph",
                    text: "ОЖЖ келіп түскен сигналдарды өңдеп, біріктіреді, рефлекстік жауаптарды ұйымдастырады, қимыл-қозғалысты, ішкі мүшелердің жұмысын және жоғары жүйке қызметтерін реттеуге қатысады. Жұлын ақпаратты өткізумен қатар, бірқатар рефлекстерді жүзеге асыратын нейрондық желілерді қамтиды."
                },
                {
                    type: "subheading",
                    text: "Шеткі жүйке жүйесі (ШЖЖ)"
                },
                {
                    type: "list",
                    items: [
                        "Жүйкелер — организмнің әртүрлі құрылымдарын байланыстыратын жүйке талшықтарының шоғырлары.",
                        "Жүйке түйіндері (ганглийлер) — ОЖЖ-ден тыс орналасқан нейрон денелерінің шоғырлары.",
                        "Жүйке ұштары, соның ішінде сезімтал және қозғалтқыш ұштар.",
                        "ОЖЖ-нің мүшелермен және тіндермен байланысын қамтамасыз ететін басқа шеткі жүйкелік құрылымдар."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Афференттік (сезімтал) жолдар арқылы рецепторлардан ақпарат ОЖЖ-ге түседі. Эфференттік жолдар арқылы басқарушы сигналдар атқарушы мүшелерге — бұлшықеттер мен бездерге бағытталады. Әрекеттің нәтижесі туралы кері байланыс жауапты түзетуге мүмкіндік береді. Демек, ОЖЖ мен ШЖЖ біртұтас жүйенің өзара байланысты бөліктері ретінде қызмет етеді."
                }
            ]
        },
        {
            title: "4. Жүйке жүйесі қызметінің негізгі принциптері",
            blocks: [
                {
                    type: "subheading",
                    text: "Қозғыштық және қозуды өткізу"
                },
                {
                    type: "paragraph",
                    text: "Қозғыштық — жасушаның тітіркендіргішке мембрананың электрлік күйін өзгерту арқылы жауап беру қабілеті. Табалдырық деңгейіне жеткенде нейронда әрекет потенциалы пайда болуы мүмкін. Қозуды өткізу — электрлік сигналдың жүйке талшығының мембранасы бойымен таралуы. Миелинді аксондарда әрекет потенциалы Ранвье үзілістерінде кезекпен пайда болып, сигналдың берілуін жылдамдатады."
                },
                {
                    type: "subheading",
                    text: "Қозу және тежелу"
                },
                {
                    type: "paragraph",
                    text: "Қозу — жасушада электрлік жауаптың пайда болуымен байланысты белсенді үдеріс; синапстық өзара әрекеттесуде қоздырушы әсер әрекет потенциалының пайда болу ықтималдығын арттырады. Тежелу нейронда әрекет потенциалдарының пайда болу ықтималдығын немесе жиілігін төмендетеді. Ол қозудың жай ғана болмауы емес, белсенді реттеу механизмі болып табылады. Қоздырушы және тежеуші әсерлердің бірлескен әрекеті жүйкелік жауаптардың таңдамалылығы мен үйлесімділігін қамтамасыз етеді."
                },
                {
                    type: "subheading",
                    text: "Синапстық берілу"
                },
                {
                    type: "paragraph",
                    text: "Синапс — нейронның басқа жасушаға сигнал беруін қамтамасыз ететін маманданған түйісу аймағы. Химиялық синапста әрекет потенциалының пресинапстық ұшқа келуі кальций иондарының енуіне және нейромедиатордың бөлінуіне әкеледі. Медиатор постсинапстық мембрана рецепторларымен байланысып, жасушаның белсенділігін өзгертеді. Әсердің нәтижесі рецепторларға және олармен байланысты механизмдерге тәуелді. Электрлік синапстарда ток жасушалар арасында саңылаулы түйіспелер арқылы өтеді."
                },
                {
                    type: "subheading",
                    text: "Жүйкелік ақпараттың интеграциясы"
                },
                {
                    type: "paragraph",
                    text: "Нейрон уақыт пен кеңістік бойынша өзара әрекеттесетін көптеген сигналдарды қабылдайды. Олардың жиынтық әсері жасушаның жауабын анықтайды. Нейрондық желілер деңгейінде ақпарат организмнің ағымдағы қажеттіліктерімен және бұрынғы тәжірибесімен салыстырылып, үйлесімді жауаптардың қалыптасуына мүмкіндік береді."
                },
                {
                    type: "callout",
                    title: "Негізгі идея",
                    text: "Жүйке жүйесі импульстерді жай ғана өткізбейді. Ол ақпаратты іріктейді, салыстырады және біріктіреді, содан кейін организмнің тиісті жауабын қалыптастырады."
                }
            ]
        },
        {
            title: "5. Нейрофизиологияның маңызы",
            blocks: [
                {
                    type: "paragraph",
                    text: "Нейрофизиология жүйке жүйесінің қызмет ету механизмдері мен заңдылықтарын өзара байланысты бірнеше деңгейде зерттейді:"
                },
                {
                    type: "list",
                    items: [
                        "Мембраналық деңгей: иондық арналар, мембраналық потенциал және электрлік сигналдар.",
                        "Жасушалық деңгей: жеке нейрондардың қозғыштығы мен қызметі, олардың глиямен өзара әрекеттесуі.",
                        "Синапстық деңгей: жасушалар арасындағы сигналдардың берілуі және осы берілудің тиімділігінің өзгеруі.",
                        "Нейрондық желілер деңгейі: нейрон топтарының өзара әрекеттесуі және ақпаратты өңдеуі.",
                        "Жүйелік деңгей: сенсорлық, қозғалтқыш және вегетативтік қызметтердің ұйымдасуы.",
                        "Интегративтік деңгей: организм қызметтерінің үйлесуі, мінез-құлық пен бейімделудің қалыптасуы."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Бұл білім сенсорлық жүйелердің тітіркендіргіштерді қалай қабылдайтынын, қимыл-қозғалысты басқару мен вегетативтік реттелудің қалай жүзеге асатынын түсінуге мүмкіндік береді. Сондай-ақ ол нейрондық желілер қызметінің өзгерістерімен және синапстық пластикалылықпен байланысты мінез-құлықты, есте сақтауды және үйренуді зерттеуге негіз болады."
                },
                {
                    type: "paragraph",
                    text: "Қалыпты механизмдерді білу жүйке жүйесінің патофизиологиясын зерттеу үшін қажет: ол қозғыштықтың, қозуды өткізудің немесе синапстық берілудің бұзылыстары қызметтік өзгерістерге қалай әкелетінін түсіндіруге көмектеседі."
                }
            ]
        }
    ],
    outcomes: {
        title: "6. Оқу нәтижелері",
        introduction: "Бөлімді меңгергеннен кейін студент:",
        items: [
            "Жүйке жүйесінің негізгі қызметтерін түсіндіре алады.",
            "Орталық және шеткі жүйке жүйесін ажырата алады.",
            "Жүйкелік ақпарат интеграциясының маңызын түсінеді.",
            "Қозу мен тежелудің маңызын түсіндіреді.",
            "Синапстық берілудің негізгі принциптерін түсінеді.",
            "Нейрофизиологияның пәні мен міндеттерін анықтай алады."
        ]
    },
    terms: {
        title: "Негізгі терминдер",
        items: [
            "Жүйке жүйесі",
            "ОЖЖ",
            "ШЖЖ",
            "Нейрон",
            "Қозғыштық",
            "Қозу",
            "Тежелу",
            "Синапс",
            "Синапстық берілу",
            "Жүйкелік ақпараттың интеграциясы",
            "Гомеостаз",
            "Нейрофизиология"
        ]
    }
};
const __TURBOPACK__default__export__ = lesson;
}),
"[project]/content/modules/1/theory/ru.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const lesson = {
    title: "Модуль 1. Введение в нейрофизиологию",
    sections: [
        {
            title: "1. Общая характеристика нервной системы",
            blocks: [
                {
                    type: "paragraph",
                    text: "Нервная система представляет собой сложную функциональную систему, обеспечивающую восприятие, передачу, обработку и интеграцию информации, поступающей из внешней и внутренней среды организма."
                },
                {
                    type: "paragraph",
                    text: "Она координирует деятельность органов и функциональных систем, обеспечивает адаптацию организма к изменяющимся условиям среды и участвует в формировании поведения."
                },
                {
                    type: "paragraph",
                    text: "Основной структурно-функциональной единицей нервной системы является нейрон — специализированная клетка, принимающая, обрабатывающая и передающая сигналы. Глиальные клетки поддерживают работу нейронов, участвуют в поддержании среды вокруг них и формировании миелиновых оболочек."
                }
            ]
        },
        {
            title: "2. Основные функции нервной системы",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Восприятие информации.",
                        "Проведение нервных сигналов.",
                        "Анализ и интеграция информации.",
                        "Формирование двигательных реакций.",
                        "Регуляция вегетативных функций.",
                        "Координация деятельности внутренних органов.",
                        "Поддержание гомеостаза.",
                        "Обеспечение высшей нервной деятельности."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Нервная система не просто передаёт сигналы: она анализирует их с учётом состояния организма и предшествующего опыта и формирует адекватную ответную реакцию. Например, прикосновение к горячему предмету вызывает быстрое отдёргивание руки, а обработка информации в головном мозге обеспечивает осознанное восприятие боли и последующее изменение поведения."
                },
                {
                    type: "paragraph",
                    text: "Гомеостаз — это поддержание относительного постоянства внутренней среды. Нервная система совместно с эндокринными и местными механизмами регулирует, например, кровообращение, дыхание и температуру тела."
                }
            ]
        },
        {
            title: "3. Центральная и периферическая нервная система",
            blocks: [
                {
                    type: "subheading",
                    text: "Центральная нервная система (ЦНС)"
                },
                {
                    type: "list",
                    items: [
                        "Головной мозг.",
                        "Спинной мозг."
                    ]
                },
                {
                    type: "paragraph",
                    text: "ЦНС обрабатывает и интегрирует поступающие сигналы, организует рефлекторные реакции и участвует в регуляции движений, деятельности внутренних органов и высших нервных функций. Спинной мозг не только проводит информацию, но и содержит нейронные сети, обеспечивающие ряд рефлексов."
                },
                {
                    type: "subheading",
                    text: "Периферическая нервная система (ПНС)"
                },
                {
                    type: "list",
                    items: [
                        "Нервы — пучки нервных волокон, связывающие различные структуры организма.",
                        "Нервные узлы (ганглии) — скопления тел нейронов вне ЦНС.",
                        "Нервные окончания, в том числе чувствительные и двигательные.",
                        "Другие периферические нервные структуры, обеспечивающие связь ЦНС с органами и тканями."
                    ]
                },
                {
                    type: "paragraph",
                    text: "По афферентным (чувствительным) путям информация от рецепторов поступает в ЦНС. По эфферентным путям команды направляются к исполнительным органам — мышцам и железам. Обратная связь о результате действия позволяет корректировать ответ. Таким образом, ЦНС и ПНС работают как взаимосвязанные части единой системы."
                }
            ]
        },
        {
            title: "4. Основные принципы работы нервной системы",
            blocks: [
                {
                    type: "subheading",
                    text: "Возбудимость и проведение возбуждения"
                },
                {
                    type: "paragraph",
                    text: "Возбудимость — способность клетки отвечать на раздражение изменением электрического состояния мембраны. При достижении порога в нейроне может возникнуть потенциал действия. Проведение возбуждения — распространение электрического сигнала по мембране нервного волокна; в миелинизированных аксонах потенциал действия последовательно возникает в перехватах Ранвье, что ускоряет передачу сигнала."
                },
                {
                    type: "subheading",
                    text: "Возбуждение и торможение"
                },
                {
                    type: "paragraph",
                    text: "Возбуждение — активный процесс, связанный с возникновением электрического ответа клетки; в синаптическом взаимодействии возбуждающее влияние повышает вероятность генерации потенциала действия. Торможение снижает вероятность или частоту разрядов нейрона. Оно является активным механизмом регуляции, а не просто отсутствием возбуждения. Совместное действие возбуждающих и тормозных влияний обеспечивает избирательность и согласованность нервных реакций."
                },
                {
                    type: "subheading",
                    text: "Синаптическая передача"
                },
                {
                    type: "paragraph",
                    text: "Синапс — специализированный контакт, через который нейрон передаёт сигнал другой клетке. В химическом синапсе приход потенциала действия к пресинаптическому окончанию вызывает вход ионов кальция и выделение нейромедиатора. Медиатор связывается с рецепторами постсинаптической мембраны и изменяет активность клетки. Результат зависит от рецепторов и связанных с ними механизмов. В электрических синапсах ток проходит между клетками через щелевые контакты."
                },
                {
                    type: "subheading",
                    text: "Интеграция нервной информации"
                },
                {
                    type: "paragraph",
                    text: "Нейрон получает множество сигналов, которые взаимодействуют во времени и пространстве. Их суммарное действие определяет ответ клетки. На уровне нейронных сетей информация сопоставляется с текущими потребностями организма и предшествующим опытом, что позволяет формировать согласованные реакции."
                },
                {
                    type: "callout",
                    title: "Ключевая идея",
                    text: "Нервная система не просто проводит импульсы. Она отбирает, сравнивает и интегрирует информацию, после чего формирует соответствующую реакцию организма."
                }
            ]
        },
        {
            title: "5. Значение нейрофизиологии",
            blocks: [
                {
                    type: "paragraph",
                    text: "Нейрофизиология изучает механизмы функционирования нервной системы и закономерности её деятельности на нескольких взаимосвязанных уровнях:"
                },
                {
                    type: "list",
                    items: [
                        "Мембранный: ионные каналы, мембранный потенциал и электрические сигналы.",
                        "Клеточный: возбудимость и деятельность отдельных нейронов, их взаимодействие с глией.",
                        "Синаптический: передача сигналов между клетками и изменение эффективности этой передачи.",
                        "Уровень нейронных сетей: взаимодействие групп нейронов и обработка информации.",
                        "Системный: организация сенсорных, двигательных и вегетативных функций.",
                        "Интегративный: согласование функций организма, формирование поведения и адаптации."
                    ]
                },
                {
                    type: "paragraph",
                    text: "Эти знания позволяют понять, как сенсорные системы воспринимают раздражители, как осуществляется двигательный контроль и вегетативная регуляция. Они также служат основой изучения поведения, памяти и обучения, связанных с изменениями работы нейронных сетей и синаптической пластичностью."
                },
                {
                    type: "paragraph",
                    text: "Знание нормальных механизмов необходимо для изучения патофизиологии нервной системы: оно помогает объяснять, как нарушения возбудимости, проведения или синаптической передачи приводят к расстройствам функций."
                }
            ]
        }
    ],
    outcomes: {
        title: "6. Результаты обучения",
        introduction: "После изучения раздела студент должен уметь:",
        items: [
            "Объяснять основные функции нервной системы.",
            "Различать центральную и периферическую нервную систему.",
            "Объяснять значение интеграции нервной информации.",
            "Объяснять роль возбуждения и торможения.",
            "Понимать основные принципы синаптической передачи.",
            "Определять предмет и задачи нейрофизиологии."
        ]
    },
    terms: {
        title: "Ключевые термины",
        items: [
            "Нервная система",
            "ЦНС",
            "ПНС",
            "Нейрон",
            "Возбуждение",
            "Торможение",
            "Синапс",
            "Интеграция",
            "Гомеостаз",
            "Нейрофизиология"
        ]
    }
};
const __TURBOPACK__default__export__ = lesson;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0m3ccwr._.js.map