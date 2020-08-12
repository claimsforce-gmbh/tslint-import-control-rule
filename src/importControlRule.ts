import * as Lint from 'tslint';
import { findImports, ImportKind } from 'tsutils';
import * as ts from 'typescript';

interface Options {
    rootDir: string;
    whitelist?: string[];
    overrides: {
        rootDir: string;
        whitelist: string[];
        mergeWhitelist?: boolean; // default "true"
    }[];
}

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'import statement forbidden';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments[0]);
    }
}

const walk = (ctx: Lint.WalkContext<Options>): void => {
    const override = ctx.options.overrides.find((item): boolean => (
        ctx.sourceFile.fileName.includes(item.rootDir)
    ));
    for (const importName of findImports(ctx.sourceFile, ImportKind.All)) {
        const whitelist = override ? [
            ...override.mergeWhitelist === undefined || override.mergeWhitelist ? ctx.options.whitelist || [] : [],
            ...override.whitelist
        ] : ctx.options.whitelist || [];

        const isInsideRootDir = importName.text.startsWith(ctx.options.rootDir);
        const isRelative = importName.text.startsWith('.');
        const isWhitelisted = whitelist.some((item): boolean => item === '*' || importName.text.startsWith(item));

        if (isInsideRootDir && !isRelative && !isWhitelisted) {
            ctx.addFailure(
                importName.getStart(ctx.sourceFile) + 1,
                importName.end - 1,
                Rule.FAILURE_STRING
            );
        }
    }
};
