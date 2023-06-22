import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { CheckCircleIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

export const optionalValidationCheck = (input, value, name) => {
  switch (input) {
    case 'last_name_kana':
      const last_name_kana = validateKana(value, '姓');
      return last_name_kana;

    case 'first_name_kana':
      const first_name_kana = validateKana(value, '名');
      return first_name_kana;
    
    case 'tel':
      const tel = validatePhoneNumber(value, name);
      return tel;

    case 'zipcode':
      const zipcode = validateZipCodeNumber(value, name);
      return zipcode
  
    default:
      return ''
  }
};

const validateKana = (value, name) => {
  if (value.length >= 1 && !/^[\u30A0-\u30FF]+$/.test(value)) {
    return [`フリガナ(${name})はカタカナで入力してください。`]
  }

  return '';
};


const validatePhoneNumber = (value, name) => {
  if (value.includes('-')) {
    return ['ハイフンが含まれています。']
  }

  return '';
};


const validateZipCodeNumber = (value, name) => {
  if (value.length >= 1 && value.includes('-')) {
    return ['ハイフンが含まれています。']
  }

  if (value.length >= 1 && value.length !== 7) {
    return [`${name}は7桁で入力してください。`]
  }

  return '';
};