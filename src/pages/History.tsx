import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexeddb/memos";

type Props = {
  setText: (text: string) => void;
};

const History: FC<Props> = (props: Props) => {
  const { setText } = props;
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  console.log(memos);

  useEffect(() => {
    // Promiseオブジェクト resolveの引数がthenの第一引数になる
    getMemos(1).then((result) => setMemos(result));
    getMemoPageCount().then((result) => setMaxPage(result));
  }, []);

  // 最大ページ未満
  const canNextPage: boolean = page < maxPage;
  // 2ページ以降
  const canPrevPage: boolean = page > 1;
  // targetPage:遷移したいページ番号
  const movePage = (targetPage: number) => {
    // 早期リターン
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    setPage(targetPage);
    getMemos(targetPage).then((result) => setMemos(result));
  };
  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              navigate("/editor");
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          // 最大ページに到達したら削除
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  );
};

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;
const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const HeaderArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const PagingButton = styled.button`
  background: none;

  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;
  &:disabled {
    background-color: none;
  }
`;

export default History;
