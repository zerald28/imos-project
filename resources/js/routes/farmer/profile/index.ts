import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/farmer/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const profile = {
    show: Object.assign(show, show),
}

export default profile