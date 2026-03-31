import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/veterinary-request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const request = {
    store: Object.assign(store, store),
}

export default request