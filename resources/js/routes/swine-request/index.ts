import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::store
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/swine-request/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::store
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::store
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::store
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::store
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const swineRequest = {
    store: Object.assign(store, store),
}

export default swineRequest