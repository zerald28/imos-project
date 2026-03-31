import CMS from './CMS'
import ImosNotificationController from './ImosNotificationController'
import ImosAdmin from './ImosAdmin'
import PDF from './PDF'
import Settings from './Settings'
import Form from './Form'
import VeterinaryRequestController from './VeterinaryRequestController'
import LivestockLossNoticeController from './LivestockLossNoticeController'
import UserController from './UserController'
import Marketplace from './Marketplace'
import ConversationController from './ConversationController'
import MessageController from './MessageController'
import LivestockServiceController from './LivestockServiceController'
import ServiceBookingController from './ServiceBookingController'
import ServiceRatingController from './ServiceRatingController'
import FarmerRatingController from './FarmerRatingController'
import UserInformationController from './UserInformationController'
import LocationController from './LocationController'
import ExpenseController from './ExpenseController'
import Swine from './Swine'
import Farmer from './Farmer'
import ScheduleController from './ScheduleController'
import Auth from './Auth'
const Controllers = {
    CMS: Object.assign(CMS, CMS),
ImosNotificationController: Object.assign(ImosNotificationController, ImosNotificationController),
ImosAdmin: Object.assign(ImosAdmin, ImosAdmin),
PDF: Object.assign(PDF, PDF),
Settings: Object.assign(Settings, Settings),
Form: Object.assign(Form, Form),
VeterinaryRequestController: Object.assign(VeterinaryRequestController, VeterinaryRequestController),
LivestockLossNoticeController: Object.assign(LivestockLossNoticeController, LivestockLossNoticeController),
UserController: Object.assign(UserController, UserController),
Marketplace: Object.assign(Marketplace, Marketplace),
ConversationController: Object.assign(ConversationController, ConversationController),
MessageController: Object.assign(MessageController, MessageController),
LivestockServiceController: Object.assign(LivestockServiceController, LivestockServiceController),
ServiceBookingController: Object.assign(ServiceBookingController, ServiceBookingController),
ServiceRatingController: Object.assign(ServiceRatingController, ServiceRatingController),
FarmerRatingController: Object.assign(FarmerRatingController, FarmerRatingController),
UserInformationController: Object.assign(UserInformationController, UserInformationController),
LocationController: Object.assign(LocationController, LocationController),
ExpenseController: Object.assign(ExpenseController, ExpenseController),
Swine: Object.assign(Swine, Swine),
Farmer: Object.assign(Farmer, Farmer),
ScheduleController: Object.assign(ScheduleController, ScheduleController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers