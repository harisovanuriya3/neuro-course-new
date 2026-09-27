module.exports = [
"[project]/components/BranchingTestContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "BranchingTestContent-module__EQiemG__actions",
  "correct": "BranchingTestContent-module__EQiemG__correct",
  "feedback": "BranchingTestContent-module__EQiemG__feedback",
  "metrics": "BranchingTestContent-module__EQiemG__metrics",
  "note": "BranchingTestContent-module__EQiemG__note",
  "option": "BranchingTestContent-module__EQiemG__option",
  "test": "BranchingTestContent-module__EQiemG__test",
});
}),
"[project]/components/BranchingTestContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BranchingTestContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tests$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tests/engine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/BranchingTestContent.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const labels = {
    RU: {
        retry: "Повторить ошибочные задания",
        retryResult: "Результат повторения",
        original: "Результат основного прохождения",
        answer: "Правильный ответ",
        retryNote: "Повторение не изменяет результат основного прохождения."
    },
    KZ: {
        retry: "Қате орындалған тапсырмаларды қайталау",
        retryResult: "Қайталау нәтижесі",
        original: "Негізгі өту нәтижесі",
        answer: "Дұрыс жауап",
        retryNote: "Қайталау негізгі өту нәтижесін өзгертпейді."
    },
    EN: {
        retry: "Retry incorrect questions",
        retryResult: "Retry result",
        original: "Original attempt result",
        answer: "Correct answer",
        retryNote: "Retrying does not change the original attempt result."
    }
};
function BranchingTestContent({ test, language }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])((state, action)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tests$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transition"])(test, state, action), test, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tests$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialState"]);
    const heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        heading.current?.focus();
    }, [
        state.current,
        state.phase
    ]);
    const ui = test.ui;
    const copy = labels[language];
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tests$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["summarize"])(test, state);
    const node = test.nodes[state.current];
    const attempts = state.retryIds === null ? state.attempts : state.retryAttempts;
    const last = attempts[attempts.length - 1];
    const canRetry = attempts.some((attempt)=>!attempt.correct);
    const theory = (target)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `/modules/${target.moduleId}/theory?lang=${language}#${target.anchor}`,
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
                ui.openTheory,
                " (",
                ui.newTab,
                ")"
            ]
        }, void 0, true, {
            fileName: "[project]/components/BranchingTestContent.tsx",
            lineNumber: 27,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].test,
        "data-testid": "branching-test",
        lang: language === "KZ" ? "kk" : language.toLowerCase(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: test.title
            }, void 0, false, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: ui.introduction
            }, void 0, false, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: [
                    ui.localNote,
                    " ",
                    ui.languageWarning
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    state.retryIds === null ? ui.mainProgress : copy.retry,
                    ": ",
                    state.retryIds === null ? result.mainAnswered : state.retryAttempts.length,
                    " / ",
                    state.retryIds === null ? result.total : state.retryIds.length
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            state.phase === "results" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "data-testid": "results",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: heading,
                        tabIndex: -1,
                        children: ui.complete
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: copy.original
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metrics,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: ui.firstAttempt
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 43,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            result.firstCorrect,
                                            " / ",
                                            result.total
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 43,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: ui.mastery
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 44,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            result.mastered,
                                            " / ",
                                            result.total
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 44,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: ui.recoveredCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 45,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: result.recovered
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 45,
                                        columnNumber: 46
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: ui.extraCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 46,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: result.additional
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 46,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: ui.remediationCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 47,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: result.remediations
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 47,
                                        columnNumber: 48
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: ui.resultNote
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    state.retryIds !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: copy.retryResult
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 50,
                                columnNumber: 58
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    state.retryAttempts.filter((attempt)=>attempt.correct).length,
                                    " / ",
                                    state.retryIds.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 50,
                                columnNumber: 85
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: copy.retryNote
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 50,
                                columnNumber: 181
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 50,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: ui.weakTopics
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    result.weak.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: result.weak.map((id)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    test.competencies[id].title,
                                    ": ",
                                    result.unresolved.includes(id) ? ui.needsReview : ui.recovered,
                                    ". ",
                                    theory(test.competencies[id].theoryTarget)
                                ]
                            }, id, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 52,
                                columnNumber: 60
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 52,
                        columnNumber: 33
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: ui.noWeakTopics
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 52,
                        columnNumber: 229
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                        children: [
                            canRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-action": "retry",
                                onClick: ()=>dispatch({
                                        type: "retry"
                                    }),
                                children: copy.retry
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 54,
                                columnNumber: 26
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-action": "restart",
                                onClick: ()=>dispatch({
                                        type: "restart"
                                    }),
                                children: ui.restart
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: ui.route
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 57,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                children: state.history.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: event.type === "review" ? `${ui.theoryVisit}: ${test.competencies[event.competency].title}` : `${test.nodes[event.attempt.nodeId].type === "question" ? test.competencies[event.attempt.competency].title : ""}: ${event.attempt.correct ? ui.correct : ui.reviewNeeded}`
                                    }, index, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 57,
                                        columnNumber: 90
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 57,
                                columnNumber: 49
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this) : node.type === "question" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "data-node": node.id,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            ui.competency,
                            ": ",
                            test.competencies[node.competency].title,
                            " · ",
                            node.level === "main" ? ui.mainQuestion : node.level === "basic" ? ui.basic : ui.additional
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: heading,
                        tabIndex: -1,
                        children: node.prompt
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        disabled: state.phase !== "question",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                children: ui.select
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            node.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].option,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "radio",
                                            name: node.id,
                                            value: option.id,
                                            checked: state.selected === option.id,
                                            onChange: ()=>dispatch({
                                                    type: "select",
                                                    answer: option.id
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/components/BranchingTestContent.tsx",
                                            lineNumber: 65,
                                            columnNumber: 90
                                        }, this),
                                        option.text
                                    ]
                                }, option.id, true, {
                                    fileName: "[project]/components/BranchingTestContent.tsx",
                                    lineNumber: 65,
                                    columnNumber: 41
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    state.phase === "question" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "data-action": "check",
                        disabled: state.selected === null,
                        onClick: ()=>dispatch({
                                type: "check"
                            }),
                        children: ui.check
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 67,
                        columnNumber: 41
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "status",
                                className: last.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].correct : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchingTestContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].feedback,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: last.correct ? ui.correct : ui.reviewNeeded
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            copy.answer,
                                            ": ",
                                            node.options.find((option)=>option.id === node.correctAnswer)?.text
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: node.explanation
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, this),
                                    !last.correct && node.level === "basic" && state.retryIds === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: ui.unresolvedFeedback
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchingTestContent.tsx",
                                        lineNumber: 73,
                                        columnNumber: 88
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-action": "continue",
                                onClick: ()=>dispatch({
                                        type: "continue"
                                    }),
                                children: ui.continue
                            }, void 0, false, {
                                fileName: "[project]/components/BranchingTestContent.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: theory(test.competencies[node.competency].theoryTarget)
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "data-node": node.id,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: heading,
                        tabIndex: -1,
                        children: node.depth === 1 ? ui.review : ui.detailedReview
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: node.text
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: theory(node.theoryTarget)
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "data-action": "continue",
                        onClick: ()=>dispatch({
                                type: "continue"
                            }),
                        children: ui.reviewed
                    }, void 0, false, {
                        fileName: "[project]/components/BranchingTestContent.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchingTestContent.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchingTestContent.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/CasesContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "CasesContent-module__AoXJVa__card",
  "cardHeader": "CasesContent-module__AoXJVa__cardHeader",
  "cases": "CasesContent-module__AoXJVa__cases",
  "choices": "CasesContent-module__AoXJVa__choices",
  "completed": "CasesContent-module__AoXJVa__completed",
  "completion": "CasesContent-module__AoXJVa__completion",
  "data": "CasesContent-module__AoXJVa__data",
  "diagram": "CasesContent-module__AoXJVa__diagram",
  "doneLink": "CasesContent-module__AoXJVa__doneLink",
  "eyebrow": "CasesContent-module__AoXJVa__eyebrow",
  "navigation": "CasesContent-module__AoXJVa__navigation",
  "progress": "CasesContent-module__AoXJVa__progress",
  "selected": "CasesContent-module__AoXJVa__selected",
  "sources": "CasesContent-module__AoXJVa__sources",
  "stage": "CasesContent-module__AoXJVa__stage",
});
}),
"[project]/components/CasesContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CasesContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cases$2f$CaseCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/cases/CaseCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/CasesContent.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
function CasesContent({ lesson }) {
    const [completed, setCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const ui = lesson.ui;
    function mark(id, done) {
        setCompleted((previous)=>done ? [
                ...new Set([
                    ...previous,
                    id
                ])
            ] : previous.filter((value)=>value !== id));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].practice} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cases}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: lesson.title
            }, void 0, false, {
                fileName: "[project]/components/CasesContent.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: lesson.introduction
            }, void 0, false, {
                fileName: "[project]/components/CasesContent.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: ui.note
            }, void 0, false, {
                fileName: "[project]/components/CasesContent.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progress,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        role: "status",
                        children: [
                            ui.progress,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    completed.length,
                                    " / ",
                                    lesson.cases.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CasesContent.tsx",
                                lineNumber: 23,
                                columnNumber: 41
                            }, this),
                            " ",
                            ui.completed
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CasesContent.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("progress", {
                        "aria-label": ui.progress,
                        value: completed.length,
                        max: lesson.cases.length
                    }, void 0, false, {
                        fileName: "[project]/components/CasesContent.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": ui.navigation,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navigation,
                        children: lesson.cases.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `#case-${item.id}`,
                                "aria-label": `${ui.case} ${index + 1}: ${item.title}${completed.includes(item.id) ? ` — ${ui.done}` : ""}`,
                                className: completed.includes(item.id) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].doneLink : undefined,
                                children: [
                                    index + 1,
                                    completed.includes(item.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: " ✓"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CasesContent.tsx",
                                        lineNumber: 28,
                                        columnNumber: 58
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/components/CasesContent.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CasesContent.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CasesContent.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            lesson.cases.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cases$2f$CaseCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    item: item,
                    number: index + 1,
                    ui: ui,
                    completed: completed.includes(item.id),
                    onComplete: (done)=>mark(item.id, done)
                }, item.id, false, {
                    fileName: "[project]/components/CasesContent.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)),
            lesson.sources && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sources,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: ui.sources
                    }, void 0, false, {
                        fileName: "[project]/components/CasesContent.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: lesson.sources.map((source)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: source.href,
                                    children: source.title
                                }, void 0, false, {
                                    fileName: "[project]/components/CasesContent.tsx",
                                    lineNumber: 38,
                                    columnNumber: 67
                                }, this)
                            }, source.href, false, {
                                fileName: "[project]/components/CasesContent.tsx",
                                lineNumber: 38,
                                columnNumber: 45
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CasesContent.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CasesContent.tsx",
                lineNumber: 36,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CasesContent.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/DocumentLanguage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/interface.ts [app-ssr] (ecmascript)");
"use client";
;
;
function DocumentLanguage({ language }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.documentElement.lang = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["htmlLanguage"][language];
    }, [
        language
    ]);
    return null;
}
}),
"[project]/components/InteractiveContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "InteractiveContent-module__Pyl5Xa__actions",
  "arrow": "InteractiveContent-module__Pyl5Xa__arrow",
  "branch": "InteractiveContent-module__Pyl5Xa__branch",
  "branches": "InteractiveContent-module__Pyl5Xa__branches",
  "card": "InteractiveContent-module__Pyl5Xa__card",
  "convergence": "InteractiveContent-module__Pyl5Xa__convergence",
  "explanation": "InteractiveContent-module__Pyl5Xa__explanation",
  "inputs": "InteractiveContent-module__Pyl5Xa__inputs",
  "interactive": "InteractiveContent-module__Pyl5Xa__interactive",
  "loop": "InteractiveContent-module__Pyl5Xa__loop",
  "neuron": "InteractiveContent-module__Pyl5Xa__neuron",
  "nodes": "InteractiveContent-module__Pyl5Xa__nodes",
  "note": "InteractiveContent-module__Pyl5Xa__note",
  "number": "InteractiveContent-module__Pyl5Xa__number",
  "returned": "InteractiveContent-module__Pyl5Xa__returned",
  "root": "InteractiveContent-module__Pyl5Xa__root",
  "sequence": "InteractiveContent-module__Pyl5Xa__sequence",
  "state": "InteractiveContent-module__Pyl5Xa__state",
  "theory": "InteractiveContent-module__Pyl5Xa__theory",
});
}),
"[project]/components/InteractiveContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteractiveContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/InteractiveContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InteractiveVisuals.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Explanation({ id, title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: id,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].explanation,
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 15,
                columnNumber: 5
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 14,
        columnNumber: 10
    }, this);
}
function Sequence({ id, nodes, ui, loop, language }) {
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [returned, setReturned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    function select(next) {
        setIndex(next);
        setReturned(false);
    }
    const current = nodes[index];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-sequence": id,
        children: [
            id === "pathway" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathwayVisual"], {
                nodes: nodes,
                selected: current.id,
                returned: returned,
                language: language,
                onSelect: (id)=>select(nodes.findIndex((node)=>node.id === id))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SynapseVisual"], {
                nodes: nodes,
                selected: current.id,
                electrical: id === "synapse-electrical",
                language: language,
                onSelect: (id)=>select(nodes.findIndex((node)=>node.id === id))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sequence,
                "aria-label": ui.select,
                children: nodes.map((node, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": index === i,
                                "aria-controls": `${id}-explanation`,
                                onClick: ()=>select(i),
                                "data-node": node.id,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].number,
                                        "aria-hidden": "true",
                                        children: i + 1
                                    }, void 0, false, {
                                        fileName: "[project]/components/InteractiveContent.tsx",
                                        lineNumber: 31,
                                        columnNumber: 11
                                    }, this),
                                    node.label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 30,
                                columnNumber: 9
                            }, this),
                            i < nodes.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].arrow,
                                "aria-hidden": "true",
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 33,
                                columnNumber: 34
                            }, this)
                        ]
                    }, node.id, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 29,
                        columnNumber: 31
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-action": "previous",
                        disabled: index === 0,
                        onClick: ()=>select(index - 1),
                        children: ui.previous
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 37,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-action": "next",
                        disabled: index === nodes.length - 1,
                        onClick: ()=>select(index + 1),
                        children: ui.next
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 38,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-action": "reset",
                        onClick: ()=>select(0),
                        children: ui.reset
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 39,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this),
            loop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loop,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: loop
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 42,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-action": "feedback",
                        disabled: index !== nodes.length - 1,
                        "aria-controls": `${id}-explanation`,
                        onClick: ()=>{
                            setIndex(nodes.findIndex((node)=>node.id === "center"));
                            setReturned(true);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "↩ "
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 44,
                                columnNumber: 9
                            }, this),
                            ui.returnToCenter
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 43,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Explanation, {
                id: `${id}-explanation`,
                title: `${ui.explanation}: ${current.label}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            ui.step,
                            " ",
                            index + 1,
                            " / ",
                            nodes.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 48,
                        columnNumber: 7
                    }, this),
                    returned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].returned,
                        children: loop
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 49,
                        columnNumber: 20
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: current.explanation
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 50,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 47,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function Organization({ diagram, ui, language }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(diagram.groups[0].nodes[0].id);
    const group = diagram.groups.find((group)=>group.nodes.some((node)=>node.id === selected));
    const node = group.nodes.find((node)=>node.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrganizationVisual"], {
                nodes: diagram.groups.flatMap((group)=>group.nodes),
                selected: selected,
                language: language,
                onSelect: setSelected
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].root,
                children: diagram.root
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].branches,
                children: diagram.groups.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].branch,
                        "data-group": branch.id,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: branch.title
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 64,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodes,
                                role: "group",
                                "aria-label": branch.title,
                                children: branch.nodes.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "data-node": item.id,
                                        "aria-pressed": selected === item.id,
                                        "aria-controls": "organization-explanation",
                                        onClick: ()=>setSelected(item.id),
                                        children: item.label
                                    }, item.id, false, {
                                        fileName: "[project]/components/InteractiveContent.tsx",
                                        lineNumber: 66,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 65,
                                columnNumber: 9
                            }, this)
                        ]
                    }, branch.id, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 63,
                        columnNumber: 37
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 62,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Explanation, {
                id: "organization-explanation",
                title: `${ui.explanation}: ${node.label}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: group.title
                        }, void 0, false, {
                            fileName: "[project]/components/InteractiveContent.tsx",
                            lineNumber: 71,
                            columnNumber: 10
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 71,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: node.explanation
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 71,
                        columnNumber: 44
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
function Synapse({ diagram, ui, language }) {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(diagram.modes[0].id);
    const selected = diagram.modes.find((item)=>item.id === mode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                role: "group",
                "aria-label": diagram.title,
                children: diagram.modes.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-mode": item.id,
                        "aria-pressed": mode === item.id,
                        "aria-controls": "synapse-model",
                        onClick: ()=>setMode(item.id),
                        children: item.title
                    }, item.id, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 81,
                        columnNumber: 34
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 80,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "synapse-model",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: selected.title
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 84,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: selected.note
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 84,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sequence, {
                        id: `synapse-${mode}`,
                        nodes: selected.nodes,
                        ui: ui,
                        language: language
                    }, mode, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 85,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 83,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, this);
}
function Integration({ diagram, ui, language }) {
    const [excitation, setExcitation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inhibition, setInhibition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const outcome = Number(excitation) + 2 * Number(inhibition);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IntegrationVisual"], {
                excitation: excitation,
                inhibition: inhibition,
                labels: [
                    diagram.excitation,
                    diagram.inhibition
                ],
                outcome: diagram.outcomes[outcome],
                language: language,
                onExcitation: ()=>setExcitation((value)=>!value),
                onInhibition: ()=>setInhibition((value)=>!value)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 95,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputs,
                role: "group",
                "aria-label": diagram.title,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-input": "excitation",
                        "aria-pressed": excitation,
                        "aria-controls": "integration-explanation",
                        onClick: ()=>setExcitation(!excitation),
                        children: [
                            diagram.excitation,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].state,
                                children: excitation ? ui.active : ui.inactive
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 98,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 97,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-input": "inhibition",
                        "aria-pressed": inhibition,
                        "aria-controls": "integration-explanation",
                        onClick: ()=>setInhibition(!inhibition),
                        children: [
                            diagram.inhibition,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].state,
                                children: inhibition ? ui.active : ui.inactive
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveContent.tsx",
                                lineNumber: 101,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 100,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 96,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].convergence,
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: excitation ? "↓" : "┊"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 104,
                        columnNumber: 60
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: inhibition ? "↓" : "┊"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 104,
                        columnNumber: 97
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 104,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].neuron,
                children: diagram.neuron
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 105,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Explanation, {
                id: "integration-explanation",
                title: ui.result,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: diagram.outcomes[outcome]
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveContent.tsx",
                    lineNumber: 106,
                    columnNumber: 65
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 106,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: diagram.note
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 107,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "data-action": "reset",
                onClick: ()=>{
                    setExcitation(false);
                    setInhibition(false);
                },
                children: ui.reset
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 108,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 94,
        columnNumber: 10
    }, this);
}
function InteractiveContent({ lesson, moduleId, language }) {
    const ui = lesson.ui;
    function card(diagram, children) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: diagram.id,
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card}`,
            "aria-labelledby": `${diagram.id}-title`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: `${diagram.id}-title`,
                    children: diagram.title
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveContent.tsx",
                    lineNumber: 116,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    id: `${diagram.id}-instructions`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: [
                                ui.instructions,
                                ": "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InteractiveContent.tsx",
                            lineNumber: 117,
                            columnNumber: 44
                        }, this),
                        diagram.instruction
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InteractiveContent.tsx",
                    lineNumber: 117,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "group",
                    "aria-labelledby": `${diagram.id}-title`,
                    "aria-describedby": `${diagram.id}-instructions`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveContent.tsx",
                    lineNumber: 118,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].theory,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/modules/${moduleId}/theory?lang=${language}#${diagram.anchor}`,
                        children: ui.theory
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveContent.tsx",
                        lineNumber: 119,
                        columnNumber: 36
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveContent.tsx",
                    lineNumber: 119,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractiveContent.tsx",
            lineNumber: 115,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].practice} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactive}`,
        "data-testid": "interactive-diagrams",
        lang: language === "KZ" ? "kk" : language.toLowerCase(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: lesson.title
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 123,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: lesson.introduction
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 123,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: ui.keyboard
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 123,
                columnNumber: 56
            }, this),
            card(lesson.organization, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Organization, {
                diagram: lesson.organization,
                ui: ui,
                language: language
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 124,
                columnNumber: 32
            }, this)),
            card(lesson.pathway, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sequence, {
                id: "pathway",
                nodes: lesson.pathway.nodes,
                ui: ui,
                loop: lesson.pathway.loop,
                language: language
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 125,
                columnNumber: 27
            }, this)),
            card(lesson.synapse, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Synapse, {
                diagram: lesson.synapse,
                ui: ui,
                language: language
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 126,
                columnNumber: 27
            }, this)),
            card(lesson.integration, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Integration, {
                diagram: lesson.integration,
                ui: ui,
                language: language
            }, void 0, false, {
                fileName: "[project]/components/InteractiveContent.tsx",
                lineNumber: 127,
                columnNumber: 31
            }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveContent.tsx",
        lineNumber: 122,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/InteractiveVisuals.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "InteractiveVisuals-module__I7q9ZW__active",
  "badge": "InteractiveVisuals-module__I7q9ZW__badge",
  "control": "InteractiveVisuals-module__I7q9ZW__control",
  "current": "InteractiveVisuals-module__I7q9ZW__current",
  "figure": "InteractiveVisuals-module__I7q9ZW__figure",
  "heat": "InteractiveVisuals-module__I7q9ZW__heat",
  "ion": "InteractiveVisuals-module__I7q9ZW__ion",
  "legend": "InteractiveVisuals-module__I7q9ZW__legend",
  "letter": "InteractiveVisuals-module__I7q9ZW__letter",
  "outline": "InteractiveVisuals-module__I7q9ZW__outline",
  "part": "InteractiveVisuals-module__I7q9ZW__part",
  "selection": "InteractiveVisuals-module__I7q9ZW__selection",
  "signal": "InteractiveVisuals-module__I7q9ZW__signal",
  "svg": "InteractiveVisuals-module__I7q9ZW__svg",
  "symbol": "InteractiveVisuals-module__I7q9ZW__symbol",
});
}),
"[project]/components/InteractiveVisuals.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntegrationVisual",
    ()=>IntegrationVisual,
    "OrganizationVisual",
    ()=>OrganizationVisual,
    "PathwayVisual",
    ()=>PathwayVisual,
    "SynapseVisual",
    ()=>SynapseVisual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/InteractiveVisuals.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const copy = {
    RU: {
        selected: "Выделено",
        model: "Условная учебная схема. Номера соответствуют подписям ниже. Выбор меняется кнопками схемы.",
        pre: "Пресинаптический элемент",
        post: "Постсинаптический элемент",
        vesicles: "Везикулы с медиатором",
        cleft: "Синаптическая щель",
        receptors: "Постсинаптические рецепторы",
        junction: "Электрическое соединение: щелевые контакты",
        unknown: "Возникновение потенциала действия не определено",
        active: "включено",
        inactive: "выключено"
    },
    EN: {
        selected: "Highlighted",
        model: "Schematic teaching model. Numbers match the labels below. Use the diagram buttons to change the selection.",
        pre: "Presynaptic element",
        post: "Postsynaptic element",
        vesicles: "Vesicles containing transmitter",
        cleft: "Synaptic cleft",
        receptors: "Postsynaptic receptors",
        junction: "Electrical connection: gap junctions",
        unknown: "Action potential generation is undetermined",
        active: "on",
        inactive: "off"
    },
    KZ: {
        selected: "Белгіленген",
        model: "Шартты оқу сызбасы. Сандар төмендегі атауларға сәйкес келеді. Таңдауды сызба батырмаларымен өзгертіңіз.",
        pre: "Пресинапстық элемент",
        post: "Постсинапстық элемент",
        vesicles: "Медиаторы бар везикулалар",
        cleft: "Синапстық саңылау",
        receptors: "Постсинапстық рецепторлар",
        junction: "Электрлік байланыс: саңылаулы түйіспелер",
        unknown: "Әрекет потенциалының пайда болуы анықталмаған",
        active: "қосулы",
        inactive: "өшірулі"
    }
};
function Frame({ title, description, children, legend, state }) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].figure,
        "data-visual-state": state,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 360 320",
                role: "group",
                "aria-labelledby": `${id}-title ${id}-description`,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].svg,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        id: `${id}-title`,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 18,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("desc", {
                        id: `${id}-description`,
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 18,
                        columnNumber: 48
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 17,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                children: legend
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
function Control({ label, onActivate, active, className, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        role: "button",
        tabIndex: 0,
        "aria-label": label,
        "aria-pressed": active,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].control + ' ' + (className ?? ''),
        onClick: onActivate,
        onKeyDown: (event)=>{
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (!event.repeat) onActivate();
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
function Part({ active, children, label, onActivate }) {
    const className = active ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].part;
    return onActivate && label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Control, {
        label: label,
        onActivate: onActivate,
        active: active,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 33,
        columnNumber: 32
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        className: className,
        "data-highlighted": active,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 34,
        columnNumber: 7
    }, this);
}
function Badge({ x, y, n, active, label, onActivate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Control, {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].badge,
        label: n + ': ' + label,
        onActivate: onActivate,
        active: active,
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: x,
                cy: y,
                r: "20",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selection
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 38,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: x,
                cy: y,
                r: "15"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 39,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: x,
                y: y + 7,
                textAnchor: "middle",
                children: n
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 39,
                columnNumber: 36
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
function Legend({ nodes, selected, language }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: copy[language].model
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 43,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].legend,
                children: nodes.map((node)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: node.id === selected ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].current : undefined,
                        children: [
                            node.label,
                            node.id === selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    " — ",
                                    copy[language].selected
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 43,
                                columnNumber: 207
                            }, this)
                        ]
                    }, node.id, true, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 43,
                        columnNumber: 90
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 43,
                columnNumber: 41
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
function OrganizationVisual({ nodes, selected, language, onSelect }) {
    const action = (id)=>({
            label: nodes.find((node)=>node.id === id).label,
            onActivate: ()=>onSelect(id)
        });
    const current = nodes.find((node)=>node.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
        title: `${copy[language].selected}: ${current.label}`,
        description: current.explanation,
        state: selected,
        legend: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Legend, {
            nodes,
            selected,
            language
        }, void 0, false, {
            fileName: "[project]/components/InteractiveVisuals.tsx",
            lineNumber: 49,
            columnNumber: 131
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].outline,
                d: "M151 92 Q119 99 107 133 L70 207 87 218 130 163 132 231 111 306 139 306 179 238 218 306 246 306 226 231 229 163 271 218 289 207 250 133 Q238 99 209 92 M151 92 Q129 77 137 42 Q142 14 180 14 Q217 14 223 42 Q232 77 209 92"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 50,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('brain'),
                active: selected === 'brain',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M178 32 C164 21 144 43 153 53 C139 65 155 84 177 77 C192 88 213 72 207 58 C221 39 194 22 178 32Z"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 51,
                        columnNumber: 62
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M179 33V76 M157 45Q173 40 174 54 M189 44Q204 49 193 59 M159 66Q169 55 177 65",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 51,
                        columnNumber: 171
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('spinal'),
                active: selected === 'spinal',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M175 81 L184 81 184 220 180 235 175 220Z"
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 52,
                    columnNumber: 64
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 52,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('nerves'),
                active: selected === 'nerves',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M174 111L133 127 87 203 M185 111L226 127 272 203 M174 146L132 153 M185 146L226 153 M175 210L149 251 128 296 M185 210L210 251 231 296",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 53,
                    columnNumber: 64
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 53,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('ganglia'),
                active: selected === 'ganglia',
                children: [
                    [
                        154,
                        119
                    ],
                    [
                        207,
                        119
                    ],
                    [
                        153,
                        149
                    ],
                    [
                        207,
                        149
                    ]
                ].map(([x, y])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: x,
                        cy: y,
                        rx: "7",
                        ry: "10"
                    }, `${x}-${y}`, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 54,
                        columnNumber: 122
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 54,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('endings'),
                active: selected === 'endings',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M87 203l-11 1m11-1-4 11m189-11 12 1m-12-1 4 11m-148 82-10 5m10-5 4 10m99-10 10 5m-10-5-3 10",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 55,
                    columnNumber: 66
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 55,
                columnNumber: 5
            }, this),
            [
                [
                    235,
                    43
                ],
                [
                    211,
                    189
                ],
                [
                    102,
                    158
                ],
                [
                    240,
                    113
                ],
                [
                    66,
                    237
                ]
            ].map(([x, y], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Badge, {
                    ...action(nodes[i].id),
                    key: i,
                    x: x,
                    y: y,
                    n: i + 1,
                    active: nodes[i].id === selected,
                    __source: {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 56,
                        columnNumber: 71
                    },
                    __self: this
                }))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, this);
}
function PathwayVisual({ nodes, selected, returned, language, onSelect }) {
    const action = (id)=>({
            label: nodes.find((node)=>node.id === id).label,
            onActivate: ()=>onSelect(id)
        });
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const points = [
        [
            55,
            65
        ],
        [
            180,
            65
        ],
        [
            305,
            65
        ],
        [
            305,
            210
        ],
        [
            180,
            210
        ],
        [
            55,
            210
        ]
    ];
    const paths = [
        'M30 22L49 44',
        'M79 65H154',
        'M204 65H279',
        'M305 89V184',
        'M281 210H206',
        'M154 210H81'
    ];
    const current = nodes.find((node)=>node.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
        title: `${copy[language].selected}: ${current.label}`,
        description: current.explanation,
        state: returned ? 'feedback-center' : selected,
        legend: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Legend, {
            nodes,
            selected,
            language
        }, void 0, false, {
            fileName: "[project]/components/InteractiveVisuals.tsx",
            lineNumber: 66,
            columnNumber: 162
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                    id: id,
                    markerUnits: "userSpaceOnUse",
                    markerWidth: "10",
                    markerHeight: "10",
                    refX: "9",
                    refY: "5",
                    orient: "auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0L10 5 0 10Z",
                        fill: "#00599c"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 67,
                        columnNumber: 123
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 67,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heat,
                d: "M8 32H31V50H8Z M11 25q-6-6 0-12m9 12q-6-6 0-12m9 12q-6-6 0-12"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 68,
                columnNumber: 5
            }, this),
            paths.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Part, {
                    ...action(nodes[i].id),
                    key: d,
                    active: nodes[i].id === selected,
                    __source: {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 69,
                        columnNumber: 23
                    },
                    __self: this
                }, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: d,
                    fill: "none",
                    markerEnd: `url(#${id})`
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 69,
                    columnNumber: 96
                }, this))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action('feedback'),
                active: selected === 'feedback' || returned,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M55 235V283H337V112Q337 97 318 88",
                    fill: "none",
                    strokeDasharray: "8 5",
                    markerEnd: `url(#${id})`
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 70,
                    columnNumber: 80
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, this),
            points.map(([x, y], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                            ...action(nodes[i].id),
                            active: nodes[i].id === selected,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: x,
                                cy: y,
                                r: "24"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 71,
                                columnNumber: 104
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/InteractiveVisuals.tsx",
                            lineNumber: 71,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                            ...action(nodes[i].id),
                            x: x,
                            y: y,
                            n: i + 1,
                            active: nodes[i].id === selected
                        }, void 0, false, {
                            fileName: "[project]/components/InteractiveVisuals.tsx",
                            lineNumber: 71,
                            columnNumber: 142
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 71,
                    columnNumber: 28
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].outline,
                d: "M282 38q-8-17 8-20q12-12 22 0q18 2 8 20 M154 241q8-12 19-6l13 7 16-10 9 8-22 18-26-3Z"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 72,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 66,
        columnNumber: 10
    }, this);
}
function SynapseVisual({ nodes, selected, electrical, language, onSelect }) {
    const action = (id)=>({
            label: nodes.find((node)=>node.id === id).label,
            onActivate: ()=>onSelect(id)
        });
    const c = copy[language];
    const current = nodes.find((node)=>node.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
        title: `${c.selected}: ${current.label}`,
        description: current.explanation,
        state: `${electrical ? 'electrical' : 'chemical'}-${selected}`,
        legend: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "A — ",
                        c.pre,
                        "; B — ",
                        c.post,
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 80,
                    columnNumber: 167
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: electrical ? c.junction : `${c.vesicles} · ${c.cleft} · ${c.receptors}`
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 80,
                    columnNumber: 200
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Legend, {
                    nodes,
                    selected,
                    language
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 80,
                    columnNumber: 280
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractiveVisuals.tsx",
            lineNumber: 80,
            columnNumber: 165
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action(electrical ? 'cell' : 'arrival'),
                active: selected === 'arrival' || selected === 'cell',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M110 8V42Q47 55 47 120V154H313V120Q313 55 250 42V8"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 81,
                        columnNumber: 111
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M180 8V55m-9-12 9 12 9-12",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 81,
                        columnNumber: 174
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 81,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].letter,
                x: "67",
                y: "91",
                children: "A"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 82,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                ...action(electrical ? 'coupled' : 'response'),
                active: selected === 'response' || selected === 'coupled',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M47 229Q180 204 313 229V308H47Z"
                }, void 0, false, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 83,
                    columnNumber: 119
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 83,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].letter,
                x: "67",
                y: "279",
                children: "B"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 84,
                columnNumber: 5
            }, this),
            electrical ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                        ...action('junction'),
                        active: selected === 'junction',
                        children: [
                            [
                                135,
                                175,
                                215
                            ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M${x} 145v85h16v-85Z`
                                }, x, false, {
                                    fileName: "[project]/components/InteractiveVisuals.tsx",
                                    lineNumber: 86,
                                    columnNumber: 92
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M112 179H247M112 193H247",
                                fill: "none"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 86,
                                columnNumber: 137
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 86,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].signal,
                        d: "M182 118V256m-9-12 9 12 9-12"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 87,
                        columnNumber: 7
                    }, this),
                    [
                        [
                            272,
                            45
                        ],
                        [
                            278,
                            187
                        ],
                        [
                            271,
                            275
                        ]
                    ].map(([x, y], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Badge, {
                            ...action(nodes[i].id),
                            key: i,
                            x: x,
                            y: y,
                            n: i + 1,
                            active: nodes[i].id === selected,
                            __source: {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 88,
                                columnNumber: 54
                            },
                            __self: this
                        }))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 85,
                columnNumber: 19
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                        ...action('calcium'),
                        active: selected === 'calcium',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M322 116H276m10-9-10 9 10 9",
                                fill: "none"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 90,
                                columnNumber: 68
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: "263",
                                y: "95",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ion,
                                children: "Ca²⁺"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 90,
                                columnNumber: 120
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 90,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                        ...action('transmitter'),
                        active: selected === 'transmitter',
                        children: [
                            [
                                125,
                                181,
                                230
                            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: x,
                                            cy: 112 + i * 9,
                                            r: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InteractiveVisuals.tsx",
                                            lineNumber: 91,
                                            columnNumber: 113
                                        }, this),
                                        [
                                            -6,
                                            0,
                                            6
                                        ].map((dx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: x + dx,
                                                cy: 112 + i * 9,
                                                r: "2"
                                            }, dx, false, {
                                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                                lineNumber: 91,
                                                columnNumber: 168
                                            }, this))
                                    ]
                                }, x, true, {
                                    fileName: "[project]/components/InteractiveVisuals.tsx",
                                    lineNumber: 91,
                                    columnNumber: 102
                                }, this)),
                            [
                                132,
                                160,
                                185,
                                213,
                                238
                            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: x,
                                    cy: 170 + i % 2 * 20,
                                    r: "4"
                                }, x, false, {
                                    fileName: "[project]/components/InteractiveVisuals.tsx",
                                    lineNumber: 91,
                                    columnNumber: 258
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 91,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                        ...action('binding'),
                        active: selected === 'binding',
                        children: [
                            128,
                            180,
                            232
                        ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: `M${x - 9} 205v20h18v-20m-9 20v14`,
                                fill: "none"
                            }, x, false, {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 92,
                                columnNumber: 90
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 92,
                        columnNumber: 7
                    }, this),
                    [
                        [
                            222,
                            23
                        ],
                        [
                            332,
                            87
                        ],
                        [
                            93,
                            132
                        ],
                        [
                            277,
                            218
                        ],
                        [
                            268,
                            279
                        ]
                    ].map(([x, y], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Badge, {
                            ...action(nodes[i].id),
                            key: i,
                            x: x,
                            y: y,
                            n: i + 1,
                            active: nodes[i].id === selected,
                            __source: {
                                fileName: "[project]/components/InteractiveVisuals.tsx",
                                lineNumber: 93,
                                columnNumber: 72
                            },
                            __self: this
                        }))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 89,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
function IntegrationVisual({ excitation, inhibition, labels, outcome, language, onExcitation, onInhibition }) {
    const c = copy[language];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
        title: labels.join(' / '),
        description: outcome,
        state: `${Number(excitation)}${Number(inhibition)}`,
        legend: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "+ ",
                        labels[0],
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: excitation ? c.active : c.inactive
                        }, void 0, false, {
                            fileName: "[project]/components/InteractiveVisuals.tsx",
                            lineNumber: 100,
                            columnNumber: 147
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/InteractiveVisuals.tsx",
                            lineNumber: 100,
                            columnNumber: 200
                        }, this),
                        "− ",
                        labels[1],
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: inhibition ? c.active : c.inactive
                        }, void 0, false, {
                            fileName: "[project]/components/InteractiveVisuals.tsx",
                            lineNumber: 100,
                            columnNumber: 221
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 100,
                    columnNumber: 129
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "? — ",
                        c.unknown,
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InteractiveVisuals.tsx",
                    lineNumber: 100,
                    columnNumber: 278
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractiveVisuals.tsx",
            lineNumber: 100,
            columnNumber: 127
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                label: labels[0],
                onActivate: onExcitation,
                active: excitation,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "66",
                        cy: "47",
                        r: "26"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 101,
                        columnNumber: 75
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M66 74Q66 118 138 137L157 155",
                        fill: "none",
                        strokeDasharray: excitation ? undefined : '5 6'
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 101,
                        columnNumber: 108
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M144 138l-6 13 17 1",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 101,
                        columnNumber: 211
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 101,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Part, {
                label: labels[1],
                onActivate: onInhibition,
                active: inhibition,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "294",
                        cy: "47",
                        r: "26"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 102,
                        columnNumber: 75
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M294 74Q294 118 222 137L204 155",
                        fill: "none",
                        strokeDasharray: inhibition ? undefined : '5 6'
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 102,
                        columnNumber: 109
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M216 138l6 13-17 1",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractiveVisuals.tsx",
                        lineNumber: 102,
                        columnNumber: 214
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 102,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].symbol,
                x: "66",
                y: "56",
                children: "+"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 103,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].symbol,
                x: "294",
                y: "56",
                children: "−"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 103,
                columnNumber: 59
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].outline,
                d: "M155 137q25-18 50 0l21 30-12 38-33 11-32-11-14-38Z"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 104,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].signal,
                d: "M147 151l-32-15-16-25m16 25-23 6m121 9 32-15 16-25m-16 25 23 6 M180 216V273H262"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 105,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].outline,
                cx: "180",
                cy: "174",
                r: "16"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 106,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractiveVisuals$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].symbol,
                x: "287",
                y: "284",
                children: "?"
            }, void 0, false, {
                fileName: "[project]/components/InteractiveVisuals.tsx",
                lineNumber: 107,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InteractiveVisuals.tsx",
        lineNumber: 100,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/MediaContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "media": "MediaContent-module__hZIzOa__media",
  "metadata": "MediaContent-module__hZIzOa__metadata",
  "option": "MediaContent-module__hZIzOa__option",
  "placeholder": "MediaContent-module__hZIzOa__placeholder",
  "player": "MediaContent-module__hZIzOa__player",
  "poster": "MediaContent-module__hZIzOa__poster",
  "question": "MediaContent-module__hZIzOa__question",
  "status": "MediaContent-module__hZIzOa__status",
  "transcript": "MediaContent-module__hZIzOa__transcript",
});
}),
"[project]/components/MediaContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/MediaContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OrganizationAnimation.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function durationLabel(seconds) {
    if (seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return null;
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
function Player({ block, ui }) {
    const [failed, setFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(block.source?.durationSeconds);
    const source = block.source;
    const hasVideo = Boolean(source?.videoUrl?.trim());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].player,
                "data-player": hasVideo ? failed ? "error" : "video" : "pending",
                children: hasVideo && !failed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    controls: true,
                    playsInline: true,
                    preload: "metadata",
                    src: source.videoUrl,
                    poster: source?.poster,
                    crossOrigin: source?.captions?.length ? "anonymous" : undefined,
                    "aria-label": block.title,
                    "aria-describedby": `${block.id}-transcript-label`,
                    onError: ()=>setFailed(true),
                    onLoadedMetadata: (event)=>setDuration(event.currentTarget.duration),
                    children: [
                        source?.captions?.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("track", {
                                kind: track.kind ?? "captions",
                                src: track.src,
                                srcLang: track.srcLang,
                                label: track.label,
                                default: track.default
                            }, `${track.srcLang}-${track.src}`, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 27,
                                columnNumber: 41
                            }, this)),
                        ui.alternative
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MediaContent.tsx",
                    lineNumber: 23,
                    columnNumber: 30
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].placeholder,
                    role: "group",
                    "aria-label": block.title,
                    children: [
                        source?.poster && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: source.poster,
                            alt: "",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].poster
                        }, void 0, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 30,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                            role: failed ? "status" : undefined,
                            children: failed ? ui.unavailable : ui.pending
                        }, void 0, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 31,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: ui.alternative
                        }, void 0, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 32,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MediaContent.tsx",
                    lineNumber: 29,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 22,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metadata,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: ui.duration
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 36,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: durationLabel(duration) ?? ui.durationPending
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 36,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 36,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: ui.language
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 37,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: ui.languageName
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 37,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 37,
                        columnNumber: 7
                    }, this),
                    source?.credit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: ui.credit
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 38,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: source.credit
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 38,
                                columnNumber: 51
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 38,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MediaContent.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
function SelfCheck({ block, ui }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const firstOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const question = block.question;
    const answer = question.options.find((option)=>option.id === selected);
    const correct = selected === question.correctAnswer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].question,
        "aria-labelledby": `${block.id}-question-title`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                id: `${block.id}-question-title`,
                children: ui.question
            }, void 0, false, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                disabled: checked,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        children: question.prompt
                    }, void 0, false, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 53,
                        columnNumber: 7
                    }, this),
                    question.options.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].option,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: index === 0 ? firstOption : undefined,
                                    type: "radio",
                                    name: `media-${block.id}`,
                                    value: option.id,
                                    checked: selected === option.id,
                                    onChange: ()=>setSelected(option.id)
                                }, void 0, false, {
                                    fileName: "[project]/components/MediaContent.tsx",
                                    lineNumber: 55,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: option.text
                                }, void 0, false, {
                                    fileName: "[project]/components/MediaContent.tsx",
                                    lineNumber: 56,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, option.id, true, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 54,
                            columnNumber: 48
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 52,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "data-action": "check",
                disabled: selected === null || checked,
                onClick: ()=>setChecked(true),
                children: ui.check
            }, void 0, false, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this),
            checked && answer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        "aria-live": "polite",
                        className: correct ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retry,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: correct ? ui.correct : ui.incorrect
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 62,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: answer.feedback
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 63,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            ui.correctAnswer,
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MediaContent.tsx",
                                        lineNumber: 64,
                                        columnNumber: 12
                                    }, this),
                                    question.options.find((option)=>option.id === question.correctAnswer)?.text
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 64,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: question.explanation
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 65,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 61,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-action": "retry",
                        onClick: ()=>{
                            setSelected(null);
                            setChecked(false);
                            requestAnimationFrame(()=>firstOption.current?.focus());
                        },
                        children: ui.retry
                    }, void 0, false, {
                        fileName: "[project]/components/MediaContent.tsx",
                        lineNumber: 67,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 60,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MediaContent.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
function MediaContent({ lesson, moduleId, language }) {
    const ui = lesson.ui;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].practice} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].media}`,
        "data-testid": "media-content",
        lang: language === "KZ" ? "kk" : language.toLowerCase(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: lesson.title
            }, void 0, false, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 78,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: lesson.introduction
            }, void 0, false, {
                fileName: "[project]/components/MediaContent.tsx",
                lineNumber: 78,
                columnNumber: 28
            }, this),
            lesson.blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    id: `media-${block.id}`,
                    "data-media": block.id,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                    "aria-labelledby": `${block.id}-title`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: `${block.id}-title`,
                            children: [
                                index + 1,
                                ". ",
                                block.title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 80,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        ui.preview,
                                        ": "
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MediaContent.tsx",
                                    lineNumber: 81,
                                    columnNumber: 10
                                }, this),
                                block.preview
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 81,
                            columnNumber: 7
                        }, this),
                        block.animation === "organization" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            language: language
                        }, language, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 82,
                            columnNumber: 45
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Player, {
                            block: block,
                            ui: ui
                        }, block.source?.videoUrl ?? "pending", false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MediaContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].transcript,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    id: `${block.id}-transcript-label`,
                                    children: ui.transcript
                                }, void 0, false, {
                                    fileName: "[project]/components/MediaContent.tsx",
                                    lineNumber: 85,
                                    columnNumber: 9
                                }, this),
                                block.transcript.map((paragraph, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: paragraph
                                    }, i, false, {
                                        fileName: "[project]/components/MediaContent.tsx",
                                        lineNumber: 86,
                                        columnNumber: 49
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 84,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/modules/${moduleId}/theory?lang=${language}#${block.theoryAnchor}`,
                                children: ui.theory
                            }, void 0, false, {
                                fileName: "[project]/components/MediaContent.tsx",
                                lineNumber: 88,
                                columnNumber: 10
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 88,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelfCheck, {
                            block: block,
                            ui: ui
                        }, void 0, false, {
                            fileName: "[project]/components/MediaContent.tsx",
                            lineNumber: 89,
                            columnNumber: 7
                        }, this)
                    ]
                }, block.id, true, {
                    fileName: "[project]/components/MediaContent.tsx",
                    lineNumber: 79,
                    columnNumber: 42
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/MediaContent.tsx",
        lineNumber: 77,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/OrganizationAnimation.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "body": "OrganizationAnimation-module__PKcdTq__body",
  "controls": "OrganizationAnimation-module__PKcdTq__controls",
  "direction": "OrganizationAnimation-module__PKcdTq__direction",
  "explanation": "OrganizationAnimation-module__PKcdTq__explanation",
  "flow": "OrganizationAnimation-module__PKcdTq__flow",
  "highlight": "OrganizationAnimation-module__PKcdTq__highlight",
  "legend": "OrganizationAnimation-module__PKcdTq__legend",
  "moving": "OrganizationAnimation-module__PKcdTq__moving",
  "note": "OrganizationAnimation-module__PKcdTq__note",
  "player": "OrganizationAnimation-module__PKcdTq__player",
  "reduced": "OrganizationAnimation-module__PKcdTq__reduced",
  "signal-flow": "OrganizationAnimation-module__PKcdTq__signal-flow",
  "structure": "OrganizationAnimation-module__PKcdTq__structure",
  "visual": "OrganizationAnimation-module__PKcdTq__visual",
});
}),
"[project]/components/OrganizationAnimation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrganizationAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$organization$2d$animation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/modules/1/organization-animation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/OrganizationAnimation.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
function OrganizationAnimation({ language }) {
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$modules$2f$1$2f$organization$2d$animation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOrganizationAnimation"])(language);
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const stage = copy.stages[index];
    const last = index === copy.stages.length - 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!playing) return;
        const timer = window.setTimeout(()=>{
            if (last) setPlaying(false);
            else setIndex((current)=>current + 1);
        }, 6000);
        return ()=>window.clearTimeout(timer);
    }, [
        playing,
        index,
        last
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const pauseWhenHidden = ()=>{
            if (document.hidden) setPlaying(false);
        };
        document.addEventListener("visibilitychange", pauseWhenHidden);
        return ()=>document.removeEventListener("visibilitychange", pauseWhenHidden);
    }, []);
    function go(next) {
        setPlaying(false);
        setIndex(next);
    }
    const both = index === 0 || index === 5;
    const cns = both || index === 1;
    const pns = both || index === 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].player,
        "data-testid": "organization-animation",
        "data-stage": stage.id,
        "data-playing": playing,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                id: `${id}-heading`,
                children: copy.title
            }, void 0, false, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 33,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${id}-instructions`,
                children: copy.instruction
            }, void 0, false, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reduced,
                children: copy.reduced
            }, void 0, false, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visual,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 420 350",
                        role: "img",
                        "aria-labelledby": `${id}-svg-title ${id}-svg-desc`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                id: `${id}-svg-title`,
                                children: stage.title
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 38,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("desc", {
                                id: `${id}-svg-desc`,
                                children: [
                                    stage.text,
                                    " ",
                                    copy.model
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 38,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: `${id}-arrow`,
                                    markerUnits: "userSpaceOnUse",
                                    markerWidth: "12",
                                    markerHeight: "12",
                                    refX: "10",
                                    refY: "6",
                                    orient: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 0L12 6 0 12Z",
                                        fill: "currentColor"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 39,
                                        columnNumber: 139
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/OrganizationAnimation.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 39,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].body,
                                d: "M184 95Q158 81 164 45Q169 15 210 15Q251 15 256 45Q262 81 236 95Q270 104 281 139L323 217 300 230 255 169 256 247 276 328 246 328 210 264 174 328 144 328 164 247 165 169 120 230 97 217 139 139Q150 104 184 95Z"
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 40,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                className: cns ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].highlight : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].structure,
                                "data-structure": "cns",
                                "data-active": cns,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M207 36C194 24 174 43 183 56C169 70 188 88 208 80C226 90 247 73 240 58C251 40 224 24 207 36Z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 42,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M210 37V80M187 51q13-10 18 4m18-10q15 10 2 19M190 70q10-9 18-2",
                                        fill: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 43,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M205 87H215V230L210 248 205 230Z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 44,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 41,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                className: pns ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].highlight : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].structure,
                                "data-structure": "pns",
                                "data-active": pns,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M205 120L164 139 117 216M215 120L256 139 304 216M205 156L163 167M215 156L257 167M205 225L178 272 160 317M215 225L242 272 260 317",
                                        fill: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 47,
                                        columnNumber: 11
                                    }, this),
                                    [
                                        [
                                            184,
                                            130
                                        ],
                                        [
                                            236,
                                            130
                                        ],
                                        [
                                            184,
                                            161
                                        ],
                                        [
                                            236,
                                            161
                                        ]
                                    ].map(([x, y])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                            cx: x,
                                            cy: y,
                                            rx: "6",
                                            ry: "9"
                                        }, `${x}-${y}`, false, {
                                            fileName: "[project]/components/OrganizationAnimation.tsx",
                                            lineNumber: 48,
                                            columnNumber: 69
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M117 216l-10 1m10-1-2 11m187-11 11 1m-11-1 3 11m-144 90-9 4m9-4 3 10m97-10 10 4m-10-4-2 10",
                                        fill: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OrganizationAnimation.tsx",
                                        lineNumber: 49,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, this),
                            (index === 3 || index === 5) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                "data-direction": "afferent",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flow} ${playing ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].moving : ""}`,
                                d: "M315 190C350 124 282 94 225 144",
                                markerEnd: `url(#${id}-arrow)`
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 51,
                                columnNumber: 42
                            }, this),
                            (index === 4 || index === 5) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                "data-direction": "efferent",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flow} ${playing ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].moving : ""}`,
                                d: "M227 190C272 187 302 236 335 241",
                                markerEnd: `url(#${id}-arrow)`
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 52,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 37,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].legend,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                "data-active": cns,
                                children: copy.cns
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 55,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                "data-active": pns,
                                children: copy.pns
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 55,
                                columnNumber: 46
                            }, this),
                            (index === 3 || index === 5) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].direction,
                                children: copy.input
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 56,
                                columnNumber: 42
                            }, this),
                            (index === 4 || index === 5) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].direction,
                                children: copy.output
                            }, void 0, false, {
                                fileName: "[project]/components/OrganizationAnimation.tsx",
                                lineNumber: 57,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 54,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].controls,
                role: "group",
                "aria-labelledby": `${id}-heading`,
                "aria-describedby": `${id}-instructions`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-animation-action": "play",
                        "aria-pressed": playing,
                        onClick: ()=>{
                            if (playing) setPlaying(false);
                            else {
                                if (last) setIndex(0);
                                setPlaying(true);
                            }
                        },
                        children: playing ? copy.pause : copy.play
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 61,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-animation-action": "previous",
                        disabled: index === 0,
                        onClick: ()=>go(index - 1),
                        children: copy.previous
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 65,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-animation-action": "next",
                        disabled: last,
                        onClick: ()=>go(index + 1),
                        children: copy.next
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 66,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-animation-action": "restart",
                        onClick: ()=>go(0),
                        children: copy.restart
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 67,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    copy.steps,
                    ": ",
                    copy.stages.length,
                    " · ",
                    playing ? copy.playing : copy.paused
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 69,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("progress", {
                max: copy.stages.length,
                value: index + 1,
                "aria-label": copy.progress
            }, void 0, false, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].explanation,
                role: "status",
                "aria-live": "polite",
                "aria-atomic": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            copy.step,
                            " ",
                            index + 1,
                            " / ",
                            copy.stages.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 72,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        children: stage.title
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 73,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: stage.text
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 73,
                        columnNumber: 29
                    }, this),
                    last && !playing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: copy.last
                    }, void 0, false, {
                        fileName: "[project]/components/OrganizationAnimation.tsx",
                        lineNumber: 74,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 71,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrganizationAnimation$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: copy.model
            }, void 0, false, {
                fileName: "[project]/components/OrganizationAnimation.tsx",
                lineNumber: 76,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/OrganizationAnimation.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/PracticeContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "PracticeContent-module__uNNyAa__actions",
  "answerButton": "PracticeContent-module__uNNyAa__answerButton",
  "answers": "PracticeContent-module__uNNyAa__answers",
  "arrow": "PracticeContent-module__uNNyAa__arrow",
  "callout": "PracticeContent-module__uNNyAa__callout",
  "card": "PracticeContent-module__uNNyAa__card",
  "chain": "PracticeContent-module__uNNyAa__chain",
  "chainCard": "PracticeContent-module__uNNyAa__chainCard",
  "checklist": "PracticeContent-module__uNNyAa__checklist",
  "disclosure": "PracticeContent-module__uNNyAa__disclosure",
  "empty": "PracticeContent-module__uNNyAa__empty",
  "note": "PracticeContent-module__uNNyAa__note",
  "number": "PracticeContent-module__uNNyAa__number",
  "options": "PracticeContent-module__uNNyAa__options",
  "practice": "PracticeContent-module__uNNyAa__practice",
  "primary": "PracticeContent-module__uNNyAa__primary",
  "response": "PracticeContent-module__uNNyAa__response",
  "retry": "PracticeContent-module__uNNyAa__retry",
  "srOnly": "PracticeContent-module__uNNyAa__srOnly",
  "status": "PracticeContent-module__uNNyAa__status",
  "success": "PracticeContent-module__uNNyAa__success",
  "tableScroll": "PracticeContent-module__uNNyAa__tableScroll",
});
}),
"[project]/components/PracticeContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PracticeContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
"use client";
;
;
;
const hideAnswer = {
    RU: "Скрыть ответы и объяснения",
    KZ: "Жауаптар мен түсіндірмелерді жасыру",
    EN: "Hide answers and explanations"
};
function Disclosure({ children, ui }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].disclosure,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].answerButton,
                "aria-expanded": open,
                "aria-controls": id,
                onClick: ()=>setOpen(!open),
                children: open ? ui.hideAnswer : ui.showAnswer
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: id,
                hidden: !open,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].answers,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PracticeContent.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function Answers({ items, ui }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Disclosure, {
        ui: ui,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: item
                }, item, false, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 31,
                    columnNumber: 32
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/PracticeContent.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PracticeContent.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function Sequence({ steps, ui }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // A stable mixed order keeps server rendering and hydration consistent.
    const options = steps.map((_, index)=>index);
    const mixed = [
        ...options.filter((index)=>index % 2 === 1).reverse(),
        ...options.filter((index)=>index % 2 === 0).reverse()
    ];
    function update(next) {
        setSelected(next);
        setFeedback("");
    }
    function check() {
        setFeedback(selected.length !== steps.length ? ui.incomplete : selected.every((value, index)=>value === index) ? ui.correct : ui.incorrect);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sequence,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: ui.available
                }, void 0, false, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 56,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].options,
                children: mixed.map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: selected.includes(index),
                        onClick: ()=>update([
                                ...selected,
                                index
                            ]),
                        children: steps[index]
                    }, index, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: ui.selected
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 64,
                        columnNumber: 10
                    }, this),
                    " (",
                    selected.length,
                    "/",
                    steps.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            selected.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chain,
                children: selected.map((index, position)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chainCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].number,
                                        "aria-hidden": "true",
                                        children: position + 1
                                    }, void 0, false, {
                                        fileName: "[project]/components/PracticeContent.tsx",
                                        lineNumber: 67,
                                        columnNumber: 46
                                    }, this),
                                    steps[index]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            position < selected.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].arrow,
                                "aria-hidden": "true",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 68,
                                columnNumber: 46
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 65,
                columnNumber: 26
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].empty,
                children: ui.empty
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 70,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primary,
                        onClick: check,
                        children: ui.check
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: !selected.length,
                        onClick: ()=>update(selected.slice(0, -1)),
                        children: ui.undo
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: !selected.length,
                        onClick: ()=>update([]),
                        children: ui.reset
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                "aria-live": "polite",
                className: feedback ? feedback === ui.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retry : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Disclosure, {
                ui: ui,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    children: steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: step
                        }, step, false, {
                            fileName: "[project]/components/PracticeContent.tsx",
                            lineNumber: 78,
                            columnNumber: 34
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PracticeContent.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
function Worksheet({ block, ui }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableScroll,
                role: "region",
                "aria-label": block.headers.join(" / "),
                tabIndex: 0,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: block.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        children: header
                                    }, header, false, {
                                        fileName: "[project]/components/PracticeContent.tsx",
                                        lineNumber: 89,
                                        columnNumber: 53
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 89,
                                columnNumber: 18
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/PracticeContent.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: block.rows.map(([structure])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "row",
                                            children: structure
                                        }, void 0, false, {
                                            fileName: "[project]/components/PracticeContent.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this),
                                        [
                                            1,
                                            2
                                        ].map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].srOnly,
                                                            children: [
                                                                structure,
                                                                ": ",
                                                                block.headers[column]
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/PracticeContent.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            rows: 3,
                                                            placeholder: ui.input
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PracticeContent.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/PracticeContent.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, this)
                                            }, column, false, {
                                                fileName: "[project]/components/PracticeContent.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, structure, true, {
                                    fileName: "[project]/components/PracticeContent.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/PracticeContent.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Disclosure, {
                ui: ui,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                    children: block.rows.map(([structure, category, purpose])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: structure
                                    }, void 0, false, {
                                        fileName: "[project]/components/PracticeContent.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/PracticeContent.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                block.headers[1],
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/PracticeContent.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        category,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/PracticeContent.tsx",
                                            lineNumber: 111,
                                            columnNumber: 64
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                block.headers[2],
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/PracticeContent.tsx",
                                            lineNumber: 111,
                                            columnNumber: 70
                                        }, this),
                                        " ",
                                        purpose
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PracticeContent.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, structure, true, {
                            fileName: "[project]/components/PracticeContent.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PracticeContent.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function Block({ block, ui }) {
    switch(block.type){
        case "paragraph":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: block.text
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 121,
                columnNumber: 30
            }, this);
        case "subheading":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: block.text
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 122,
                columnNumber: 31
            }, this);
        case "list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: block.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: item
                    }, item, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 123,
                        columnNumber: 56
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 123,
                columnNumber: 25
            }, this);
        case "callout":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].callout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: block.title
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 124,
                        columnNumber: 62
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: block.text
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 124,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 124,
                columnNumber: 28
            }, this);
        case "answer":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Answers, {
                items: block.items,
                ui: ui
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 125,
                columnNumber: 27
            }, this);
        case "response":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].response,
                children: [
                    block.label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        rows: 4,
                        placeholder: ui.input
                    }, void 0, false, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 126,
                        columnNumber: 77
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 126,
                columnNumber: 29
            }, this);
        case "sequence":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sequence, {
                steps: block.steps,
                ui: ui
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 127,
                columnNumber: 29
            }, this);
        case "table":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Worksheet, {
                block: block,
                ui: ui
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 128,
                columnNumber: 26
            }, this);
        case "checklist":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checklist,
                children: block.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox"
                            }, void 0, false, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 130,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item
                            }, void 0, false, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 130,
                                columnNumber: 51
                            }, this)
                        ]
                    }, item, true, {
                        fileName: "[project]/components/PracticeContent.tsx",
                        lineNumber: 130,
                        columnNumber: 7
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 129,
                columnNumber: 30
            }, this);
    }
}
function PracticeContent({ lesson, language }) {
    const ui = {
        ...lesson.ui,
        hideAnswer: hideAnswer[language]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].practice,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: lesson.title
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: lesson.ui.localNote
            }, void 0, false, {
                fileName: "[project]/components/PracticeContent.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            lesson.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/components/PracticeContent.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        section.blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Block, {
                                block: block,
                                ui: ui
                            }, index, false, {
                                fileName: "[project]/components/PracticeContent.tsx",
                                lineNumber: 144,
                                columnNumber: 49
                            }, this))
                    ]
                }, section.title, true, {
                    fileName: "[project]/components/PracticeContent.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/PracticeContent.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/StudyContent.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "definition": "StudyContent-module__c36viq__definition",
  "links": "StudyContent-module__c36viq__links",
  "option": "StudyContent-module__c36viq__option",
  "search": "StudyContent-module__c36viq__search",
  "study": "StudyContent-module__c36viq__study",
});
}),
"[project]/components/StudyContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/content/sections.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/StudyContent.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
const labels = {
    RU: {
        check: "Проверить ответ",
        next: "Следующий вопрос",
        finish: "Диагностический результат",
        correct: "Верно",
        incorrect: "Нужно повторить",
        select: "Выберите один ответ",
        answer: "Ваш ответ",
        show: "Показать эталонное объяснение",
        hide: "Скрыть объяснение",
        gate: "Сначала запишите свой ответ.",
        search: "Поиск по термину или определению",
        empty: "Ничего не найдено. Измените запрос.",
        count: "Найдено терминов",
        restart: "Пройти заново",
        score: "Верных ответов",
        note: "Результат диагностический и не входит в итоговую оценку.",
        review: "Рекомендуем повторить",
        ready: "Базовые темы знакомы. Переходите к теории, чтобы уточнить и систематизировать знания.",
        related: "Связанные материалы",
        sources: "Внешние источники",
        result: "Объяснение"
    },
    KZ: {
        check: "Жауапты тексеру",
        next: "Келесі сұрақ",
        finish: "Диагностикалық нәтиже",
        correct: "Дұрыс",
        incorrect: "Қайталау қажет",
        select: "Бір жауапты таңдаңыз",
        answer: "Сіздің жауабыңыз",
        show: "Үлгі түсіндірмені көрсету",
        hide: "Түсіндірмені жасыру",
        gate: "Алдымен жауабыңызды жазыңыз.",
        search: "Термин немесе анықтама бойынша іздеу",
        empty: "Ештеңе табылмады. Сұрауды өзгертіңіз.",
        count: "Табылған терминдер",
        restart: "Қайта өту",
        score: "Дұрыс жауаптар",
        note: "Нәтиже диагностикалық сипатта және қорытынды бағаға кірмейді.",
        review: "Қайталауға ұсынамыз",
        ready: "Негізгі тақырыптар таныс. Білімді нақтылау және жүйелеу үшін теорияға өтіңіз.",
        related: "Байланысты материалдар",
        sources: "Сыртқы дереккөздер",
        result: "Түсіндірме"
    },
    EN: {
        check: "Check answer",
        next: "Next question",
        finish: "Diagnostic result",
        correct: "Correct",
        incorrect: "Review needed",
        select: "Choose one answer",
        answer: "Your answer",
        show: "Show model explanation",
        hide: "Hide explanation",
        gate: "Write your answer first.",
        search: "Search terms or definitions",
        empty: "No matches. Try another search.",
        count: "Terms found",
        restart: "Try again",
        score: "Correct answers",
        note: "This is a diagnostic result and does not contribute to a final grade.",
        review: "Recommended review",
        ready: "You recognise the basic topics. Continue to theory to refine and organise your knowledge.",
        related: "Related material",
        sources: "External sources",
        result: "Explanation"
    }
};
function MaterialLink({ target, moduleId, language }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/modules/${moduleId}/${target.section}?lang=${language}${target.anchor ? `#${target.anchor}` : ""}`,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$sections$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSectionTitle"])(target.section, language)
    }, void 0, false, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function Reading({ lesson, ...context }) {
    const ui = labels[context.language];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            lesson.cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                    id: card.id,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: card.title
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 23,
                            columnNumber: 5
                        }, this),
                        card.paragraphs.map((text, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: text
                            }, index, false, {
                                fileName: "[project]/components/StudyContent.tsx",
                                lineNumber: 23,
                                columnNumber: 64
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": ui.related,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].links,
                            children: card.links.map((target, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                                    target: target,
                                    ...context
                                }, index, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 24,
                                    columnNumber: 94
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 24,
                            columnNumber: 5
                        }, this)
                    ]
                }, card.id, true, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 22,
                    columnNumber: 38
                }, this)),
            lesson.sources && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: ui.sources
                    }, void 0, false, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 26,
                        columnNumber: 33
                    }, this),
                    lesson.sources.map((source, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                            id: `source-${index + 1}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: source.href,
                                        children: source.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/StudyContent.tsx",
                                        lineNumber: 26,
                                        columnNumber: 175
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 26,
                                    columnNumber: 171
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: source.description
                                }, void 0, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 26,
                                    columnNumber: 220
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": ui.related,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].links,
                                    children: source.links.map((target, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                                            target: target,
                                            ...context
                                        }, index, false, {
                                            fileName: "[project]/components/StudyContent.tsx",
                                            lineNumber: 26,
                                            columnNumber: 338
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 26,
                                    columnNumber: 247
                                }, this)
                            ]
                        }, source.href, true, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 26,
                            columnNumber: 93
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 26,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
function Pretest({ lesson, ...context }) {
    const ui = labels[context.language];
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const heading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        heading.current?.focus();
    }, [
        index
    ]);
    const question = lesson.questions[index];
    if (!question) {
        const wrong = lesson.questions.filter((item, i)=>item.correctAnswer !== answers[i]);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
            "data-testid": "diagnostic-result",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    ref: heading,
                    tabIndex: -1,
                    children: ui.finish
                }, void 0, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 77
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        ui.score,
                        ": ",
                        lesson.questions.length - wrong.length,
                        " / ",
                        lesson.questions.length
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 125
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: ui.note
                }, void 0, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 212
                }, this),
                wrong.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: ui.review
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 39,
                            columnNumber: 246
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: wrong.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        item.topic,
                                        ": ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                                            target: item.target,
                                            ...context
                                        }, void 0, false, {
                                            fileName: "[project]/components/StudyContent.tsx",
                                            lineNumber: 39,
                                            columnNumber: 321
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 39,
                                    columnNumber: 289
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 39,
                            columnNumber: 266
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 244
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: ui.ready
                }, void 0, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 389
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                        target: {
                            section: "theory"
                        },
                        ...context
                    }, void 0, false, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 39,
                        columnNumber: 410
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 407
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        setIndex(0);
                        setSelected(null);
                        setAnswers([]);
                    },
                    "data-action": "restart",
                    children: ui.restart
                }, void 0, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 39,
                    columnNumber: 474
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/StudyContent.tsx",
            lineNumber: 39,
            columnNumber: 12
        }, this);
    }
    const checked = answers.length > index;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
        "data-testid": "diagnostic-question",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    index + 1,
                    " / ",
                    lesson.questions.length
                ]
            }, void 0, true, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 43,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                ref: heading,
                tabIndex: -1,
                children: question.prompt
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 43,
                columnNumber: 51
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                disabled: checked,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        children: ui.select
                    }, void 0, false, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 44,
                        columnNumber: 34
                    }, this),
                    question.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].option,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "radio",
                                    name: question.id,
                                    value: option.id,
                                    checked: selected === option.id,
                                    onChange: ()=>setSelected(option.id)
                                }, void 0, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 44,
                                    columnNumber: 143
                                }, this),
                                option.text
                            ]
                        }, option.id, true, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 44,
                            columnNumber: 94
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this),
            !checked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primary,
                "data-action": "check",
                disabled: selected === null,
                onClick: ()=>{
                    if (selected !== null) setAnswers((previous)=>[
                            ...previous,
                            selected
                        ]);
                },
                children: ui.check
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 45,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "status",
                        className: selected === question.correctAnswer ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retry,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: selected === question.correctAnswer ? ui.correct : ui.incorrect
                            }, void 0, false, {
                                fileName: "[project]/components/StudyContent.tsx",
                                lineNumber: 45,
                                columnNumber: 316
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: question.explanation
                            }, void 0, false, {
                                fileName: "[project]/components/StudyContent.tsx",
                                lineNumber: 45,
                                columnNumber: 398
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 45,
                        columnNumber: 217
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                            target: question.target,
                            ...context
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 45,
                            columnNumber: 436
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 45,
                        columnNumber: 433
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "data-action": "next",
                        onClick: ()=>{
                            setIndex(index + 1);
                            setSelected(null);
                        },
                        children: index + 1 === lesson.questions.length ? ui.finish : ui.next
                    }, void 0, false, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 45,
                        columnNumber: 494
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 45,
                columnNumber: 215
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
function ReviewQuestion({ question, ...context }) {
    const ui = labels[context.language];
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
        id: question.id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: question.prompt
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 60
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].response,
                htmlFor: `${question.id}-answer`,
                children: ui.answer
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 86
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: `${question.id}-answer`,
                value: answer,
                rows: 4,
                onChange: (event)=>{
                    setAnswer(event.target.value);
                    setOpen(false);
                }
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 174
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${question.id}-hint`,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: ui.gate
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 310
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-describedby": `${question.id}-hint`,
                "aria-expanded": open,
                "aria-controls": `${question.id}-explanation`,
                disabled: !answer.trim(),
                onClick: ()=>setOpen(!open),
                children: open ? ui.hide : ui.show
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 377
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: `${question.id}-explanation`,
                hidden: !open,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].answers,
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: ui.result
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 52,
                            columnNumber: 676
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: question.explanation
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 52,
                            columnNumber: 696
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                            target: question.target,
                            ...context
                        }, void 0, false, {
                            fileName: "[project]/components/StudyContent.tsx",
                            lineNumber: 52,
                            columnNumber: 725
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 52,
                    columnNumber: 674
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 52,
                columnNumber: 584
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, this);
}
function Glossary({ lesson, ...context }) {
    const ui = labels[context.language];
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const query = search.trim().normalize("NFKC").toLocaleLowerCase();
    const terms = lesson.terms.filter((item)=>`${item.term} ${item.definition}`.normalize("NFKC").toLocaleLowerCase().includes(query));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "glossary-search",
                children: ui.search
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 59,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: "glossary-search",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].search,
                type: "search",
                value: search,
                onChange: (event)=>setSearch(event.target.value)
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 59,
                columnNumber: 64
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                children: [
                    ui.count,
                    ": ",
                    terms.length
                ]
            }, void 0, true, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 59,
                columnNumber: 199
            }, this),
            terms.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                children: terms.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: item.id,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: item.term
                                }, void 0, false, {
                                    fileName: "[project]/components/StudyContent.tsx",
                                    lineNumber: 59,
                                    columnNumber: 345
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/StudyContent.tsx",
                                lineNumber: 59,
                                columnNumber: 341
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].definition,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: item.definition
                                    }, void 0, false, {
                                        fileName: "[project]/components/StudyContent.tsx",
                                        lineNumber: 59,
                                        columnNumber: 412
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MaterialLink, {
                                        target: item.target,
                                        ...context
                                    }, void 0, false, {
                                        fileName: "[project]/components/StudyContent.tsx",
                                        lineNumber: 59,
                                        columnNumber: 436
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/StudyContent.tsx",
                                lineNumber: 59,
                                columnNumber: 378
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/StudyContent.tsx",
                        lineNumber: 59,
                        columnNumber: 285
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 59,
                columnNumber: 262
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: ui.empty
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 59,
                columnNumber: 507
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
function StudyContent({ lesson, ...context }) {
    let content;
    switch(lesson.kind){
        case "pretest":
            content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pretest, {
                lesson: lesson,
                ...context
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 64,
                columnNumber: 31
            }, this);
            break;
        case "questions":
            content = lesson.questions.map((question)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewQuestion, {
                    question: question,
                    ...context
                }, question.id, false, {
                    fileName: "[project]/components/StudyContent.tsx",
                    lineNumber: 65,
                    columnNumber: 66
                }, this));
            break;
        case "glossary":
            content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Glossary, {
                lesson: lesson,
                ...context
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 66,
                columnNumber: 32
            }, this);
            break;
        case "objectives":
        case "one-minute":
        case "clinical":
        case "references":
            content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Reading, {
                lesson: lesson,
                ...context
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 67,
                columnNumber: 89
            }, this);
            break;
        default:
            {
                const exhaustive = lesson;
                throw Error(`Unsupported study content: ${exhaustive}`);
            }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].practice} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudyContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].study}`,
        "data-study": lesson.kind,
        lang: context.language === "KZ" ? "kk" : context.language.toLowerCase(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: lesson.title
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 70,
                columnNumber: 166
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: lesson.introduction
            }, void 0, false, {
                fileName: "[project]/components/StudyContent.tsx",
                lineNumber: 70,
                columnNumber: 189
            }, this),
            content
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudyContent.tsx",
        lineNumber: 70,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/cases/CaseCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CaseCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/PracticeContent.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/CasesContent.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
function CaseCard({ item, number, ui, completed, onComplete }) {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [responses, setResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [choice, setChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [correct, setCorrect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reviewed, setReviewed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const id = `case-${item.id}`;
    const interaction = item.interaction;
    const sequence = interaction?.type === "sequence" ? interaction : undefined;
    const selection = interaction?.type === "choice" ? interaction : undefined;
    const answered = sequence || item.stages.slice(0, visible).every((_, index)=>responses[index]?.trim());
    const ready = Boolean(answered && visible === item.stages.length && (!interaction || checked));
    const hint = sequence ? ui.sequenceGate : selection ? ui.choiceGate : ui.gate;
    function invalidateReview() {
        setOpen(false);
        setReviewed(false);
        if (completed) onComplete(false);
    }
    function updateSequence(next) {
        setSelected(next);
        setChecked(false);
        setFeedback("");
        invalidateReview();
    }
    function check() {
        if (sequence) {
            if (selected.length !== sequence.steps.length) {
                setCorrect(false);
                setFeedback(ui.incomplete);
                return;
            }
            const success = selected.every((step, index)=>step === index);
            setCorrect(success);
            setFeedback(success ? ui.correct : ui.incorrect);
        } else if (selection) {
            if (choice === null) {
                setCorrect(false);
                setFeedback(ui.choose);
                return;
            }
            setCorrect(selection.options[choice].correct);
            setFeedback(selection.options[choice].feedback);
        }
        setChecked(true);
    }
    function nextStage() {
        setVisible(visible + 1);
        requestAnimationFrame(()=>document.getElementById(`${id}-stage-${visible}`)?.focus());
    }
    // Stable mixing avoids hydration differences and does not expose the answer order.
    const mixed = sequence ? sequence.steps.map((_, index)=>index).filter((index)=>index % 2 === 1).reverse().concat(sequence.steps.map((_, index)=>index).filter((index)=>index % 2 === 0).reverse()) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        id: id,
        tabIndex: -1,
        "aria-labelledby": `${id}-title`,
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eyebrow,
                        children: [
                            ui.case,
                            " ",
                            number
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    completed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].completed,
                        children: [
                            "✓ ",
                            ui.done
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 76,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: `${id}-title`,
                children: item.title
            }, void 0, false, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].callout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: ui.situation
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 79,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: item.situation
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 79,
                        columnNumber: 62
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            item.stages.slice(0, visible).map((stage, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stage,
                    "aria-labelledby": `${id}-stage-${index}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            id: `${id}-stage-${index}`,
                            tabIndex: -1,
                            children: [
                                item.stages.length > 1 && `${ui.stage} ${index + 1} / ${item.stages.length}: `,
                                stage.title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        stage.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].data,
                            children: stage.data
                        }, void 0, false, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 83,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            children: stage.questions.map((question)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: question
                                }, question, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 84,
                                    columnNumber: 50
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        !sequence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].response,
                            htmlFor: `${id}-response-${index}`,
                            children: [
                                ui.answer,
                                item.stages.length > 1 && ` — ${ui.stage.toLowerCase()} ${index + 1}`,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: `${id}-response-${index}`,
                                    rows: 4,
                                    value: responses[index] ?? "",
                                    placeholder: ui.placeholder,
                                    onChange: (event)=>{
                                        const next = [
                                            ...responses
                                        ];
                                        next[index] = event.target.value;
                                        setResponses(next);
                                        invalidateReview();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 85,
                            columnNumber: 25
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/components/cases/CaseCard.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)),
            visible < item.stages.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primary,
                    disabled: !answered,
                    "aria-describedby": `${id}-hint`,
                    onClick: nextStage,
                    children: ui.next
                }, void 0, false, {
                    fileName: "[project]/components/cases/CaseCard.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 96,
                columnNumber: 40
            }, this),
            sequence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": ui.available,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: ui.available
                        }, void 0, false, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 100,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].options,
                        children: mixed.map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: selected.includes(index),
                                onClick: ()=>updateSequence([
                                        ...selected,
                                        index
                                    ]),
                                children: sequence.steps[index]
                            }, index, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 102,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: ui.selected
                            }, void 0, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 104,
                                columnNumber: 12
                            }, this),
                            " (",
                            selected.length,
                            "/",
                            sequence.steps.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    selected.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selected,
                        children: selected.map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: sequence.steps[index]
                            }, index, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 105,
                                columnNumber: 85
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 105,
                        columnNumber: 28
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].empty,
                        children: ui.empty
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 105,
                        columnNumber: 139
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primary,
                                onClick: check,
                                children: ui.check
                            }, void 0, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: !selected.length,
                                onClick: ()=>updateSequence(selected.slice(0, -1)),
                                children: ui.undo
                            }, void 0, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: !selected.length,
                                onClick: ()=>updateSequence([]),
                                children: ui.reset
                            }, void 0, false, {
                                fileName: "[project]/components/cases/CaseCard.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 99,
                columnNumber: 20
            }, this),
            selection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].choices,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        children: selection.prompt
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    selection.options.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "radio",
                                    name: `${id}-choice`,
                                    checked: choice === index,
                                    onChange: ()=>{
                                        setChoice(index);
                                        setChecked(false);
                                        setFeedback("");
                                        invalidateReview();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 115,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: option.text
                                }, void 0, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 114,
                            columnNumber: 51
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primary,
                        onClick: check,
                        children: ui.check
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 112,
                columnNumber: 21
            }, this),
            interaction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                className: feedback ? correct ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retry : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                children: feedback
            }, void 0, false, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 122,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${id}-hint`,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].note,
                children: hint
            }, void 0, false, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].disclosure,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].answerButton,
                        disabled: !ready,
                        "aria-expanded": open,
                        "aria-controls": `${id}-explanation`,
                        "aria-describedby": `${id}-hint`,
                        onClick: ()=>{
                            setOpen(!open);
                            if (!open) setReviewed(true);
                        },
                        children: open ? ui.hide : ui.show
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: `${id}-explanation`,
                        hidden: !open,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PracticeContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].answers,
                        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: ui.explanation
                                }, void 0, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                sequence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    children: sequence.steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: step
                                        }, step, false, {
                                            fileName: "[project]/components/cases/CaseCard.tsx",
                                            lineNumber: 132,
                                            columnNumber: 60
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 132,
                                    columnNumber: 26
                                }, this),
                                item.explanation.map((paragraph)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: paragraph
                                    }, paragraph, false, {
                                        fileName: "[project]/components/cases/CaseCard.tsx",
                                        lineNumber: 133,
                                        columnNumber: 50
                                    }, this)),
                                item.diagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: ui.diagram
                                        }, void 0, false, {
                                            fileName: "[project]/components/cases/CaseCard.tsx",
                                            lineNumber: 134,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].diagram,
                                            children: item.diagram.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: step
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/cases/CaseCard.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 134
                                                        }, this),
                                                        index < item.diagram.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": "true",
                                                            children: "↓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/cases/CaseCard.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 190
                                                        }, this)
                                                    ]
                                                }, step, true, {
                                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 119
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/cases/CaseCard.tsx",
                                            lineNumber: 134,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/cases/CaseCard.tsx",
                                    lineNumber: 134,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/cases/CaseCard.tsx",
                            lineNumber: 130,
                            columnNumber: 20
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            reviewed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CasesContent$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].completion,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: completed,
                        onChange: (event)=>onComplete(event.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/components/cases/CaseCard.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    " ",
                    ui.complete
                ]
            }, void 0, true, {
                fileName: "[project]/components/cases/CaseCard.tsx",
                lineNumber: 138,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/cases/CaseCard.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/content/modules/1/organization-animation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrganizationAnimation",
    ()=>getOrganizationAnimation
]);
function getOrganizationAnimation(language) {
    const t = (copy)=>copy[language === "RU" ? 0 : language === "EN" ? 1 : 2];
    return {
        title: t([
            "Учебная анимация",
            "Learning animation",
            "Оқу анимациясы"
        ]),
        instruction: t([
            "Включите воспроизведение или переходите по этапам вручную. Автоматическая смена — каждые 6 секунд. Ручной переход останавливает воспроизведение. Клавиатура: Tab — выбор кнопки, Enter или пробел — действие.",
            "Play the sequence or move through the steps manually. Automatic steps change every 6 seconds. Manual navigation pauses playback. Keyboard: Tab selects a button; Enter or Space activates it.",
            "Анимацияны ойнатыңыз немесе кезеңдерді қолмен ауыстырыңыз. Автоматты ауысу — әр 6 секунд сайын. Қолмен ауыстыру ойнатуды тоқтатады. Пернетақта: Tab — батырманы таңдау, Enter немесе бос орын — әрекет."
        ]),
        play: t([
            "Воспроизвести",
            "Play",
            "Ойнату"
        ]),
        pause: t([
            "Пауза",
            "Pause",
            "Кідірту"
        ]),
        previous: t([
            "Предыдущий этап",
            "Previous step",
            "Алдыңғы кезең"
        ]),
        next: t([
            "Следующий этап",
            "Next step",
            "Келесі кезең"
        ]),
        restart: t([
            "Начать сначала",
            "Start again",
            "Басынан бастау"
        ]),
        step: t([
            "Этап",
            "Step",
            "Кезең"
        ]),
        steps: t([
            "Количество этапов",
            "Number of steps",
            "Кезең саны"
        ]),
        progress: t([
            "Прогресс учебной анимации",
            "Learning animation progress",
            "Оқу анимациясының барысы"
        ]),
        playing: t([
            "Воспроизводится",
            "Playing",
            "Ойнатылуда"
        ]),
        paused: t([
            "На паузе",
            "Paused",
            "Кідіртілген"
        ]),
        last: t([
            "Последний этап. Можно начать сначала.",
            "Last step. You can start again.",
            "Соңғы кезең. Басынан бастауға болады."
        ]),
        cns: t([
            "ЦНС: головной и спинной мозг",
            "CNS: brain and spinal cord",
            "ОЖЖ: ми және жұлын"
        ]),
        pns: t([
            "ПНС: нервы, ганглии и окончания",
            "PNS: nerves, ganglia and endings",
            "ШЖЖ: жүйкелер, ганглийлер және ұштар"
        ]),
        input: t([
            "Информация → ЦНС",
            "Information → CNS",
            "Ақпарат → ОЖЖ"
        ]),
        output: t([
            "ЦНС → управляющий сигнал",
            "CNS → command signal",
            "ОЖЖ → басқарушы сигнал"
        ]),
        model: t([
            "Условная схема: положения и размеры структур упрощены. Стрелки показывают направление передачи, а не точную анатомию проводящих путей.",
            "Schematic model: structure positions and sizes are simplified. Arrows show transmission direction, not the exact anatomy of neural pathways.",
            "Шартты сызба: құрылымдардың орны мен өлшемі жеңілдетілген. Бағдаршалар өткізгіш жолдардың нақты анатомиясын емес, берілу бағытын көрсетеді."
        ]),
        reduced: t([
            "Уменьшение движения включено: без движущихся эффектов; этапы и управление доступны.",
            "Reduced motion is enabled: no moving effects; steps and controls remain available.",
            "Қозғалысты азайту қосулы: қозғалмалы әсерлер жоқ; кезеңдер мен басқару қолжетімді."
        ]),
        stages: [
            {
                id: "whole",
                title: t([
                    "Единая нервная система",
                    "One nervous system",
                    "Біртұтас жүйке жүйесі"
                ]),
                text: t([
                    "Нервная система получает информацию, обрабатывает её и организует ответ. Её центральная и периферическая части работают совместно.",
                    "The nervous system receives information, processes it and organises a response. Its central and peripheral parts work together.",
                    "Жүйке жүйесі ақпаратты қабылдайды, өңдейді және жауапты ұйымдастырады. Оның орталық және шеткі бөліктері бірлесіп жұмыс істейді."
                ])
            },
            {
                id: "cns",
                title: t([
                    "Центральная нервная система",
                    "Central nervous system",
                    "Орталық жүйке жүйесі"
                ]),
                text: t([
                    "Выделены головной и спинной мозг — ЦНС. Центральные сети обрабатывают и интегрируют поступающие сигналы, участвуя в организации ответа.",
                    "The highlighted brain and spinal cord form the CNS. Central circuits process and integrate incoming signals and help organise the response.",
                    "Ми мен жұлын — ОЖЖ белгіленген. Орталық желілер келген сигналдарды өңдеп, біріктіреді және жауапты ұйымдастыруға қатысады."
                ])
            },
            {
                id: "pns",
                title: t([
                    "Периферическая нервная система",
                    "Peripheral nervous system",
                    "Шеткі жүйке жүйесі"
                ]),
                text: t([
                    "Выделена ПНС: периферические нервы, ганглии и нервные окончания. Эти структуры обеспечивают связь ЦНС с органами и тканями.",
                    "The PNS is highlighted: peripheral nerves, ganglia and nerve endings. These structures connect the CNS with organs and tissues.",
                    "ШЖЖ белгіленген: шеткі жүйкелер, ганглийлер және жүйке ұштары. Бұл құрылымдар ОЖЖ-ні мүшелермен және тіндермен байланыстырады."
                ])
            },
            {
                id: "afferent",
                title: t([
                    "От периферии к ЦНС",
                    "From the periphery to the CNS",
                    "Шеттен ОЖЖ-ге"
                ]),
                text: t([
                    "По афферентным путям сенсорная информация от рецепторов поступает к ЦНС. Стрелка направлена к центральным структурам.",
                    "Sensory information travels from receptors along afferent pathways towards the CNS. The arrow points towards central structures.",
                    "Сенсорлық ақпарат рецепторлардан афференттік жолдармен ОЖЖ-ге түседі. Бағдарша орталық құрылымдарға бағытталған."
                ])
            },
            {
                id: "efferent",
                title: t([
                    "От ЦНС к периферии",
                    "From the CNS to the periphery",
                    "ОЖЖ-ден шетке"
                ]),
                text: t([
                    "По эфферентным путям управляющие сигналы идут от ЦНС к исполнительным органам — мышцам и железам. Стрелка показывает это направление.",
                    "Command signals travel from the CNS along efferent pathways to effectors: muscles and glands. The arrow shows this direction.",
                    "Басқарушы сигналдар ОЖЖ-ден эфференттік жолдармен атқарушы мүшелерге — бұлшықеттер мен бездерге барады. Бағдарша осы бағытты көрсетеді."
                ])
            },
            {
                id: "together",
                title: t([
                    "ЦНС и ПНС работают вместе",
                    "CNS and PNS work together",
                    "ОЖЖ мен ШЖЖ бірге жұмыс істейді"
                ]),
                text: t([
                    "Входящая информация, центральная обработка и передача команд образуют связанную систему. Обратная связь о результате действия помогает ЦНС корректировать ответ.",
                    "Incoming information, central processing and outgoing commands form a connected system. Feedback about the outcome helps the CNS adjust the response.",
                    "Кіріс ақпарат, орталық өңдеу және бұйрықтардың берілуі өзара байланысты жүйе құрайды. Әрекет нәтижесі туралы кері байланыс ОЖЖ-ге жауапты түзетуге көмектеседі."
                ])
            }
        ]
    };
}
}),
"[project]/content/sections.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/interface.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/tests/engine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialState",
    ()=>initialState,
    "summarize",
    ()=>summarize,
    "transition",
    ()=>transition,
    "validateTest",
    ()=>validateTest
]);
function initialState(test) {
    return {
        current: test.start,
        phase: test.nodes[test.start].type === "remediation" ? "remediation" : "question",
        selected: null,
        attempts: [],
        history: [],
        retryIds: null,
        retryAttempts: []
    };
}
function enter(test, state, target) {
    if (target === "end") return {
        ...state,
        current: target,
        phase: "results",
        selected: null
    };
    const node = test.nodes[target];
    return {
        ...state,
        current: target,
        selected: null,
        phase: node.type === "remediation" ? "remediation" : "question",
        history: node.type === "remediation" ? [
            ...state.history,
            {
                type: "review",
                nodeId: node.id,
                competency: node.competency,
                depth: node.depth
            }
        ] : state.history
    };
}
function transition(test, state, action) {
    if (action.type === "restart") return initialState(test);
    if (action.type === "retry" && state.phase === "results") {
        const attempts = state.retryIds === null ? state.attempts : state.retryAttempts;
        const retryIds = [
            ...new Set(attempts.filter((attempt)=>!attempt.correct).map((attempt)=>attempt.nodeId))
        ];
        return retryIds.length ? enter(test, {
            ...state,
            retryIds,
            retryAttempts: []
        }, retryIds[0]) : state;
    }
    if (state.phase === "results") return state;
    const node = test.nodes[state.current];
    if (action.type === "select") {
        if (state.phase !== "question" || node.type !== "question" || !node.options.some((option)=>option.id === action.answer)) return state;
        return {
            ...state,
            selected: action.answer
        };
    }
    if (action.type === "check") {
        if (state.phase !== "question" || node.type !== "question" || state.selected === null) return state;
        const attempt = {
            nodeId: node.id,
            competency: node.competency,
            level: node.level,
            answer: state.selected,
            correct: state.selected === node.correctAnswer
        };
        if (state.retryIds !== null) return {
            ...state,
            retryAttempts: [
                ...state.retryAttempts,
                attempt
            ],
            phase: "feedback"
        };
        const answered = {
            ...state,
            attempts: [
                ...state.attempts,
                attempt
            ],
            history: [
                ...state.history,
                {
                    type: "answer",
                    attempt
                }
            ],
            phase: "feedback"
        };
        // Always show immediate feedback before following the data-defined branch.
        return answered;
    }
    if (action.type === "continue") {
        if (state.phase === "remediation" && node.type === "remediation") return enter(test, state, node.next);
        if (state.phase === "feedback" && node.type === "question") {
            if (state.retryIds !== null) return enter(test, state, state.retryIds[state.retryAttempts.length] ?? "end");
            const attempt = state.attempts[state.attempts.length - 1];
            return enter(test, state, attempt.correct ? node.onCorrect : node.onIncorrect);
        }
    }
    return state;
}
function summarize(test, state) {
    const mains = state.attempts.filter((attempt)=>attempt.level === "main");
    const mastered = new Set(state.attempts.filter((attempt)=>attempt.correct).map((attempt)=>attempt.competency));
    const weak = [
        ...new Set(state.attempts.filter((attempt)=>!attempt.correct).map((attempt)=>attempt.competency))
    ];
    return {
        total: test.mainIds.length,
        mainAnswered: mains.length,
        firstCorrect: mains.filter((attempt)=>attempt.correct).length,
        mastered: mastered.size,
        recovered: weak.filter((id)=>mastered.has(id)).length,
        additional: state.attempts.length - mains.length,
        remediations: state.history.filter((event)=>event.type === "review").length,
        weak,
        unresolved: weak.filter((id)=>!mastered.has(id))
    };
}
function validateTest(test) {
    if (!test.mainIds.length || new Set(test.mainIds).size !== test.mainIds.length) throw Error("Invalid main route");
    const mainCompetencies = new Set();
    test.mainIds.forEach((id)=>{
        const node = test.nodes[id];
        if (!node || node.type !== "question" || node.level !== "main" || mainCompetencies.has(node.competency)) throw Error(`Invalid main question: ${id}`);
        mainCompetencies.add(node.competency);
    });
    const visited = new Set();
    const visiting = new Set();
    function visit(id) {
        if (id === "end") return;
        if (visiting.has(id)) throw Error(`Cycle at ${id}`);
        if (visited.has(id)) return;
        const node = test.nodes[id];
        if (!node || node.id !== id || !test.competencies[node.competency]) throw Error(`Invalid node: ${id}`);
        visiting.add(id);
        if (node.type === "question") {
            if (node.options.length < 2 || new Set(node.options.map((option)=>option.id)).size !== node.options.length || !node.options.some((option)=>option.id === node.correctAnswer)) throw Error(`Invalid options: ${id}`);
            visit(node.onCorrect);
            visit(node.onIncorrect);
        } else visit(node.next);
        visiting.delete(id);
        visited.add(id);
    }
    visit(test.start);
    if (visited.size !== Object.keys(test.nodes).length) throw Error("Unreachable nodes in test");
}
}),
];

//# sourceMappingURL=_1zby7-5._.js.map