import axios from "axios";
import { useEffect, useState } from "react"
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { Button, Card, Form } from "react-bootstrap"
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import liff from '@line/liff';

export default () => {
  const location = useLocation();
  const { messages } = location.state
  console.log();
  const [user, setUser] = useState({
    is_registered: 0
  });

  return (
    <main className="">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list liff-check-icon-wrap">
        {
          messages.status == 200 ? (
            <CheckCircleIcon className="icon liff-check-icon" />
          ) : (
            <ExclamationCircleIcon className="icon liff-check-icon" />
          )
        }
        <h3 className="mt-4 liff-check-complete-title">{messages.text}</h3>
      </div>
    </main>
  )
}