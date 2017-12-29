# node-docbase-sdk-sample

This project is a sample project for node-docbase-sdk.

このプロジェクトは、node-docbase-sdk用のサンプルプロジェクトです。

https://github.com/YukiFujisawa/node-docbase-sdk

## Getting Started

### nvm install

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
```

### Node.js install

```bash
$ nvm install stable
$ nvm alias default stable
```

### Library install

```bash
$ npm install 
```

### Get DocBase API token and setting

1. [Get DocBase API token / アクセストークンを取得する](https://help.docbase.io/posts/45703#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3)
1. Setting token to `package.json` -> `DOC_BASE_API_TOKEN=*** node .` / トークンを設定する
1. Setting Your Team `src/index.ts` -> `const TEAM_NAME = 'TEAM_NAME'` / 所属チームを設定する

### Compile

```bash
$ npm run compile
```

### Run node-docbase-sdk

```bash
$ npm run start
```