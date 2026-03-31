import SwineController from './SwineController'
import SwineMultiController from './SwineMultiController'
import SwineGroupController from './SwineGroupController'
const Swine = {
    SwineController: Object.assign(SwineController, SwineController),
SwineMultiController: Object.assign(SwineMultiController, SwineMultiController),
SwineGroupController: Object.assign(SwineGroupController, SwineGroupController),
}

export default Swine