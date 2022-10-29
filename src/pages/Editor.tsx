import * as React from "react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
// import * as ReactMarkdown from "react-markdown";
import { putMemo } from "../indexeddb/memos";
import Button from "../components/Button";
import SaveModal from "../components/SaveModal";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// ！の意味？
import ConvertMarkdonwWorker from "worker-loader!../worker/convert_markdown_worker";

// インタスタンス生成
// const testWorker = new TestWorker();

const convertMarkdownWorker = new ConvertMarkdonwWorker();
type Props = {
  text: string;
  setText: (text: string) => void;
};

const Editor: FC<Props> = (props: Props) => {
  const { text, setText } = props;
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState("");

  // let count: number = 1;
  // while (count < 1000000000) {
  //   count++;
  // }

  // Workerから受け取った結果（HTML）で状態を更新
  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html);
    };
  }, []);

  // Workerに処理結果を送信
  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);
  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="テキスト入力エリア"
          autoFocus
        />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const HeaderArea = styled.div`
  align-items: center;
  top: 0;
  left: 0;
`;

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silber;
  bottom: 0;
  font-size: 1rem;
  letter-spacing: 1px;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow: scroll;
  padding: 1rem;
  position: absolute;
  /* font-size: 1rem; */
  letter-spacing: 1px;
  right: 0;
  top: 0;
  width: 50vw;
`;
export default Editor;
