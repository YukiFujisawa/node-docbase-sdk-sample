"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocBase_1 = require("node-docbase-sdk/lib/DocBase");
// Get DocBaseAPI Token from cli.
// ex.
//   $ DOC_BASE_API_TOKEN=<DOC_BASE_API_TOKEN> node .
const DOC_BASE_API_TOKEN = process.env.DOC_BASE_API_TOKEN;
const TEAM_NAME = 'gladd';
const docBase = new DocBase_1.DocBase(DOC_BASE_API_TOKEN);
// メモの検索API
// @see https://help.docbase.io/posts/92984
const reqReadPosts = {};
reqReadPosts.team = TEAM_NAME;
reqReadPosts.q = '*';
reqReadPosts.page = 1;
reqReadPosts.perPage = 20;
docBase.readPosts(reqReadPosts).then((reponse) => {
    console.log(reponse);
});
// メモの詳細取得API
// @see https://help.docbase.io/posts/97204
const reqReadPost = {};
reqReadPost.team = TEAM_NAME;
reqReadPost.id = 339417;
docBase.readPosts(reqReadPost).then((reponse) => {
    console.log(reponse);
});
// メモの投稿API
// @see https://help.docbase.io/posts/92980
const postReqCreate = {};
postReqCreate.team = TEAM_NAME;
postReqCreate.title = 'タイトル';
postReqCreate.body = 'body';
postReqCreate.draft = false;
postReqCreate.notice = false;
postReqCreate.scope = 'private';
docBase.createPost(postReqCreate).then((reponse) => {
    console.log(reponse);
});
//# sourceMappingURL=index.js.map