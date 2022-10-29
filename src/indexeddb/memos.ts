import Dexie from "dexie";

export type MemoRecord = {
  datetime: string;
  title: string;
  text: string;
};

const datebase = new Dexie("markdown-editor");
// ストア名:memos、キー：datetime &はユニークキー
datebase.version(1).stores({ memos: "&datetime" });
const memos: Dexie.Table<MemoRecord, string> = datebase.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  //   await文が返されないとこの関数以降のコードは実行されない
  await memos.put({ datetime, title, text });
};

const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count();
  // ceil:整数値の切り上げ
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE;
  // orderBy:古い順で取得 reverse:並び順を逆にする toArray:配列に変換
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray();
};
