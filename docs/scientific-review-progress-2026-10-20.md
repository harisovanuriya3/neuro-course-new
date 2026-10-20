# Дополнение к научному аудиту — 20 октября 2026

Продолжение журнала docs/scientific-review-progress-2026-10-13.md. Модуль 5, разделы objectives, clinical, practice, cases.

Прочитаны реальные файлы module-five-learning.ts, module-five-clinical.ts, module-five-practice.ts, module-five-cases.ts, module-five-theory.ts, module-five-pretest.ts, module-five-summary.ts, module-five-questions.ts, content/index.ts, фабрики основы, маршруты, регрессионные скрипты, package.json и vercel.json.

Сверено с Library: Guyton & Hall 13e PDF с. 96–100, 556–558, 743; Ganong 23e PDF с. 127–130, 133–135, 503–504; C. L. Ghai 8e PDF с. 353–354. Проверены механизмы Ca²⁺-зависимого выделения медиатора, рецепторы nAChR/M2, квантовая передача и ограничения изолированного нервно-мышечного препарата. Полная экспертная проверка каждой строки RU/EN/KZ не заявляется.

Найден дефект: четыре предметных файла существовали, но не были зарегистрированы в content/index.ts. Для objectives, practice, cases отображались общие шаблоны; clinical имел отдельный прямой маршрут, но не общий реестр. Исправление регистрации четырёх разделов в RU/EN/KZ: коммит 8a7aaee9. Расширена регрессия scripts/check-module-five-clinical.cjs: коммит d2b5c6df.

Проверка чтением обновлённых файлов: 12/12 регистраций, getLesson, специальный клинический маршрут, deploymentEnabled=false. Node/AST, npm run audit:course, tsc, build, браузер и экспертная вычитка KZ не запускались. Контейнер: Could not resolve host github.com. Следующие разделы модуля 5: tests, virtual-patient, media, glossary, voice, progress, notes, references. Полный аудит 425 разделов не завершён; main и Vercel не изменялись.

Practice follow-up: 27 static checks passed. Code commits 6be4462b, 972977d5, c9959474. Full validation pending.

Practice evidence: independent release measurement and unchanged end-plate response to an identical local acetylcholine dose, in RU/EN/KZ. Coexisting defects remain possible.
