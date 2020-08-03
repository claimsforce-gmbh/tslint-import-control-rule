"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments[0]);
    };
    Rule.FAILURE_STRING = 'import statement forbidden';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var walk = function (ctx) {
    var override = ctx.options.overrides.find(function (item) { return (ctx.sourceFile.fileName.startsWith(item.rootDir)); });
    var _loop_1 = function (importName) {
        var whitelist = override ? tslib_1.__spreadArrays(override.mergeWhitelist === undefined || override.mergeWhitelist ? ctx.options.whitelist : [], override.whitelist) : ctx.options.whitelist;
        var isInsideRootDir = importName.text.startsWith(ctx.options.rootDir);
        var isRelative = importName.text.startsWith('.');
        var isWhitelisted = whitelist.some(function (item) { return item === '*' || importName.text.startsWith(item); });
        if (isInsideRootDir && !isRelative && !isWhitelisted) {
            ctx.addFailure(importName.getStart(ctx.sourceFile) + 1, importName.end - 1, Rule.FAILURE_STRING);
        }
    };
    for (var _i = 0, _a = tsutils_1.findImports(ctx.sourceFile, 63); _i < _a.length; _i++) {
        var importName = _a[_i];
        _loop_1(importName);
    }
};
