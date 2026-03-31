import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/admin/schedules/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
    const calendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
        calendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::calendar
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
        calendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendar.form = calendarForm
const schedule = {
    calendar: Object.assign(calendar, calendar),
}

export default schedule