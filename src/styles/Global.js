import { createGlobalStyle } from 'styled-components';
import 'typeface-exo-2';
import 'typeface-roboto-mono';
import 'typeface-inconsolata';

const GlobalStyle = createGlobalStyle`
  p, a, li, span, small {
    font-family: 'Roboto Mono', monospace;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Exo 2', sans-serif;
    text-transform: uppercase;
  }

  h1 {
      font-size: 6rem;
      line-height: 7.1rem;
  }
  h2 {
    font-size: 4rem;
    line-height: 5.1rem;
  }
  h3 {
    font-size: 2rem;
    line-height: 3.1rem;
  }

  p, li, span {
      font-size: 1.4rem;
      line-height: 2.5rem;
  }

  button {
    cursor: pointer;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 62.5%;
}

@-ms-viewport {
  width: device-width;
}

article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
  display: block;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.4rem;
  line-height: 2.5rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

[tabindex="-1"]:focus {
  outline: 0 !important;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

abbr[title],
abbr[data-original-title] {
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  cursor: help;
  border-bottom: 0;
}

address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

dt {
  font-weight: 700;
}

dd {
  margin-bottom: .5rem;
  margin-left: 0;
}

blockquote {
  margin: 0 0 1rem;
}

b,
strong {
  font-weight: bolder;
}

small {
  font-size: 80%;
}

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -.25em;
}

sup {
  top: -.5em;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {
  color: inherit;
  text-decoration: none;
}

a:not([href]):not([tabindex]):focus {
  outline: 0;
}

pre {
  margin-top: 0;
  margin-bottom: 1rem !important;
  overflow: auto;
  -ms-overflow-style: scrollbar;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

figure {
  margin: 0 0 1rem;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}

table {
  border-collapse: collapse;
}

caption {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: #6c757d;
  text-align: left;
  caption-side: bottom;
}

th {
  text-align: inherit;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

button {
  border-radius: 0;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type="radio"],
input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

input[type="date"],
input[type="time"],
input[type="datetime-local"],
input[type="month"] {
  -webkit-appearance: listbox;
}

textarea {
  overflow: auto;
  resize: vertical;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin-bottom: .5rem;
  font-size: 1.5rem;
  line-height: inherit;
  color: inherit;
  white-space: normal;
}

progress {
  vertical-align: baseline;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  outline-offset: -2px;
  -webkit-appearance: none;
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

output {
  display: inline-block;
}

summary {
  display: list-item;
  cursor: pointer;
}

template {
  display: none;
}

[hidden] {
  display: none !important;
}

/******** Code *********/

code[class*='language-'],
pre[class*='language-'] {
  color: white;
  background: #212529;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
  font-feature-settings: normal;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  margin-bottom: 0;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */


.gatsby-highlight {
  margin-bottom: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(90deg, #EF412D, #4F2920);
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

pre[class*='language-'] {
  overflow: auto;
  padding: 1.3125rem;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

pre[class*='language-']::-moz-selection {
  /* Firefox */
  background: hsl(207, 4%, 16%);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

pre[class*='language-']::selection {
  /* Safari */
  background: hsl(207, 4%, 16%);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

/* Text Selection colour */
pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection {
  text-shadow: none;
  background: hsla(0, 0%, 100%, 0.15);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection {
  text-shadow: none;
  background: hsla(0, 0%, 100%, 0.15);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  background: #212529d9;
  color: #fff;
  padding: .4rem;
  white-space: normal;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.attr-name {
  color: rgb(173, 219, 103);
  font-style: italic;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.comment {
  color: rgb(128, 147, 147);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.string,
.token.url {
  color: rgb(173, 219, 103);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.variable {
  color: rgb(214, 222, 235);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.number {
  color: rgb(247, 140, 108);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.builtin,
.token.char,
.token.constant,
.token.function {
  color: rgb(130, 170, 255);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.punctuation {
  color: rgb(199, 146, 234);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.selector,
.token.doctype {
  color: rgb(199, 146, 234);
  font-style: 'italic';
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.class-name {
  color: rgb(255, 203, 139);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.tag,
.token.operator,
.token.keyword,
.token.interpolation {
  color: #ffa7c4;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.boolean {
  color: rgb(255, 88, 116);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.property {
  color: rgb(128, 203, 196);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

.token.namespace {
  color: rgb(178, 204, 214);
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

pre[data-line] {
  padding: 1em 0 1em 3em;
  position: relative;
  font-family: Inconsolata, Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
}

`;
export default GlobalStyle;
