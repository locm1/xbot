import { v4 as uuidv4 } from "uuid";

import OverviewImg from "@img/img/pages/overview.jpg";
import TrafficSourcesImg from "@img/img/pages/traffic-sources.jpg";
import AppAnalysisImg from "@img/img/pages/app-analysis.jpg";
import KanbanImg from "@img/img/pages/kanban.jpg";
import UsersImg from "@img/img/pages/users-list.jpg";
import TransactionsImg from "@img/img/pages/transactions.jpg";
import TasksImg from "@img/img/pages/tasks.jpg";
import SettingsImg from "@img/img/pages/settings.jpg";
import MessagesImg from "@img/img/pages/messages.jpg";
import ChatImg from "@img/img/pages/single-message.jpg";
import CalendarImg from "@img/img/pages/calendar.jpg";
import BillingImg from "@img/img/pages/billing.jpg";
import InvoiceImg from "@img/img/pages/invoice.jpg";
import PricingImg from "@img/img/pages/pricing.jpg";
import SignInImg from "@img/img/pages/sign-in.jpg";
import SignUpImg from "@img/img/pages/sign-up.jpg";
import LockImg from "@img/img/pages/lock.jpg";
import ForgotPasswordImg from "@img/img/pages/forgot-password.jpg";
import ResetPasswordImg from "@img/img/pages/reset-password.jpg";
import NotFoundImg from "@img/img/pages/404.jpg";
import ServerErrorImg from "@img/img/pages/500.jpg";

import { Paths } from "Paths";


export default [
    {
        "id": uuidv4(),
        "name": "Overview",
        "image": OverviewImg,
        "link": Paths.DashboardOverview.path
    },
    {
        "id": uuidv4(),
        "name": "Traffic Sources",
        "image": TrafficSourcesImg,
        "link": Paths.DashboardTraffic.path
    },
    {
        "id": uuidv4(),
        "name": "App Analysis",
        "image": AppAnalysisImg,
        "link": Paths.DashboardProductAnalysis.path
    },
    {
        "id": uuidv4(),
        "name": "Kanban",
        "image": KanbanImg,
        "link": Paths.Kanban.path
    },
    {
        "id": uuidv4(),
        "name": "Users List",
        "image": UsersImg,
        "link": Paths.Users.path
    },
    {
        "id": uuidv4(),
        "name": "Transactions",
        "image": TransactionsImg,
        "link": Paths.Transactions.path
    },
    {
        "id": uuidv4(),
        "name": "Tasks",
        "image": TasksImg,
        "link": Paths.Tasks.path
    },
    {
        "id": uuidv4(),
        "name": "Settings",
        "image": SettingsImg,
        "link": Paths.Settings.path
    },
    {
        "id": uuidv4(),
        "name": "Messages",
        "image": MessagesImg,
        "link": Paths.Messages.path
    },
    {
        "id": uuidv4(),
        "name": "Chat",
        "image": ChatImg,
        "link": Paths.SingleMessage.path
    },
    {
        "id": uuidv4(),
        "name": "Calendar",
        "image": CalendarImg,
        "link": Paths.Calendar.path
    },
    {
        "id": uuidv4(),
        "name": "Billing",
        "image": BillingImg,
        "link": Paths.Billing.path
    },
    {
        "id": uuidv4(),
        "name": "Invoice",
        "image": InvoiceImg,
        "link": Paths.Invoice.path
    },
    {
        "id": uuidv4(),
        "name": "Pricing",
        "image": PricingImg,
        "link": Paths.Pricing.path
    },
    {
        "id": uuidv4(),
        "name": "Sign In",
        "image": SignInImg,
        "link": Paths.Signin
    },
    {
        "id": uuidv4(),
        "name": "Sign Up",
        "image": SignUpImg,
        "link": Paths.Signup.path
    },
    {
        "id": uuidv4(),
        "name": "Lock",
        "image": LockImg,
        "link": Paths.Lock.path
    },
    {
        "id": uuidv4(),
        "name": "Forgot password",
        "image": ForgotPasswordImg,
        "link": Paths.ForgotPassword.path
    },
    {
        "id": uuidv4(),
        "name": "Reset password",
        "image": ResetPasswordImg,
        "link": Paths.ResetPassword.path
    },
    {
        "id": uuidv4(),
        "name": "404",
        "image": NotFoundImg,
        "link": Paths.NotFound.path
    },
    {
        "id": uuidv4(),
        "name": "500",
        "image": ServerErrorImg,
        "link": Paths.ServerError.path
    }
]