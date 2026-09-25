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
                    lineNumber: 31,
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
                            lineNumber: 34,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                lesson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                color: "#004b87",
                                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                                lineHeight: 1.3
                            },
                            children: lesson.title
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 39,
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
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            lesson: lesson
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 38,
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
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: t.pending
                        }, void 0, false, {
                            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modules/[id]/[section]/page.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/modules/[id]/[section]/page.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/modules/[id]/[section]/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/modules/[id]/[section]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/modules/[id]/[section]/page.tsx [app-rsc] (ecmascript)"));
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
"[project]/content/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLesson",
    ()=>getLesson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$ru$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/ru.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$kz$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/kz.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$theory$2f$en$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/theory/en.ts [app-rsc] (ecmascript)");
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
        }
    }
};
function getLesson(moduleId, section, language) {
    return lessons[moduleId]?.[section]?.[language];
}
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1gkfw2q._.js.map