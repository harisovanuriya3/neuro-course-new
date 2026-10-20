# Модуль 5: виртуальная модель — аудит 21.10.2026

Прочитаны `content/course-foundation/module-five-virtual-patient-review.ts`, `content/reviewed-virtual-patients.ts`, `content/virtual-patients.ts`, `components/UnifiedVirtualPatient.tsx` и `vercel.json`.

Сверены Library: Ganong 23e PDF 127–132, Guyton & Hall 13e PDF 96–99 и 556–558, Ghai 8e PDF 353–354.

**Подтверждённый педагогический дефект:** `mentorPrompt:c.explanation[language]` показывает разбор до выбора ответа (компонент выводит `stage.mentorPrompt`, пока выбор не завершён). Следует заменить предрешающий разбор на наводящий вопрос, оставив `mechanism:c.explanation[language]` для обратной связи. Изменение кода пока не подтверждено.

Научные ограничения сценария сформулированы корректно: ответ мышцы не определяет однозначно место нарушения, локальная Ca²⁺-зависимость и квантовая передача показаны концептуально, данные заранее заданы. Независимая вычитка KZ, Node, TypeScript, build и браузер остаются открытыми. Не считать раздел полностью сертифицированным.

Изменения в main, production и Vercel preview запрещены.
