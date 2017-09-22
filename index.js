const postcss = require('postcss'),
    messageHelpers = require("postcss-message-helpers"),
    math = require("./process-math.js");

module.exports = postcss.plugin('postcss-jsmath', function (opts) {
    return function (root, result) {
        math.set(opts);

        function common(key, parent) {
            if (!parent || !parent[key] || !parent[key].includes("math("))
                return;

            try {
                const c = messageHelpers.try(() => math.process(parent[key]), parent.source);
                parent[key] = c;
            } catch (error) {
                parent.warn(result, error.message, {
                    word: parent[key]
                });
            }
        }
        root.walkDecls(decl => common("value", decl));
        root.walkRules(rule => common("selector", rule));
    };
});