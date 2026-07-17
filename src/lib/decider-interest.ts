/**
 * Отправка «интереса» с экрана Decider в Google Form.
 *
 * Сайт статический (GitHub Pages), бэкенда нет — пишем прямо в Google Form,
 * у которой из коробки есть таблица ответов (= счётчик). Каждый вызов = одна
 * строка. Email опционален: пустая строка тоже фиксирует факт интереса.
 *
 * Из-за отсутствия CORS-заголовков у Google Form запрос идёт с
 * `mode: "no-cors"` — ответ opaque, статус прочитать нельзя. Для мягкого
 * счётчика интереса это ок; UI остаётся оптимистичным.
 *
 * TODO(owner): подставить реальные значения из своей Google Form.
 * Форма: https://docs.google.com/forms/d/e/1FAIpQLSe89JjKClKBG02qwD3xXT2GunfTXDhf1P-iH5bM0-m0EzqN2w/viewform
 */

/** Action-URL формы (…/formResponse, НЕ /viewform). */
const FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe89JjKClKBG02qwD3xXT2GunfTXDhf1P-iH5bM0-m0EzqN2w/formResponse';

/** entry-ID поля Email. */
const ENTRY_EMAIL = 'entry.2057372459';

/**
 * Фиксирует интерес к Decider. Не бросает и ничего не возвращает —
 * сетевые ошибки глотаются, чтобы UI всегда показывал подтверждение.
 *
 * @param email — email пользователя; пустая строка допустима.
 */
export function submitInterest(email: string): void {
  const body = new FormData();
  body.append(ENTRY_EMAIL, email);

  fetch(FORM_ACTION_URL, {
    method: 'POST',
    mode: 'no-cors',
    body,
  }).catch(() => {
    /* офлайн/сетевая ошибка — submission теряется молча */
  });
}
