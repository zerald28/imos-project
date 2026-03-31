import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/farmer/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Farmer\FarmerHomeController::home
 * @see app/Http/Controllers/Farmer/FarmerHomeController.php:26
 * @route '/farmer/home'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
const farmer = {
    profile: Object.assign(profile, profile),
home: Object.assign(home, home),
}

export default farmer