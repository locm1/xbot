import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
import Profile1 from "@img/img/team/profile-picture-1.jpg"
import Profile2 from "@img/img/team/profile-picture-2.jpg"
import Profile3 from "@img/img/team/profile-picture-3.jpg"
import Profile4 from "@img/img/team/profile-picture-4.jpg"

export default [
  {
    "id": 1,
    "eventName": "会社説明会",
    "eventSchedule": '2022-09-18',
    "start": '10:00',
    "end": '18:00',
    "place": "Reno株式会社オフィス",
    "users": [
      {
        "id": 1,
        "image": Profile1,
        "name": "Roy Fendley",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 2,
        "image": Profile3,
        "name": "Bonnie Green",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 3,
        "name": "Scott Anderson",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 4,
        "image": Profile4,
        "name": "Ronnie Buchanan",
        "tel": "080-6076-8611",
        "sex": 3,
        "birthDate": moment().subtract(3, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 5,
        "image": Profile3,
        "name": "Jane Rinehart",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(4, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 6,
        "name": "William Ginther",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(4, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 7,
        "image": Profile2,
        "name": "George Driskell",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(5, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 8,
        "image": Profile4,
        "name": "Ronnie Buchanan",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(5, "days").format("DD MMM YYYY"),
        "area": "中央区",
    },
    {
        "id": 9,
        "name": "Jane Rinehart",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(6, "days").format("DD MMM YYYY"),
        "area": "中央区",
    }
    ]
  },
  {
    "id": 2,
    "eventName": "会社説明会",
    "eventSchedule": '2022-09-17',
    "start": '10:00',
    "end": '18:00',
    "place": "Reno株式会社オフィス",
    "users": [
      {
        "id": 1,
        "image": Profile1,
        "name": "Roy Fendley",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().format("DD MMM YYYY"),
        "area": "中央区",
      },
      {
        "id": 2,
        "image": Profile3,
        "name": "Bonnie Green",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
      },
    ]
  },
  {
    "id": 3,
    "eventName": "クリスマスイベント",
    "eventSchedule": '2022-12-03',
    "start": '19:00',
    "end": '23:00',
    "place": "トンマナオフィス",
    "users": [
      {
        "id": 1,
        "image": Profile1,
        "name": "Roy Fendley",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().format("DD MMM YYYY"),
        "area": "中央区",
      },
    ]
  },
  {
    "id": 4,
    "eventName": "合同説明会",
    "eventSchedule": '2022-09-02',
    "start": '12:00',
    "end": '19:00',
    "place": "札幌パークホテル",
    "users": [
      {
        "id": 1,
        "image": Profile1,
        "name": "Roy Fendley",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().format("DD MMM YYYY"),
        "area": "中央区",
      },
      {
        "id": 2,
        "image": Profile3,
        "name": "Bonnie Green",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
      },
      {
        "id": 3,
        "name": "Scott Anderson",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
      },
    ]
  },
  {
    "id": 5,
    "eventName": "明治安田生命J1リーグ第10節",
    "eventSchedule": '2022-09-02',
    "start": '13:00',
    "end": '17:00',
    "place": "札幌ドーム",
    "users": [
      {
        "id": 1,
        "image": Profile1,
        "name": "Roy Fendley",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().format("DD MMM YYYY"),
        "area": "中央区",
      },
      {
        "id": 2,
        "image": Profile3,
        "name": "Bonnie Green",
        "tel": "080-6076-8611",
        "sex": 2,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
      },
      {
        "id": 3,
        "name": "Scott Anderson",
        "tel": "080-6076-8611",
        "sex": 1,
        "birthDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "area": "中央区",
      },
    ]
  },
];