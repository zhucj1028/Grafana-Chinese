(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/brace/snippets/markdown.js":
/*!*************************************************!*\
  !*** ./node_modules/brace/snippets/markdown.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

ace.define("ace/snippets/markdown",["require","exports","module"],function(e,t,n){"use strict";t.snippetText='# Markdown\n\n# Includes octopress (http://octopress.org/) snippets\n\nsnippet [\n	[${1:text}](http://${2:address} "${3:title}")\nsnippet [*\n	[${1:link}](${2:`@*`} "${3:title}")${4}\n\nsnippet [:\n	[${1:id}]: http://${2:url} "${3:title}"\nsnippet [:*\n	[${1:id}]: ${2:`@*`} "${3:title}"\n\nsnippet ![\n	![${1:alttext}](${2:/images/image.jpg} "${3:title}")\nsnippet ![*\n	![${1:alt}](${2:`@*`} "${3:title}")${4}\n\nsnippet ![:\n	![${1:id}]: ${2:url} "${3:title}"\nsnippet ![:*\n	![${1:id}]: ${2:`@*`} "${3:title}"\n\nsnippet ===\nregex /^/=+/=*//\n	${PREV_LINE/./=/g}\n	\n	${0}\nsnippet ---\nregex /^/-+/-*//\n	${PREV_LINE/./-/g}\n	\n	${0}\nsnippet blockquote\n	{% blockquote %}\n	${1:quote}\n	{% endblockquote %}\n\nsnippet blockquote-author\n	{% blockquote ${1:author}, ${2:title} %}\n	${3:quote}\n	{% endblockquote %}\n\nsnippet blockquote-link\n	{% blockquote ${1:author} ${2:URL} ${3:link_text} %}\n	${4:quote}\n	{% endblockquote %}\n\nsnippet bt-codeblock-short\n	```\n	${1:code_snippet}\n	```\n\nsnippet bt-codeblock-full\n	``` ${1:language} ${2:title} ${3:URL} ${4:link_text}\n	${5:code_snippet}\n	```\n\nsnippet codeblock-short\n	{% codeblock %}\n	${1:code_snippet}\n	{% endcodeblock %}\n\nsnippet codeblock-full\n	{% codeblock ${1:title} lang:${2:language} ${3:URL} ${4:link_text} %}\n	${5:code_snippet}\n	{% endcodeblock %}\n\nsnippet gist-full\n	{% gist ${1:gist_id} ${2:filename} %}\n\nsnippet gist-short\n	{% gist ${1:gist_id} %}\n\nsnippet img\n	{% img ${1:class} ${2:URL} ${3:width} ${4:height} ${5:title_text} ${6:alt_text} %}\n\nsnippet youtube\n	{% youtube ${1:video_id} %}\n\n# The quote should appear only once in the text. It is inherently part of it.\n# See http://octopress.org/docs/plugins/pullquote/ for more info.\n\nsnippet pullquote\n	{% pullquote %}\n	${1:text} {" ${2:quote} "} ${3:text}\n	{% endpullquote %}\n',t.scope="markdown"})

/***/ })

}]);
//# sourceMappingURL=11.1ebdc265fc3bd7452fcd.js.map