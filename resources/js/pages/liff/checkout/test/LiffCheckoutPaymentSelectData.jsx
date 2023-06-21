export const paymentMethod =
{
  "id": 1,
  "user_id": 101,
  "payment_method": 1,
  "payjp_customer_id": "cus_10cde19d455d4e356ddc07a586d6",
  "deleted_at": null,
  "created_at": "2023-06-21T08:30:03.000000Z",
  "updated_at": "2023-06-21T08:30:03.000000Z",
  "payjp_default_card_id": "car_27e74d1bdc20bf673f2cea5dc1e7"
}

export const creditCards =
  [
    {
      "id": "car_27e74d1bdc20bf673f2cea5dc1e7",
      "card_number": "**** **** **** 4242",
      "brand": "Visa",
      "exp_year": 2024,
      "exp_month": 10,
      "name": "KOJI"
    }
  ]

export const user =
{
  "id": 101,
  "first_name": "皓司",
  "last_name": "米塚",
  "first_name_kana": "コウジ",
  "last_name_kana": "ヨネツカ",
  "nickname": "米塚皓司",
  "status_message": "ping",
  "birth_date": "1996-10-23T15:00:00.000000Z",
  "gender": 1,
  "zipcode": "0640809",
  "prefecture": "北海道",
  "city": "札幌市中央区",
  "address": "南九条西9丁目3-30",
  "building_name": "ノースランド山鼻 202",
  "tel": "09064409121",
  "occupation_id": 1,
  "img_path": "https://sprofile.line-scdn.net/0hYn1UuJjhBkEcLBBfCON4Pmx8BSs_XV9TY0pOIS8qX3UhHEUXZUtMJ3opXHVyFBQQZEocJy8rCiUQP3EnAnr6dRscWHYmHUYfME5Iog",
  "line_id": "U8e464a551171be43ead486ec63cc6ef3",
  "is_registered": 1,
  "deleted_at": null,
  "created_at": "2023-06-20T09:53:14.000000Z",
  "updated_at": "2023-06-20T09:55:03.000000Z",
  "block_date": null,
  "is_blocked": 0
}
export const payments =
  [
    "クレジットカード",
    "代金引き換え"
  ]

export const selectCardId =
  "car_27e74d1bdc20bf673f2cea5dc1e7"