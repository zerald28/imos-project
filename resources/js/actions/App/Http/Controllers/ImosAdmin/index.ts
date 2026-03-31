import DashboardController from './DashboardController'
import FacilitateController from './FacilitateController'
import InsuranceController from './InsuranceController'
import AdminProfileController from './AdminProfileController'
import AdminScheduleController from './AdminScheduleController'
const ImosAdmin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
FacilitateController: Object.assign(FacilitateController, FacilitateController),
InsuranceController: Object.assign(InsuranceController, InsuranceController),
AdminProfileController: Object.assign(AdminProfileController, AdminProfileController),
AdminScheduleController: Object.assign(AdminScheduleController, AdminScheduleController),
}

export default ImosAdmin