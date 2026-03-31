import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
export const schedules = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})

schedules.definition = {
    methods: ["get","head"],
    url: '/swine-management/schedules-calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
schedules.url = (options?: RouteQueryOptions) => {
    return schedules.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
schedules.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
schedules.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedules.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
    const schedulesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedules.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
        schedulesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ScheduleController::schedules
 * @see app/Http/Controllers/ScheduleController.php:206
 * @route '/swine-management/schedules-calendar'
 */
        schedulesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedules.form = schedulesForm
const schedule = {
    schedules: Object.assign(schedules, schedules),
}

export default schedule