module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/CourseLayout.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "languages": "CourseLayout-module__izAQ5a__languages",
  "navigation": "CourseLayout-module__izAQ5a__navigation",
  "page": "CourseLayout-module__izAQ5a__page",
  "title": "CourseLayout-module__izAQ5a__title",
});
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CourseNavigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CourseNavigation.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DocumentLanguage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DocumentLanguage.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/interface.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/CourseLayout.module.css [app-rsc] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/course.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/sections.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
const ui = {
    RU: {
        back: "← К содержанию курса",
        eyebrow: "ИНТЕРАКТИВНЫЙ УЧЕБНИК ПО НЕЙРОФИЗИОЛОГИИ",
        module: "Модуль",
        author: "Автор",
        authorName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interfaceText"].RU.authorName,
        intro: "Выберите раздел модуля. Материалы организованы от целей обучения и входной диагностики к теории, клиническому применению, практике и контролю знаний.",
        structure: "Структура модуля",
        sectionCount: "17 учебных разделов"
    },
    KZ: {
        back: "← Курс мазмұнына",
        eyebrow: "НЕЙРОФИЗИОЛОГИЯ БОЙЫНША ИНТЕРАКТИВТІ ОҚУЛЫҚ",
        module: "Модуль",
        author: "Автор",
        authorName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interfaceText"].KZ.authorName,
        intro: "Модуль бөлімін таңдаңыз. Материалдар оқу мақсаттары мен бастапқы диагностикадан теорияға, клиникалық қолдануға, практикаға және білімді бақылауға дейін ұйымдастырылған.",
        structure: "Модуль құрылымы",
        sectionCount: "17 оқу бөлімі"
    },
    EN: {
        back: "← Back to Course Contents",
        eyebrow: "INTERACTIVE TEXTBOOK OF NEUROPHYSIOLOGY",
        module: "Module",
        author: "Author",
        authorName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interfaceText"].EN.authorName,
        intro: "Choose a module section. The learning materials progress from objectives and initial diagnostics to theory, clinical application, practice, and knowledge assessment.",
        structure: "Module Structure",
        sectionCount: "17 learning sections"
    }
};
async function ModulePage({ params, searchParams }) {
    const { id } = await params;
    const { lang: requestedLang } = await searchParams;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isModuleId"])(id)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const moduleNumber = Number(id);
    const rawLang = Array.isArray(requestedLang) ? requestedLang[0] : requestedLang;
    const lang = rawLang === "KZ" || rawLang === "EN" ? rawLang : "RU";
    const moduleTitle = __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modules"][lang][moduleNumber - 1];
    if (!moduleTitle) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const t = ui[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].page,
        id: "top",
        style: {
            minHeight: "100vh",
            padding: "28px 36px 60px",
            background: "linear-gradient(180deg, #f2f7fb 0%, #eef5f9 100%)",
            color: "#003f73"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DocumentLanguage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                language: lang
            }, void 0, false, {
                fileName: "[project]/app/modules/[id]/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                lang: lang === "KZ" ? "kk" : lang.toLowerCase(),
                style: {
                    maxWidth: "1500px",
                    margin: "0 auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                            marginBottom: "28px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/?lang=${lang}#course`,
                                style: {
                                    color: "#005b96",
                                    fontWeight: 700,
                                    textDecoration: "none"
                                },
                                children: t.back
                            }, void 0, false, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interfaceText"][lang].language,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].languages,
                                style: {
                                    display: "flex",
                                    gap: "10px"
                                },
                                children: [
                                    "RU",
                                    "KZ",
                                    "EN"
                                ].map((code)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/modules/${moduleNumber}?lang=${code}`,
                                        "aria-current": lang === code ? "page" : undefined,
                                        style: {
                                            minWidth: "70px",
                                            padding: "9px 18px",
                                            borderRadius: "10px",
                                            textAlign: "center",
                                            textDecoration: "none",
                                            fontWeight: 700,
                                            border: lang === code ? "1px solid #0067a5" : "1px solid #d4e2eb",
                                            background: lang === code ? "#0067a5" : "#ffffff",
                                            color: lang === code ? "#ffffff" : "#526b80"
                                        },
                                        children: code
                                    }, code, false, {
                                        fileName: "[project]/app/modules/[id]/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/modules/[id]/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                        style: {
                            background: "#ffffff",
                            border: "1px solid #d5e3ec",
                            borderRadius: "24px",
                            padding: "48px",
                            boxShadow: "0 6px 20px rgba(31, 77, 107, 0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "0 0 18px",
                                    color: "#1373a6",
                                    fontSize: "13px",
                                    fontWeight: 800,
                                    letterSpacing: "1.5px"
                                },
                                children: t.eyebrow
                            }, void 0, false, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: "0 0 14px",
                                    color: "#064a73",
                                    fontSize: "clamp(2rem, 4vw, 3rem)",
                                    lineHeight: 1.15
                                },
                                children: [
                                    t.module,
                                    " ",
                                    moduleNumber,
                                    ".",
                                    " ",
                                    moduleTitle
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "0 0 24px",
                                    color: "#597185",
                                    fontWeight: 700
                                },
                                children: [
                                    t.author,
                                    ": ",
                                    t.authorName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    maxWidth: "1000px",
                                    margin: "0 0 28px",
                                    color: "#526b80",
                                    lineHeight: 1.8
                                },
                                children: t.intro
                            }, void 0, false, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "10px",
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            padding: "8px 13px",
                                            borderRadius: "999px",
                                            background: "#e9f4f9",
                                            color: "#14739d",
                                            fontWeight: 700,
                                            fontSize: "14px"
                                        },
                                        children: t.structure
                                    }, void 0, false, {
                                        fileName: "[project]/app/modules/[id]/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            padding: "8px 13px",
                                            borderRadius: "999px",
                                            background: "#edf7f1",
                                            color: "#367c55",
                                            fontWeight: 700,
                                            fontSize: "14px"
                                        },
                                        children: t.sectionCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/modules/[id]/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/modules/[id]/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-label": t.structure,
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
                            gap: "18px",
                            marginTop: "28px"
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sections"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/modules/${moduleNumber}/${item.slug}?lang=${lang}`,
                                style: {
                                    display: "block",
                                    minHeight: "165px",
                                    padding: "22px",
                                    background: "#ffffff",
                                    border: "1px solid #d6e3eb",
                                    borderRadius: "17px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 12px rgba(0, 60, 100, 0.04)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "14px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": "true",
                                            style: {
                                                width: "46px",
                                                height: "46px",
                                                flexShrink: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "13px",
                                                background: "#f0f7fa",
                                                fontSize: "23px"
                                            },
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/app/modules/[id]/page.tsx",
                                            lineNumber: 323,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "7px",
                                                        color: "#7790a4",
                                                        fontSize: "12px",
                                                        fontWeight: 800
                                                    },
                                                    children: String(index + 1).padStart(2, "0")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modules/[id]/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        margin: "0 0 9px",
                                                        color: "#004b78",
                                                        fontSize: "17px",
                                                        lineHeight: 1.3
                                                    },
                                                    children: item.title[lang]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modules/[id]/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        margin: 0,
                                                        color: "#61798b",
                                                        lineHeight: 1.55,
                                                        fontSize: "14px"
                                                    },
                                                    children: item.description[lang]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modules/[id]/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modules/[id]/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modules/[id]/page.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this)
                            }, item.slug, false, {
                                fileName: "[project]/app/modules/[id]/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/modules/[id]/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CourseNavigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        moduleNumber: moduleNumber,
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/app/modules/[id]/page.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/modules/[id]/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/modules/[id]/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/modules/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/modules/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/CourseNavigation.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/interface.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/CourseLayout.module.css [app-rsc] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/course.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/sections.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
const labels = {
    RU: {
        previousSection: "Предыдущий раздел",
        nextSection: "Следующий раздел",
        previousModule: "Предыдущий модуль",
        nextModule: "Следующий модуль",
        moduleHome: "Титул модуля",
        courseHome: "Содержание курса",
        top: "Наверх",
        module: "Модуль"
    },
    KZ: {
        previousSection: "Алдыңғы бөлім",
        nextSection: "Келесі бөлім",
        previousModule: "Алдыңғы модуль",
        nextModule: "Келесі модуль",
        moduleHome: "Модуль беті",
        courseHome: "Курс мазмұны",
        top: "Жоғары",
        module: "Модуль"
    },
    EN: {
        previousSection: "Previous section",
        nextSection: "Next section",
        previousModule: "Previous module",
        nextModule: "Next module",
        moduleHome: "Module home",
        courseHome: "Course contents",
        top: "Back to top",
        module: "Module"
    }
};
function CourseNavigation({ moduleNumber, lang, currentSection }) {
    const t = labels[lang];
    const hasPreviousModule = moduleNumber > 1;
    const hasNextModule = moduleNumber < __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$course$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MODULE_COUNT"];
    /*
    Если currentSection передан,
    значит студент находится внутри одного
    из 17 разделов.
  */ const sectionIndex = currentSection ? __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sectionOrder"].indexOf(currentSection) : -1;
    const isInsideSection = sectionIndex !== -1;
    const previousSection = isInsideSection && sectionIndex > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sectionOrder"][sectionIndex - 1] : null;
    const nextSection = isInsideSection && sectionIndex < __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sectionOrder"].length - 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sectionOrder"][sectionIndex + 1] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interfaceText"][lang].navigation,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$CourseLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].navigation,
        style: {
            marginTop: "40px",
            padding: "22px",
            background: "#ffffff",
            border: "1px solid #d7e5ed",
            borderRadius: "20px",
            boxShadow: "0 6px 20px rgba(28, 72, 102, 0.07)"
        },
        children: [
            isInsideSection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gap: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: previousSection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/modules/${moduleNumber}/${previousSection}?lang=${lang}`,
                                    style: {
                                        display: "flex",
                                        height: "100%",
                                        boxSizing: "border-box",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        padding: "15px",
                                        borderRadius: "13px",
                                        background: "#f4f8fb",
                                        border: "1px solid #d7e5ed",
                                        color: "#005b96",
                                        textDecoration: "none"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#71899a",
                                                marginBottom: "5px"
                                            },
                                            children: [
                                                "← ",
                                                t.previousSection
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CourseNavigation.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSectionTitle"])(previousSection, lang)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CourseNavigation.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 160,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CourseNavigation.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/modules/${moduleNumber}?lang=${lang}`,
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    padding: "15px",
                                    borderRadius: "13px",
                                    background: "#005b96",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    textDecoration: "none"
                                },
                                children: [
                                    "📚 ",
                                    t.moduleHome
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CourseNavigation.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: nextSection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/modules/${moduleNumber}/${nextSection}?lang=${lang}`,
                                    style: {
                                        display: "flex",
                                        height: "100%",
                                        boxSizing: "border-box",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                        textAlign: "right",
                                        padding: "15px",
                                        borderRadius: "13px",
                                        background: "#f4f8fb",
                                        border: "1px solid #d7e5ed",
                                        color: "#005b96",
                                        textDecoration: "none"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#71899a",
                                                marginBottom: "5px"
                                            },
                                            children: [
                                                t.nextSection,
                                                " →"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CourseNavigation.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSectionTitle"])(nextSection, lang)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CourseNavigation.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 224,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CourseNavigation.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: "22px 0",
                            borderTop: "1px solid #e3edf2"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CourseNavigation.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: hasPreviousModule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/modules/${moduleNumber - 1}?lang=${lang}`,
                            style: {
                                display: "flex",
                                height: "100%",
                                boxSizing: "border-box",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "15px",
                                borderRadius: "13px",
                                background: "#f4f8fb",
                                border: "1px solid #d7e5ed",
                                color: "#005b96",
                                textDecoration: "none"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#71899a",
                                        marginBottom: "5px"
                                    },
                                    children: [
                                        "← ",
                                        t.previousModule
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        t.module,
                                        " ",
                                        moduleNumber - 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CourseNavigation.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/components/CourseNavigation.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/?lang=${lang}`,
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "15px",
                            borderRadius: "13px",
                            background: "#eaf5fa",
                            border: "1px solid #cfe4ee",
                            color: "#005b96",
                            fontWeight: 700,
                            textDecoration: "none"
                        },
                        children: [
                            "🏠 ",
                            t.courseHome
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: hasNextModule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/modules/${moduleNumber + 1}?lang=${lang}`,
                            style: {
                                display: "flex",
                                height: "100%",
                                boxSizing: "border-box",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                                textAlign: "right",
                                padding: "15px",
                                borderRadius: "13px",
                                background: "#f4f8fb",
                                border: "1px solid #d7e5ed",
                                color: "#005b96",
                                textDecoration: "none"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#71899a",
                                        marginBottom: "5px"
                                    },
                                    children: [
                                        t.nextModule,
                                        " →"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 338,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        t.module,
                                        " ",
                                        moduleNumber + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CourseNavigation.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CourseNavigation.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/components/CourseNavigation.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CourseNavigation.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "18px",
                    paddingTop: "16px",
                    borderTop: "1px solid #e3edf2"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/?lang=${lang}`,
                        style: {
                            color: "#617b8d",
                            fontSize: "14px",
                            textDecoration: "none"
                        },
                        children: [
                            "🏠 ",
                            t.courseHome
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/modules/${moduleNumber}?lang=${lang}`,
                        style: {
                            color: "#617b8d",
                            fontSize: "14px",
                            textDecoration: "none"
                        },
                        children: [
                            "📚 ",
                            t.module,
                            " ",
                            moduleNumber
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#top",
                        style: {
                            color: "#617b8d",
                            fontSize: "14px",
                            textDecoration: "none"
                        },
                        children: [
                            "↑ ",
                            t.top
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CourseNavigation.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CourseNavigation.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CourseNavigation.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/DocumentLanguage.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/DocumentLanguage.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/DocumentLanguage.tsx", "default");
}),
"[project]/components/DocumentLanguage.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/DocumentLanguage.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/DocumentLanguage.tsx <module evaluation>", "default");
}),
"[project]/components/DocumentLanguage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DocumentLanguage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/DocumentLanguage.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DocumentLanguage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/DocumentLanguage.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DocumentLanguage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
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
"[project]/content/sections.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSectionTitle",
    ()=>getSectionTitle,
    "isSection",
    ()=>isSection,
    "sectionOrder",
    ()=>sectionOrder,
    "sections",
    ()=>sections
]);
const sections = [
    {
        slug: "objectives",
        icon: "🎯",
        title: {
            RU: "Цели обучения",
            KZ: "Оқу мақсаттары",
            EN: "Learning Objectives"
        },
        description: {
            RU: "Что вы будете знать и уметь после изучения модуля",
            KZ: "Модульді оқығаннан кейін нені білу және істей алу керек",
            EN: "What you should know and be able to do after this module"
        }
    },
    {
        slug: "pretest",
        icon: "⚡",
        title: {
            RU: "Входной блиц-тест",
            KZ: "Кіріспе блиц-тест",
            EN: "Pre-module Quick Test"
        },
        description: {
            RU: "Короткая диагностика исходных знаний без оценки",
            KZ: "Бағасыз бастапқы білімді қысқаша диагностикалау",
            EN: "A short diagnostic check of prior knowledge without grading"
        }
    },
    {
        slug: "theory",
        icon: "📖",
        title: {
            RU: "Теория",
            KZ: "Теория",
            EN: "Theory"
        },
        description: {
            RU: "Основной учебный материал модуля",
            KZ: "Модульдің негізгі оқу материалы",
            EN: "Core learning material for the module"
        }
    },
    {
        slug: "one-minute",
        icon: "⏱️",
        title: {
            RU: "Ключевое за 1 минуту",
            KZ: "1 минуттағы негізгі ойлар",
            EN: "Key Points in 1 Minute"
        },
        description: {
            RU: "Самые важные идеи модуля в краткой форме",
            KZ: "Модульдің ең маңызды идеялары қысқаша түрде",
            EN: "The most important ideas of the module at a glance"
        }
    },
    {
        slug: "clinical",
        icon: "🩺",
        title: {
            RU: "Клинический мост",
            KZ: "Клиникалық көпір",
            EN: "Clinical Bridge"
        },
        description: {
            RU: "Связь физиологических механизмов с клинической практикой",
            KZ: "Физиологиялық механизмдердің клиникалық тәжірибемен байланысы",
            EN: "Connecting physiological mechanisms with clinical practice"
        }
    },
    {
        slug: "interactive",
        icon: "🧠",
        title: {
            RU: "Интерактивные схемы",
            KZ: "Интерактивті сызбалар",
            EN: "Interactive Diagrams"
        },
        description: {
            RU: "Схемы и визуальные модели для понимания процессов",
            KZ: "Процестерді түсінуге арналған сызбалар мен көрнекі модельдер",
            EN: "Diagrams and visual models for understanding key processes"
        }
    },
    {
        slug: "practice",
        icon: "🧪",
        title: {
            RU: "Практика",
            KZ: "Практика",
            EN: "Practice"
        },
        description: {
            RU: "Практические задания для закрепления материала",
            KZ: "Материалды бекітуге арналған практикалық тапсырмалар",
            EN: "Practice activities to reinforce learning"
        }
    },
    {
        slug: "cases",
        icon: "📋",
        title: {
            RU: "Ситуационные задачи",
            KZ: "Ситуациялық тапсырмалар",
            EN: "Case Problems"
        },
        description: {
            RU: "Разбор учебных и клинических ситуаций",
            KZ: "Оқу және клиникалық жағдайларды талдау",
            EN: "Analysis of learning and clinical scenarios"
        }
    },
    {
        slug: "tests",
        icon: "📝",
        title: {
            RU: "Ветвящиеся тесты",
            KZ: "Тармақталған тесттер",
            EN: "Branching Tests"
        },
        description: {
            RU: "Тесты с разными траекториями в зависимости от ответа",
            KZ: "Жауапқа байланысты әртүрлі бағыттары бар тесттер",
            EN: "Adaptive question paths based on your answers"
        }
    },
    {
        slug: "questions",
        icon: "❓",
        title: {
            RU: "Контрольные вопросы",
            KZ: "Бақылау сұрақтары",
            EN: "Review Questions"
        },
        description: {
            RU: "Вопросы для самопроверки и контроля знаний",
            KZ: "Өзін-өзі тексеруге және білімді бақылауға арналған сұрақтар",
            EN: "Questions for self-assessment and knowledge review"
        }
    },
    {
        slug: "virtual-patient",
        icon: "👤",
        title: {
            RU: "Виртуальный пациент",
            KZ: "Виртуалды пациент",
            EN: "Virtual Patient"
        },
        description: {
            RU: "Интерактивный клинический сценарий с принятием решений",
            KZ: "Шешім қабылдауға арналған интерактивті клиникалық сценарий",
            EN: "An interactive clinical scenario with decision-making"
        }
    },
    {
        slug: "media",
        icon: "🎬",
        title: {
            RU: "Медиа",
            KZ: "Медиа",
            EN: "Media"
        },
        description: {
            RU: "Видео, изображения, анимации и дополнительные материалы",
            KZ: "Бейне, суреттер, анимациялар және қосымша материалдар",
            EN: "Video, images, animations, and supplementary materials"
        }
    },
    {
        slug: "glossary",
        icon: "📚",
        title: {
            RU: "Глоссарий",
            KZ: "Глоссарий",
            EN: "Glossary"
        },
        description: {
            RU: "Основные термины и определения модуля",
            KZ: "Модульдің негізгі терминдері мен анықтамалары",
            EN: "Key terms and definitions for the module"
        }
    },
    {
        slug: "voice",
        icon: "🔊",
        title: {
            RU: "Голосовое сопровождение",
            KZ: "Дауыстық сүйемелдеу",
            EN: "Audio Guide"
        },
        description: {
            RU: "Аудиосопровождение учебных материалов",
            KZ: "Оқу материалдарының аудио сүйемелдеуі",
            EN: "Audio support for the learning materials"
        }
    },
    {
        slug: "progress",
        icon: "⭐",
        title: {
            RU: "Мой прогресс",
            KZ: "Менің прогресім",
            EN: "My Progress"
        },
        description: {
            RU: "Результаты, ошибки и персональные рекомендации",
            KZ: "Нәтижелер, қателер және жеке ұсыныстар",
            EN: "Results, mistakes, and personalized recommendations"
        }
    },
    {
        slug: "notes",
        icon: "🔖",
        title: {
            RU: "Закладки и заметки",
            KZ: "Бетбелгілер мен жазбалар",
            EN: "Bookmarks and Notes"
        },
        description: {
            RU: "Сохранение важных фрагментов и собственных заметок",
            KZ: "Маңызды бөліктер мен жеке жазбаларды сақтау",
            EN: "Save important content and your own notes"
        }
    },
    {
        slug: "references",
        icon: "📑",
        title: {
            RU: "Источники и литература",
            KZ: "Дереккөздер мен әдебиеттер",
            EN: "References"
        },
        description: {
            RU: "Научные источники и рекомендуемая литература",
            KZ: "Ғылыми дереккөздер және ұсынылатын әдебиеттер",
            EN: "Scientific sources and recommended reading"
        }
    }
];
const sectionOrder = sections.map((section)=>section.slug);
function isSection(value) {
    return sections.some((section)=>section.slug === value);
}
function getSectionTitle(section, language) {
    return sections.find((item)=>item.slug === section).title[language];
}
}),
"[project]/lib/interface.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "htmlLanguage",
    ()=>htmlLanguage,
    "interfaceText",
    ()=>interfaceText,
    "normalizeLanguage",
    ()=>normalizeLanguage
]);
function normalizeLanguage(value) {
    const code = Array.isArray(value) ? value[0] : value;
    return code === "EN" || code === "KZ" ? code : "RU";
}
const htmlLanguage = {
    RU: "ru",
    EN: "en",
    KZ: "kk"
};
const interfaceText = {
    RU: {
        language: "Язык",
        navigation: "Навигация по курсу",
        author: "Автор",
        authorName: "Нурия Мансуровна Харисова"
    },
    EN: {
        language: "Language",
        navigation: "Course navigation",
        author: "Author",
        authorName: "Nuriya Mansurovna Kharissova"
    },
    KZ: {
        language: "Тіл",
        navigation: "Курс бойынша навигация",
        author: "Автор",
        authorName: "Нурия Мансуровна Харисова"
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1d0g70m._.js.map