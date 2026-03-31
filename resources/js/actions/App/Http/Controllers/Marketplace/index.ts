import NotificationController from './NotificationController'
import MarketplaceController from './MarketplaceController'
import SellerMarketplaceController from './SellerMarketplaceController'
import SellerListingController from './SellerListingController'
import SellerTransactionController from './SellerTransactionController'
import BuyerTransactionController from './BuyerTransactionController'
import DirectSaleController from './DirectSaleController'
const Marketplace = {
    NotificationController: Object.assign(NotificationController, NotificationController),
MarketplaceController: Object.assign(MarketplaceController, MarketplaceController),
SellerMarketplaceController: Object.assign(SellerMarketplaceController, SellerMarketplaceController),
SellerListingController: Object.assign(SellerListingController, SellerListingController),
SellerTransactionController: Object.assign(SellerTransactionController, SellerTransactionController),
BuyerTransactionController: Object.assign(BuyerTransactionController, BuyerTransactionController),
DirectSaleController: Object.assign(DirectSaleController, DirectSaleController),
}

export default Marketplace