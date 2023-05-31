const prefix = "/manage";

export const Paths = {
    Route: { path: `${prefix}` },

    // pages
    Signin: { path: `${prefix}/login` },
    DashboardOverview: { path: `${prefix}/dashboard`},
    Users: { path: `${prefix}/user/list` },
    EditUser: { path: `${prefix}/user/edit/:id`},
    Questionnaires: { path: `${prefix}/questionnaire/list` },
    CreateQuestionnaire: { path: `${prefix}/questionnaire/create` },
    EditQuestionnaire: { path: `${prefix}/questionnaire/edit/:id` },
    DefaultQuestionnaire: { path: `${prefix}/default/questionnaire/list` },
    SendSegments: { path: `${prefix}/message/send/segment` },
    TemplateMessages: { path: `${prefix}/message/template/list` },
    CreateMessage: { path: `${prefix}/message/template/create` },
    EditMessage: { path: `${prefix}/message/template/edit/:id` },
    SendHistories: { path: `${prefix}/message/send/list` },
    SendHistoryDetail: { path: `${prefix}/message/send/detail/:id` },
    Privileges: { path: `${prefix}/visitor/privilege` },
    VisitorHistories: { path: `${prefix}/visitor/history` },
    EditVisitorHistory: { path: `${prefix}/visitor/history/edit/:id` },
    Environment: { path: `${prefix}/ec/environment` },
    Products: { path: `${prefix}/ec/product/list` },
    ProductCategory: { path: `${prefix}/ec/product/category/list` },
    EditCategory: { path: `${prefix}/ec/product/category/edit/:id` },
    CreateCategory: { path: `${prefix}/ec/product/category/create` },
    EditProduct: { path: `${prefix}/ec/product/edit/:id` },
    CreateProduct: { path: `${prefix}/ec/product/create` },
    OrderDetail: { path: `${prefix}/ec/order/detail/:id` },
    Coupons: { path: `${prefix}/ec/coupon/list` },
    CreateCoupon: { path: `${prefix}/ec/coupon/create` },
    EditCoupon: { path: `${prefix}/ec/coupon/edit/:id` },
    Orders: { path: `${prefix}/ec/order/list` },
    Reserves: { path: `${prefix}/ec/reserve/list` },
    EventCalendar: { path: `${prefix}/event/calendar` },
    Events: { path: `${prefix}/event/list` },
    InviteIncentives: { path: `${prefix}/invitation/list` },
    CreateInviteIncentive: { path: `${prefix}/invitation/create` },
    EditInviteIncentive: { path: `${prefix}/invitation/edit/:id` },
    InviterIncentives: { path: `${prefix}/invitation/:id/inviter/list` },
    InviteeIncentives: { path: `${prefix}/invitation/:id/invitee/list` },
    PrivacyPolicy: { path: `${prefix}/ec/privacy-policy` },
    TermsOfService: { path: `${prefix}/ec/terms-of-service` },
    SpecificTrades: { path: `${prefix}/ec/specific-trades` },
    Tags: { path: `${prefix}/user/tag` },
    QrCode: { path: `${prefix}/account/qr-code` },
    Api: { path: `${prefix}/account/api` },
    Greeting: { path: `${prefix}/account/greeting` },
    Accounts: { path: `${prefix}/account/list` },
    EditAccount: { path: `${prefix}/account/edit/:id` },
    RegisterAccount: { path: `${prefix}/account/register` },
    CreateRichMenu: { path: `${prefix}/account/richmenu/create` },
    EditRichMenu: { path: `${prefix}/account/richmenu/edit/:id` },
    RichMenus: { path: `${prefix}/account/richmenu/list` },
    Postage: {path: `${prefix}/ec/postage`},
    Permissions: {path: `${prefix}/account/permissions`},
    InflowRoute: {path: `${prefix}/account/inflow-route`},
    Reports: {path: `${prefix}/report/list`},
    EditReport: {path: `${prefix}/report/edit/:id`},
    CreateReport: {path: `${prefix}/report/create`},

    // LIFF
    LiffProductDetail: { path: "/product/detail/:id" },
    LiffProductReservationComplete: { path: "/product/reservation/complete" },
    LiffProducts: { path: "/product/list" },
    LiffPickupProducs: { path: "/product/pickup/list" },
    LiffProductCategories: { path: "/product/category/:id" },
    LiffCarts: { path: "/cart" },
    LiffCheckout: { path: "/checkout" },
    LiffCheckoutDestinations: { path: "/checkout/destination" },
    LiffCheckoutAddress: { path: "/checkout/address" },
    LiffCheckoutEditAddress: { path: "/checkout/address/edit/:id" },
    LiffCheckoutDelivery: { path: "/checkout/delivery" },
    LiffCheckoutPayment: { path: "/checkout/payment" },
    LiffCheckoutPaymentCreditCard: { path: "/checkout/payment/creditcard" },
    LIffCheckoutAddCoupon: { path: "/checkout/coupon" },
    LiffOrderComplete: { path: "/order/complete" },
    LiffPrivacyPolicy: { path: "/privacy-policy" },
    LiffTermsOfService: { path: "/terms-of-service" },
    LiffSpecificTrades: { path: "/specific-trades" },
    LiffVisitor: { path: "/visitor" },
    LiffVisitorConfirm: { path: "/visitor/confirm/:userId" },
    LiffVisitorHistoryAdd: { path: "/visitor-histories/add" },
    LiffVisitorHistoryResult: { path: "/visitor-histories/result" },
    LiffAboutVisitorPrivileges: { path: "/visitor/privilege" },
    LiffEventReservations: { path: "/event/reservation" },
    LiffAlreadyQuestionnaire: { path: "/questionnaire/already/answered" },
    LiffQuestionnaire: { path: "/questionnaire" },
    LiffQuestionnaireComplete: { path: "/questionnaire/complete" },
    LiffProductHistories: { path: "/history/product" },
    LiffProductHistoryDetail: { path: "/history/product/purchase/:id" },
    LiffInvite: { path: "/invite" },
    LiffFriendAdd: { path: "/friends/add/:userId/:inviteIncentiveId" },
    LiffInflowRoute: { path: "/inflow-route/:key" },
    LiffInit: { path: "/liff" },
    LiffServerError: { path: "/internal-server-error" },


    DashboardTraffic: { path: "/dashboard/traffic-and-engagement" },
    DashboardProductAnalysis: { path: "/dashboard/product-analysis" },
    Kanban: { path: "/kanban" },
    Messages: { path: "/messages" },
    SingleMessage: { path: "/message" },
    Transactions: { path: "/transactions" },
    Tasks: { path: "/tasks" },
    Settings: { path: "/settings" },
    Calendar: { path: "/calendar" },
    Map: { path: "/map" },
    Datatables: { path: "/tables/datatables" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Pricing: { path: "/examples/pricing" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signup: { path: "/examples/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // plugins
    PluginCharts: { path: "/plugins/charts" },
    PluginCalendar: { path: "/plugins/calendar" },
    PluginDatatable: { path: "/plugins/datatable" },
    PluginMap: { path: "/plugins/map" },
    PluginDropzone: { path: "/plugins/dropzone" },
    PluginSweetAlert: { path: "/plugins/sweet-alert" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};