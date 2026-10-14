# Модуль 3: glossary и media — аудит 14.10.2026

Ветка: refactor/evidence-based-assessment-audit. Не объединять с main; не публиковать Vercel.

Проверены исходники: content/course-foundation/index.ts, topics.ts, content/index.ts, content/study.ts, content/media.ts, app/modules/[id]/[section]/page.tsx, content/course-foundation/module-three-glossary.ts, vercel.json.

Прочитаны Library: Guyton & Hall 13e, PDF 78–79; Ganong 23e, PDF 92–94; C. L. Ghai 8e, PDF 248–250. Сверены различия миелина ЦНС/ПНС, микроглия, перехваты Ранвье, скорость проведения.

Файл module-three-glossary.ts содержит 9 дополнительных терминов на RU/EN/KZ, но content/index.ts не импортирует и не регистрирует createModuleThreeGlossary: термины не отображаются. Попытка правки index.ts заблокирована инструментом.

Media модуля 3 использует общую анимацию с вопросом о методике просмотра вместо предметного механизма глия–миелин–проведение. Требуется авторский сценарий с физиологическими причинно-следственными изменениями и проверкой в браузере.

Проверка git ls-remote в контейнере: ошибка DNS github.com. Node/TypeScript/build/browser не запускались. Изменений main, preview или production не делали. Аудит 425 разделов не завершён.

Дополнительно прочитаны components/MediaContent.tsx и components/FoundationMediaAnimation.tsx. В media реально рендерится FoundationMediaAnimation (а не пустой видеоплеер); для модуля 3 это условная SVG-сцена group="cells". Шаги основаны на произвольном массиве value=[24,46,72,88], который не обозначен как физиологическое измерение. Педагогически требуется явная пометка «иллюстративная схема» и отдельная проверяемая лаборатория для скорости проведения, а не трактовка этих чисел как данных эксперимента.

Адресные проверки исходников: 9 уникальных ключей словаря; 9 записей RU, 9 EN, 9 KZ; функция createModuleThreeGlossary существует; регистрация в content/index.ts отсутствует (FAIL); в vercel.json deploymentEnabled для ветки false (PASS). Полная компиляция не подтверждена.

Добавлен отдельный регрессионный тест scripts/check-module-three-glossary-media.cjs (коммит 78c1724f). Он должен обнаружить отсутствие регистрации glossary и предупреждения об иллюстративном характере media. На текущих исходниках эти два условия не выполняются; тест ожидаемо НЕ пройдёт, пока не исправлены content/index.ts и FoundationMediaAnimation.tsx. Скрипт не добавляли в общую команду CI, поскольку он сейчас красный. Попытки исправить оба существующих исходника через GitHub update_file отклонены safety checks; обход не выполнялся.
