# Control your imports through TSLint
You want full control of your imports?
Not each file is allowed to import another file from a different folder?
Especially if you are following ["The Clean Architecture"] it is important to have these rule somehow configured.

This TSLint rule will help you with that!

## Usage
### Install from NPM to your Dev Dependencies

```console
npm install --save-dev tslint-import-control-rule
```

### Prerequisite
To make the rule works as intended you need to configure an `alias` in your `package.json`, e.g.:

```json
{
    [...]        
    "alias": {
        "src": "./src"
    }
}
```

### Configure TSLint to use `tslint-import-control-rule`:
In your `tslint.json` file, source the rule from this package, e.g.:

```json
{
    "rules": {
        "import-control": [
            true,
            {
                "rootDir": "string",
                "whitelist": [
                    "string"
                ],
                "overrides": [
                    {
                        "rootDir": "string",
                        "whitelist": [
                            "string"
                        ]
                    }
                ]
            }
        ]
    },
    "rulesDirectory": [
        "node_modules/tslint-import-control-rule/src"
    ]
}
```

#### Configuration for a clean architecture

```json
{
    "rules": {
        "import-control": [
            true,
            {
                "rootDir": "src",
                "whitelist": [
                    "src/shared"
                ],
                "overrides": [
                    {
                        "rootDir": "src/infrastructure",
                        "whitelist": [
                            "src/application",
                            "src/domain"
                        ]
                    },
                    {
                        "rootDir": "src/application",
                        "whitelist": [
                            "src/domain"
                        ]
                    }
                ]
            }
        ]
    },
    "rulesDirectory": [
        "node_modules/tslint-import-control-rule/src"
    ]
}
```

With this rule we can achieve the following:
- Domain has only access to `src/shared`
- Application has access to `src/shared` and `src/domain`
- Infrastructure has access to `src/shared`, `src/domain` and `src/application` 

## Contributing
Bugs, rules requests, doubts etc., open a Github [Issue].

## LICENSE
MIT

["The Clean Architecture"]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[Issue]: https://github.com/claimsforce-gmbh/tslint-import-control-rule/issues/new
