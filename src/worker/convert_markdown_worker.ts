import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";
// self:グローバル変数をany型でアクセス
// worker変数はWorker型
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
  // console.log("Worker Received:", event.data);
  // let count: number = 1;
  // while (count < 1000000000) {
  //   count++;
  // }
  // worker.postMessage({ result: event.data });
  // メインスレッドからのテキストデータを取得
  const text = event.data;
  // サニタイズされたHTMLに変換
  // スプレッド構文で初期設定にh1,h2を加える
  const html = sanitizeHtml(marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  // メインスレッドに返却
  worker.postMessage({ html });
});
