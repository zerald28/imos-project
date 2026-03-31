import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
export const personnel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personnel.url(options),
    method: 'get',
})

personnel.definition = {
    methods: ["get","head"],
    url: '/DA/personnels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
personnel.url = (options?: RouteQueryOptions) => {
    return personnel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
personnel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personnel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
personnel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: personnel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
    const personnelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: personnel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
        personnelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personnel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::personnel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
        personnelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personnel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    personnel.form = personnelForm
const da = {
    personnel: Object.assign(personnel, personnel),
}

export default da