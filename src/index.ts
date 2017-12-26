import { DocBase } from 'node-docbase-sdk/lib/DocBase';
import { DocBaseReqCreatePost } from 'node-docbase-sdk/lib/DocBaseReqCreatePost';
import { DocBaseResponse } from 'node-docbase-sdk/lib/DocBaseResponse';
import { HttpStatus } from 'node-docbase-sdk/lib/enums/HttpStatus';
import { DocBaseReqUpdatePost } from 'node-docbase-sdk/lib/DocBaseReqUpdatePost';
import { DocBaseReqReadPost } from 'node-docbase-sdk/lib/DocBaseReqReadPost';
import { DocBaseReqReadPosts } from 'node-docbase-sdk/lib/DocBaseReqReadPosts';
import { DocBaseReqDeletePost } from 'node-docbase-sdk/lib/DocBaseReqDeletePost';

// Get DocBaseAPI Token from cli.
// ex.
//   $ DOC_BASE_API_TOKEN=<DOC_BASE_API_TOKEN> node .


const DOC_BASE_API_TOKEN = process.env.DOC_BASE_API_TOKEN;
const TEAM_NAME = 'TEAM_NAME';
const KEYWORD = 'DOCBASE_API_TEST';

const docBase: DocBase = new DocBase(DOC_BASE_API_TOKEN);

// メモ投稿API
// @see https://help.docbase.io/posts/92980
async function createPost() {
  console.log('== START createPost ==');
  const request: DocBaseReqCreatePost = <DocBaseReqCreatePost>{};
  request.team = TEAM_NAME;
  request.title = KEYWORD;
  request.body = KEYWORD;
  request.draft = false;
  request.notice = false;
  request.scope = 'private';

  const reponse: DocBaseResponse = await docBase.createPost(request);
  console.log(`=== Reponse: createPost===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw Error(reponse.body);
}

// メモ更新API
// @see https://help.docbase.io/posts/92981
async function updatePosts(postId: number) {
  console.log('== START updatePosts ==');
  const request: DocBaseReqUpdatePost = <DocBaseReqUpdatePost>{};
  request.id = postId;
  request.team = TEAM_NAME;
  request.title = KEYWORD + '_updated';
  request.body = KEYWORD + '_updated';
  request.draft = false;
  request.notice = false;
  request.scope = 'private';
  const reponse: DocBaseResponse = await docBase.updatePost(request);
  console.log(`=== Reponse: updatePosts===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw Error(reponse.body);
}

// メモ詳細取得API
// @see https://help.docbase.io/posts/97204
async function readPost(postId: number) {
  console.log('== START readPost ==');
  const request: DocBaseReqReadPost = <DocBaseReqReadPost>{};
  request.team = TEAM_NAME;
  request.id = postId;
  const reponse: DocBaseResponse = await docBase.readPost(request);
  console.log(`=== Reponse: readPost ===`);
  console.log(reponse);
  console.log('======');
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw Error(reponse.body);
}

// 複数メモ取得API
// @see https://help.docbase.io/posts/92984
async function readPosts(keyword: string) {
  console.log('== START readPosts ==');
  const request: DocBaseReqReadPosts = <DocBaseReqReadPosts>{};
  request.team = TEAM_NAME;
  request.q = keyword;
  request.page = 1;
  request.perPage = 20;
  const reponse: DocBaseResponse = await docBase.readPosts(request);
  console.log(`=== Reponse: readPosts===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw Error(reponse.body);
}

// メモ削除API
// @see https://help.docbase.io/posts/92982
async function deletePost(postId: number) {
  console.log('== START deletePost ==');
  const request: DocBaseReqDeletePost = <DocBaseReqDeletePost>{};
  request.team = TEAM_NAME;
  request.id = postId;
  const reponse: DocBaseResponse = await docBase.deletePost(request);
  console.log(`=== Reponse: deletePost===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw Error(reponse.body);
}

async function main() {
  let resBody = await createPost();
  resBody = await updatePosts(Number(resBody.id));
  resBody = await readPost(Number(resBody.id));
  resBody = await readPosts(String(resBody.title));
  for (const post of resBody.posts) {
    console.log(JSON.stringify(post));
    await deletePost(post.id);
  }
}

// == Main ==
main();
// ====

