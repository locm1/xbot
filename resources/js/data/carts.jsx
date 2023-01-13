
import moment from "moment-timezone";

import pudding from "@img/img/products/pudding.jpeg"
import juice from "@img/img/products/juice.jpeg"
import dressing from "@img/img/products/dressing.jpeg"
import shampoo from "@img/img/products/shampoo.jpeg"

export default [
    {
        "id": 1,
        "category": 1,
        "name": "シャンプー&トリートメント",
        "price": 3000,
        "stockQuantity": 93,
        "quantity": 1,
        "img": shampoo
    },
    {
        "id": 2,
        "category": 5,
        "name": "北海道ミルクプリン",
        "price": 3000,
        "stockQuantity": 93,
        "quantity": 1,
        "img": pudding
    },
    {
        "id": 3,
        "category": 5,
        "name": "生搾りジュース",
        "price": 3000,
        "stockQuantity": 90,
        "quantity": 1,
        "img": juice
    },
    {
        "id": 4,
        "category": 3,
        "name": "ドレッシング",
        "price": 3000,
        "stockQuantity": 93,
        "quantity": 1,
        "img": dressing
    },
]