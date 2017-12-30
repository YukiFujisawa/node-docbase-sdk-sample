import { DocBase } from 'node-docbase-sdk/lib/DocBase';
import { DocBaseResponse } from 'node-docbase-sdk/lib/DocBaseResponse';
import { HttpStatus } from 'node-docbase-sdk/lib/enums/HttpStatus';
import { MemoCondition } from 'node-docbase-sdk/lib/conditions/MemoCondition';
import { Memo } from 'node-docbase-sdk/lib/entities/Memo';
import { DisclosureScopes } from 'node-docbase-sdk/lib/enums/DisclosureScopes';

// Get DocBaseAPI Token from cli.
// ex.
//   $ DOC_BASE_API_TOKEN=<DOC_BASE_API_TOKEN> node .
const DOC_BASE_API_TOKEN = process.env.DOC_BASE_API_TOKEN;
const TEAM_NAME = 'TEAM_NAME';
const KEYWORD = 'DOCBASE_API_TEST';

const docBase: DocBase = new DocBase(DOC_BASE_API_TOKEN, TEAM_NAME);

// 所属チーム取得API
// @see https://help.docbase.io/posts/92977
async function getMyTeams() {
  console.log('== START getMyTeams ==');
  const reponse: DocBaseResponse = await docBase.teams.list();
  console.log(`=== Reponse: getMyTeams===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

// メモ投稿API
// @see https://help.docbase.io/posts/92980
async function createMemo() {
  console.log('== START createMemo ==');
  const memo: Memo = <Memo>{};
  memo.title = KEYWORD;
  memo.body = KEYWORD;
  memo.draft = false;
  memo.notice = false;
  memo.scope = DisclosureScopes.PRIVATE;
  const reponse: DocBaseResponse = await docBase.memos.create(memo);
  console.log(`=== Reponse: createMemo===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

// メモ更新API
// @see https://help.docbase.io/posts/92981
async function updateMemo(memoId: number) {
  console.log('== START updateMemo ==');
  const memo: Memo = <Memo>{};
  memo.id = memoId;
  memo.title = KEYWORD + '_updated';
  memo.body = KEYWORD + '_updated';
  memo.draft = false;
  memo.notice = false;
  memo.scope = DisclosureScopes.PRIVATE;
  const reponse: DocBaseResponse = await docBase.memos.update(memo);
  console.log(`=== Reponse: updateMemo===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

// メモ詳細取得API
// @see https://help.docbase.io/posts/97204
async function findMemo(memoId: number) {
  console.log('== START findMemo ==');
  const reponse: DocBaseResponse = await docBase.memos.find(memoId);
  console.log(`=== Reponse: findMemo ===`);
  console.log(reponse);
  console.log('======');
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

// 複数メモ取得API
// @see https://help.docbase.io/posts/92984
async function searchMemos(keyword: string) {
  console.log('== START searchMemos ==');
  const condition: MemoCondition = <MemoCondition>{};
  condition.q = keyword;
  condition.page = 1;
  condition.perPage = 20;
  const reponse: DocBaseResponse = await docBase.memos.list(condition);
  console.log(`=== Reponse: searchMemos===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

// メモ削除API
// @see https://help.docbase.io/posts/92982
async function deleteMemo(memoId: number) {
  console.log('== START deleteMemo ==');
  const reponse: DocBaseResponse = await docBase.memos.delete(memoId);
  console.log(`=== Reponse: deleteMemo===`);
  console.log(reponse);
  console.log(`======`);
  if (reponse.status === HttpStatus.OK) {
    return reponse.body;
  }
  throw new Error(reponse.body);
}

async function main() {
  try {
    let resBody = await getMyTeams();
    resBody = await createMemo();
    resBody = await updateMemo(Number(resBody.id));
    resBody = await findMemo(Number(resBody.id));
    resBody = await searchMemos(String(resBody.title));
    for (const post of resBody.posts) {
      if (post.title === 'DOCBASE_API_TEST_updated') {
        console.log(JSON.stringify(post));
        await deleteMemo(post.id);
      } else {
        throw new Error(JSON.stringify(post));
      }
    }
  } catch (error) {
    throw error;
  }
}

// == Main ==
main().catch((error) => {
  console.log(error);
});
// ====
