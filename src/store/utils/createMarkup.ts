export const createMarkup = (htmlText: string) => {return {__html: htmlText}}

// Знаю, что небезопасный метод, но по другому пока не умею рендерить jsx разметку из текста
// (а с API прилетает именно HTML-разметка в виде текста комментариев)