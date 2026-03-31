import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::list
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:20
 * @route '/admin/events'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
const schedules = {
    list: Object.assign(list, list),
}

export default schedules