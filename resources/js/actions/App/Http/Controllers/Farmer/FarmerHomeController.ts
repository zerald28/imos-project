import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmer/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::index
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const FarmerHomeController = { index }

export default FarmerHomeController