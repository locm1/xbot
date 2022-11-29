
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";

import Profile1 from "@img/img/team/profile-picture-1.jpg"
import Profile2 from "@img/img/team/profile-picture-2.jpg"
import Profile3 from "@img/img/team/profile-picture-3.jpg"
import Profile4 from "@img/img/team/profile-picture-4.jpg"

export default [
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