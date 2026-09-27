module.exports = [
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
];

//# sourceMappingURL=_11kc92a._.js.map