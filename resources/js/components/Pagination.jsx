import React, { useState } from "react";
import { Nav, Card, Pagination } from 'react-bootstrap';
import ReactPaginate from 'react-paginate'

export default (props) => {
  const { links, getListBypage, setList, setLinks, paginate, setPaginate, searchValue } = props

  // ページクリック時のイベント
  const handlePaginate = (selectedPage) => {
    const searchParams = {
      params: {...searchValue, page: selectedPage.selected + 1}
    };
    getListBypage(searchParams, setList, setLinks, setPaginate)
  }

  return (
    <>
    <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
      <small className="fw-normal mt-4 mt-lg-0">
        <span className="text-danger fs-3 fw-bolder">{paginate.total}</span> 件中 {paginate.from}〜{paginate.to} 件表示
      </small>
      <Nav>
        <ReactPaginate
          forcePage={paginate.current_page - 1}
          pageCount={links.length}
          onPageChange={handlePaginate}
          marginPagesDisplayed={4}
          pageRangeDisplayed={2}
          containerClassName="pagination justify-center"
          pageClassName="page-item"
          pageLinkClassName="page-link rounded-full"
          activeClassName="active"
          activeLinkClassName="active" 

          // 戻る・進む関連
          previousClassName="page-item"
          nextClassName="page-item"
          previousLabel="前へ"
          previousLinkClassName="page-link"
          nextLabel="次へ"
          nextLinkClassName="page-link"

          // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
          disabledClassName="disabled-button d-none"

          // 中間ページの省略表記関連
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </Nav>
    </Card.Footer>
    </>
  )
};