export const swaggerCss = `
:root {
  --zh-paper: #efece6;
  --zh-card: #fffcf8;
  --zh-ink: #1a1814;
  --zh-muted: #6f6a62;
  --zh-line: #e4dfd6;
  --zh-line-strong: #d4cec3;
  --zh-unauth: #0f6e6b;
  --zh-unauth-soft: #e7f4f3;
  --zh-public: #1e4fd7;
  --zh-public-soft: #eaf0ff;
  --zh-admin: #b8611a;
  --zh-admin-soft: #fbf1e6;
  --zh-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --zh-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
}

html { background: var(--zh-paper); }

body {
  margin: 0;
  background:
    linear-gradient(90deg, var(--zh-unauth) 0 33.33%, var(--zh-public) 33.33% 66.66%, var(--zh-admin) 66.66%) top / 100% 3px no-repeat,
    var(--zh-paper);
  color: var(--zh-ink);
}

body::selection,
.swagger-ui ::selection {
  background: #d5ebe8;
  color: var(--zh-ink);
}

.swagger-ui {
  background: transparent;
  color: var(--zh-ink);
  font-family: var(--zh-sans);
}

.swagger-ui .wrapper {
  max-width: 1080px;
  padding: 0 28px;
  box-sizing: border-box;
}

.swagger-ui,
.swagger-ui button,
.swagger-ui input,
.swagger-ui select,
.swagger-ui textarea,
.swagger-ui .btn,
.swagger-ui .opblock-tag,
.swagger-ui .opblock-summary-description,
.swagger-ui .info .title,
.swagger-ui .renderedMarkdown,
.swagger-ui .parameter__name,
.swagger-ui label,
.swagger-ui table {
  font-family: var(--zh-sans);
}

.swagger-ui .topbar { display: none; }

/* Вступление */

.swagger-ui .information-container.wrapper {
  background: var(--zh-card);
  border: 1px solid var(--zh-line);
  border-radius: 22px;
  margin: 28px auto 0;
  padding: 8px 12px 12px;
  box-shadow:
    0 1px 2px rgba(26, 24, 20, 0.04),
    0 18px 50px rgba(26, 24, 20, 0.05);
}

.swagger-ui .info { margin: 18px 16px 8px; }

.swagger-ui .info .title {
  color: var(--zh-ink);
  font-size: 40px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.035em;
}

.swagger-ui .info .title small { background: transparent; }

.swagger-ui .info .title small.version-stamp { display: none; }

.swagger-ui .info .title small pre.version {
  background: var(--zh-paper);
  color: var(--zh-muted);
  border: 1px solid var(--zh-line);
  border-radius: 999px;
  padding: 4px 9px;
  margin-left: 10px;
  font-family: var(--zh-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  vertical-align: 8px;
}

.swagger-ui .info .renderedMarkdown p,
.swagger-ui .info .markdown p {
  color: var(--zh-muted);
  font-size: 14.5px;
  line-height: 1.55;
}

.swagger-ui .info .renderedMarkdown > p:first-child,
.swagger-ui .info .markdown > p:first-child {
  color: var(--zh-ink);
  font-size: 17px;
  line-height: 1.45;
  margin: 10px 0 0;
}

.swagger-ui .info .renderedMarkdown > p:last-child,
.swagger-ui .info .markdown > p:last-child {
  margin-top: 14px;
  margin-bottom: 4px;
  font-size: 13px;
}

.swagger-ui .renderedMarkdown code,
.swagger-ui .markdown code,
.swagger-ui .info .renderedMarkdown a,
.swagger-ui .info .markdown a {
  background: var(--zh-paper);
  color: var(--zh-ink);
  border-radius: 6px;
  padding: 1px 6px;
  font-family: var(--zh-mono);
  font-size: 0.86em;
  font-weight: 500;
  text-decoration: none;
}

.swagger-ui .info .renderedMarkdown ul,
.swagger-ui .info .markdown ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.swagger-ui .info .renderedMarkdown li,
.swagger-ui .info .markdown li {
  display: block;
  margin: 0;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--zh-line);
  background: var(--zh-card);
  color: var(--zh-ink);
  font-family: var(--zh-sans);
  font-size: 13.5px;
  line-height: 1.3;
  list-style: none;
}

.swagger-ui .info .renderedMarkdown li:nth-child(1),
.swagger-ui .info .markdown li:nth-child(1) {
  background: var(--zh-unauth-soft);
  border-color: #c5e4e1;
}

.swagger-ui .info .renderedMarkdown li:nth-child(2),
.swagger-ui .info .markdown li:nth-child(2) {
  background: var(--zh-public-soft);
  border-color: #cddaff;
}

.swagger-ui .info .renderedMarkdown li:nth-child(3),
.swagger-ui .info .markdown li:nth-child(3) {
  background: var(--zh-admin-soft);
  border-color: #f0d7bf;
}

.swagger-ui .info .renderedMarkdown li strong,
.swagger-ui .info .markdown li strong { font-weight: 600; }

.swagger-ui .info .renderedMarkdown li code,
.swagger-ui .info .markdown li code {
  background: transparent;
  padding: 0;
  font-size: 1em;
}

/* Авторизация */

.swagger-ui .scheme-container {
  background: transparent;
  box-shadow: none;
  margin: 0;
  padding: 14px 0 0;
}

.swagger-ui .scheme-container .schemes.wrapper { padding: 0 28px; }

.swagger-ui .auth-wrapper { justify-content: flex-end; }

.swagger-ui .btn.authorize {
  background: var(--zh-ink);
  border: 1px solid var(--zh-ink);
  color: #fff;
  border-radius: 999px;
  padding: 8px 16px 8px 14px;
  line-height: 1.2;
  font-weight: 600;
  font-size: 13px;
  box-shadow: none;
  transition: background 0.15s ease, transform 0.15s ease;
}

.swagger-ui .btn.authorize:hover {
  background: #2a261f;
  border-color: #2a261f;
}

.swagger-ui .btn.authorize svg,
.swagger-ui .btn.authorize svg path { fill: #fff; }

.swagger-ui .authorization__btn { padding: 0 8px; }

.swagger-ui .authorization__btn svg { fill: var(--zh-muted); }

.swagger-ui .authorization__btn.locked svg,
.swagger-ui .authorization__btn.unlocked svg { fill: var(--zh-unauth); }

/* Поиск */

.swagger-ui .filter-container { background: transparent; margin: 0; padding: 0; }

.swagger-ui .filter .operation-filter-input {
  width: 100%;
  margin: 18px 0 6px;
  padding: 13px 16px 13px 42px;
  border: 1px solid var(--zh-line);
  border-radius: 14px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236f6a62' stroke-width='1.8' stroke-linecap='round'%3E%3Ccircle cx='7' cy='7' r='4.5'/%3E%3Cpath d='M10.5 10.5 14 14'/%3E%3C/svg%3E") 16px 50% no-repeat,
    var(--zh-card);
  box-shadow: 0 1px 2px rgba(26, 24, 20, 0.04);
  color: var(--zh-ink);
  font-size: 14px;
  outline: none;
}

.swagger-ui .filter .operation-filter-input::placeholder { color: #9a948b; }

.swagger-ui .filter .operation-filter-input:focus {
  border-color: #b9b2a7;
  box-shadow: 0 0 0 4px rgba(26, 24, 20, 0.06);
}

/* Разделы */

.swagger-ui .opblock-tag-section { margin: 22px 0 4px; }

.swagger-ui .opblock-tag {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 10px;
  margin: 0 0 10px;
  padding: 8px 2px 0;
  border: 0;
  border-bottom: 0;
}

.swagger-ui .opblock-tag:hover { background: transparent; }

.swagger-ui .opblock-tag > a { order: 1; }

.swagger-ui .opblock-tag > button,
.swagger-ui .opblock-tag .expand-operation {
  order: 2;
  margin-left: auto;
  border: 0;
  background: transparent;
  border-radius: 999px;
  width: 28px;
  height: 28px;
}

.swagger-ui .opblock-tag small {
  order: 3;
  flex: 1 0 100%;
  padding: 2px 0 0 18px;
  font-size: 13px;
  font-weight: 400;
}

.swagger-ui .opblock-tag small,
.swagger-ui .opblock-tag small p {
  margin: 0;
  color: var(--zh-muted);
  font-size: 13px;
  font-weight: 400;
}

.swagger-ui .opblock-tag a,
.swagger-ui .opblock-tag a span {
  color: var(--zh-ink);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.swagger-ui .opblock-tag a span::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 10px;
  border-radius: 99px;
  transform: translateY(-1px);
  background: var(--zh-muted);
}

.swagger-ui .opblock-tag[data-tag^="unauth"] a span::before { background: var(--zh-unauth); }
.swagger-ui .opblock-tag[data-tag^="public"] a span::before { background: var(--zh-public); }
.swagger-ui .opblock-tag[data-tag^="admin"] a span::before { background: var(--zh-admin); }

.swagger-ui .expand-operation svg,
.swagger-ui .opblock-control-arrow svg,
.swagger-ui .opblock-summary-control svg,
.swagger-ui .models-control svg,
.swagger-ui .opblock-tag svg {
  fill: #9a948b;
}

/* Карточки ручек */

.swagger-ui .opblock {
  margin: 0 0 10px;
  border-radius: 14px;
  border: 1px solid var(--zh-line);
  background: var(--zh-card);
  box-shadow: 0 1px 2px rgba(26, 24, 20, 0.04);
  overflow: hidden;
}

.swagger-ui .opblock:hover {
  border-color: var(--zh-line-strong);
  box-shadow: 0 8px 24px rgba(26, 24, 20, 0.05);
}

.swagger-ui .opblock .opblock-summary {
  border: 0;
  padding: 6px 10px 6px 6px;
}

.swagger-ui .opblock .opblock-summary-method {
  min-width: 68px;
  padding: 7px 0;
  border-radius: 10px;
  font-family: var(--zh-sans);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-shadow: none;
}

.swagger-ui .opblock .opblock-summary-path,
.swagger-ui .opblock .opblock-summary-path a,
.swagger-ui .opblock .opblock-summary-path span {
  color: var(--zh-ink);
  font-family: var(--zh-mono);
  font-size: 13px;
  font-weight: 500;
}

.swagger-ui .opblock .opblock-summary-path a:hover { text-decoration: none; }

.swagger-ui .opblock .opblock-summary-description {
  color: var(--zh-muted);
  font-size: 13px;
  font-weight: 400;
}

.swagger-ui .opblock.opblock-get,
.swagger-ui .opblock.opblock-post,
.swagger-ui .opblock.opblock-put,
.swagger-ui .opblock.opblock-patch,
.swagger-ui .opblock.opblock-delete,
.swagger-ui .opblock.opblock-head,
.swagger-ui .opblock.opblock-options {
  background: var(--zh-card);
  border-color: var(--zh-line);
}

.swagger-ui .opblock.opblock-get .opblock-summary-method { background: var(--zh-public); }
.swagger-ui .opblock.opblock-post .opblock-summary-method { background: var(--zh-unauth); }
.swagger-ui .opblock.opblock-put .opblock-summary-method { background: #5b45c2; }
.swagger-ui .opblock.opblock-patch .opblock-summary-method { background: var(--zh-admin); }
.swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #b4234a; }
.swagger-ui .opblock.opblock-head .opblock-summary-method,
.swagger-ui .opblock.opblock-options .opblock-summary-method { background: #6f6a62; }

.swagger-ui .opblock.is-open .opblock-summary { border-bottom: 1px solid var(--zh-line); }

.swagger-ui .opblock.is-open.opblock-post { border-color: #b7ddd9; }
.swagger-ui .opblock.is-open.opblock-get { border-color: #c5d4fb; }
.swagger-ui .opblock.is-open.opblock-patch,
.swagger-ui .opblock.is-open.opblock-put { border-color: #efd3b6; }
.swagger-ui .opblock.is-open.opblock-delete { border-color: #f0c4d0; }

/* Раскрытая операция */

.swagger-ui .opblock .opblock-section-header {
  background: #f7f4ee;
  box-shadow: none;
  border-bottom: 1px solid var(--zh-line);
  padding: 10px 16px;
}

.swagger-ui .opblock .opblock-section-header h4,
.swagger-ui .opblock .opblock-section-header label {
  color: var(--zh-ink);
  font-size: 13px;
  font-weight: 600;
}

.swagger-ui .opblock-description-wrapper,
.swagger-ui .opblock-body,
.swagger-ui .opblock-description-wrapper p,
.swagger-ui .opblock-external-docs-wrapper p {
  background: var(--zh-card);
  color: var(--zh-ink);
  font-size: 14px;
}

.swagger-ui .opblock-description-wrapper { padding: 12px 16px 0; }

.swagger-ui table.parameters,
.swagger-ui table.responses-table,
.swagger-ui .parameters-col_description {
  color: var(--zh-ink);
}

.swagger-ui .parameters-col_name { width: 22%; }

.swagger-ui .parameter__name {
  font-family: var(--zh-mono);
  font-size: 12.5px;
  color: var(--zh-ink);
}

.swagger-ui .parameter__type {
  color: var(--zh-unauth);
  font-family: var(--zh-mono);
  font-size: 12px;
}

.swagger-ui .parameter__deprecated,
.swagger-ui .parameter__in {
  color: var(--zh-muted);
  font-size: 12px;
}

.swagger-ui table.parameters td,
.swagger-ui table.responses-table td {
  border-bottom: 1px solid #f0ece4;
  padding: 12px 0;
}

.swagger-ui .response-col_status { color: var(--zh-ink); font-weight: 600; }

.swagger-ui input[type=text],
.swagger-ui input[type=password],
.swagger-ui input[type=search],
.swagger-ui input[type=email],
.swagger-ui textarea,
.swagger-ui select {
  border: 1px solid var(--zh-line-strong);
  border-radius: 10px;
  background: #fff;
  box-shadow: none;
  color: var(--zh-ink);
  padding: 8px 10px;
  min-height: 36px;
}

.swagger-ui input[type=text]:focus,
.swagger-ui input[type=password]:focus,
.swagger-ui textarea:focus,
.swagger-ui select:focus {
  border-color: #b9b2a7;
  outline: none;
  box-shadow: 0 0 0 4px rgba(26, 24, 20, 0.05);
}

.swagger-ui textarea { min-height: 120px; }

.swagger-ui .btn {
  border-radius: 10px;
  box-shadow: none;
  font-weight: 600;
}

.swagger-ui .btn.execute {
  background: var(--zh-ink);
  border-color: var(--zh-ink);
  color: #fff;
  padding: 8px 18px;
}

.swagger-ui .btn.execute:hover { background: #2a261f; }

.swagger-ui .btn.cancel,
.swagger-ui .btn-clear,
.swagger-ui .try-out__btn {
  background: transparent;
  border: 1px solid var(--zh-line-strong);
  color: var(--zh-ink);
}

.swagger-ui .try-out__btn:hover,
.swagger-ui .btn.cancel:hover {
  background: #f7f4ee;
}

.swagger-ui .tab li {
  border-radius: 999px;
}

.swagger-ui .tab li button.tablinks {
  padding: 6px 10px;
}

.swagger-ui .model-box,
.swagger-ui .model { color: var(--zh-ink); }

.swagger-ui .model-title,
.swagger-ui .model .property {
  font-family: var(--zh-mono);
  font-size: 12.5px;
}

.swagger-ui .prop-type { color: var(--zh-unauth); }

.swagger-ui .highlight-code,
.swagger-ui .microlight,
.swagger-ui .curl-command {
  border-radius: 12px;
}

.swagger-ui .highlight-code pre,
.swagger-ui .microlight {
  border-radius: 12px;
  font-family: var(--zh-mono);
}

.swagger-ui .responses-inner {
  padding: 8px 16px 16px;
}

.swagger-ui .response-control-media-type__title,
.swagger-ui .response-control-media-type__accept-message {
  color: var(--zh-muted);
  font-size: 12px;
}

.swagger-ui section.models {
  display: none;
}

/* Диалог авторизации */

.swagger-ui .dialog-ux .backdrop-ux { background: rgba(26, 24, 20, 0.38); }

.swagger-ui .dialog-ux .modal-ux {
  background: var(--zh-card);
  border: 1px solid var(--zh-line);
  border-radius: 18px;
  box-shadow: 0 24px 80px rgba(26, 24, 20, 0.2);
  max-width: 480px;
}

.swagger-ui .dialog-ux .modal-ux-header {
  border-bottom: 1px solid var(--zh-line);
  padding: 16px 20px;
}

.swagger-ui .dialog-ux .modal-ux-header h3 {
  color: var(--zh-ink);
  font-size: 18px;
  font-weight: 600;
}

.swagger-ui .dialog-ux .modal-ux-content {
  padding: 16px 20px 20px;
}

.swagger-ui .auth-container h4,
.swagger-ui .auth-container .wrapper,
.swagger-ui .auth-container code {
  color: var(--zh-ink);
}

.swagger-ui .auth-btn-wrapper .btn-done,
.swagger-ui .btn.modal-btn.auth.authorize {
  background: var(--zh-ink);
  border-color: var(--zh-ink);
  color: #fff;
  border-radius: 10px;
}

.swagger-ui .close-modal svg { fill: var(--zh-muted); }

@media (max-width: 720px) {
  .swagger-ui .wrapper,
  .swagger-ui .scheme-container .schemes.wrapper { padding: 0 16px; }

  .swagger-ui .info .title { font-size: 32px; }

  .swagger-ui .opblock .opblock-summary-description { display: none; }
}
`
