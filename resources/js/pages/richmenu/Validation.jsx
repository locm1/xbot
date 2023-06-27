import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { CheckCircleIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

export const validationCheck = (value, type, isExternal) => {
  switch (type) {
    case 1:
      const link = isExternal ? validateLink(value) : '';
      return link;

    case 2:
      const text = validateValue(value, '送信テキスト');
      return text;
  
    default:
      const validate = validateValue(value)
      return validate
  }
};

const validateLink = (value) => {
  if (!(value.startsWith("http") || value.startsWith("https"))) {
    return ['LINE内ブラウザはURLの形式で入力してください。']
  }

  if (value.trim() === '') {
    return [`LINE内ブラウザを入力してください。`]
  }

  return '';
};

const validateValue = (value, name) => {
  if (value.trim() === '') {
    return [`${name}を入力してください。`]
  }

  return '';
};