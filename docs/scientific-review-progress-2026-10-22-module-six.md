# 22.10.2026 — модуль 6, theory и glossary (адресный аудит)

Рабочая ветка: `refactor/evidence-based-assessment-audit`. Не объединять с main; не публиковать и не включать Vercel previews.

## Реально проверено

Прочитаны исходники `content/course-foundation/module-six-theory.ts`, `content/course-foundation/topics.ts`, `content/course-foundation/index.ts`, `content/index.ts`, `content/types.ts`, `content/study.ts`, `components/LessonContent.tsx`, `components/SectionContent.tsx`, `scripts/check-module-six-pretest.cjs`, `package.json`, `vercel.json`. Непосредственно прочитаны пользовательские Library PDF: Ganong 23e, PDF 128–133 (особенно 132–133: EPSP, IPSP, суммация, начальный сегмент); Guyton & Hall 13e, PDF 559–565 (проводимость, потенциалы, начальный сегмент, пресинаптическое торможение); C. L. Ghai 8e, PDF 353–354 (изолированный нервно-мышечный препарат, не измерение центрального шунтирования).

## Подтверждённые дефекты и статус

1. `module-six-theory.ts` присваивал двум разным блокам одинаковый id `shunting-and-threshold`, поэтому `LessonContent` создавал дублирующиеся HTML id и React keys. Исправлено: третий блок имеет собственный id `presynaptic-vs-postsynaptic-inhibition`. Коммит `6787b52d`. Смысловые тексты теории по трём языкам сохранены.
2. В общей фабрике glossary для модуля 6 термины «Суммация» и «Шунтирующее торможение» ошибочно определены как «Возбуждение» и «Торможение» соответственно, во всех RU/EN/KZ. Подготовлен `module-six-glossary.ts` с предметными определениями в трёх языках, коммит `b116ff2b`, **НО ЕЩЁ НЕ ПОДКЛЮЧЁН** в `content/index.ts`: попытка записи полного файла была заблокирована инструментом. Поэтому ошибочный словарь всё ещё показывается студенту, исправление нельзя считать завершённым.
3. Отдельный регрессионный тест для теории/словаря ещё не добавлен: попытка записи существующего скрипта также блокирована. Дублирующий id проверен чтением исходников после коммита, но не браузером.

## Техническая проверка и ограничения

Контейнер не смог разрешить github.com для checkout. Обнаружен существующий GitHub Actions `Scientific and course QA (review branch only)`: он запускает `npm ci`, `npm run audit:course`, `npx tsc --noEmit`, `npm run build` без публикации; результат запуска для SHA `b116ff2b` необходимо дождаться и зафиксировать. В `vercel.json` branch preview отключён. Независимая вычитка KZ, браузер, мобильный UX, озвучивание и полный аудит 25×17 не выполнены.

## Следующие действия

Подключить `createModuleSixGlossary` для RU/EN/KZ в `content/index.ts`, добавить тест, проверить CI и все оставшиеся разделы. Это отдельный чекпойнт к основному `docs/scientific-review-progress-2026-10-13.md`; основной журнал не удалось обновить из-за блокировки записи большого файла.
