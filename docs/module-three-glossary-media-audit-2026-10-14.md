# Модуль 3: glossary и media — аудит 14.10.2026

Ветка: refactor/evidence-based-assessment-audit. Не объединять с main; не публиковать Vercel.

Проверены исходники: content/course-foundation/index.ts, topics.ts, content/index.ts, content/study.ts, content/media.ts, app/modules/[id]/[section]/page.tsx, content/course-foundation/module-three-glossary.ts, vercel.json.

Прочитаны Library: Guyton & Hall 13e, PDF 78–79; Ganong 23e, PDF 92–94; C. L. Ghai 8e, PDF 248–250. Сверены различия миелина ЦНС/ПНС, микроглия, перехваты Ранвье, скорость проведения.

Файл module-three-glossary.ts содержит 9 дополнительных терминов на RU/EN/KZ, но content/index.ts не импортирует и не регистрирует createModuleThreeGlossary: термины не отображаются. Попытка правки index.ts заблокирована инструментом.

Media модуля 3 использует общую анимацию с вопросом о методике просмотра вместо предметного механизма глия–миелин–проведение. Требуется авторский сценарий с физиологическими причинно-следственными изменениями и проверкой в браузере.

Проверка git ls-remote в контейнере: ошибка DNS github.com. Node/TypeScript/build/browser не запускались. Изменений main, preview или production не делали. Аудит 425 разделов не завершён.
