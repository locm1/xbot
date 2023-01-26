import React from 'react';
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Card, Accordion } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Paths } from "@/paths";

export default (props) => {
  const { path } = props;

  return (
    <>
    <Link to={path} className="">
      <div className="mt-3 text-decoration-underline">
        <ChevronLeftIcon className="icon icon-xs" />
        リストへ戻る
      </div>
    </Link>
    </>
  );
};