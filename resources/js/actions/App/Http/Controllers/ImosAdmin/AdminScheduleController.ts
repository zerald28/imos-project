import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
export const schedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/admin/schedules/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
schedule.url = (options?: RouteQueryOptions) => {
    return schedule.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
schedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
schedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
    const scheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
        scheduleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::schedule
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:0
 * @route '/admin/schedules/calendar'
 */
        scheduleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule.form = scheduleForm
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::store
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:67
 * @route '/admin/events/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/events/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::store
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:67
 * @route '/admin/events/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::store
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:67
 * @route '/admin/events/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::store
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:67
 * @route '/admin/events/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::store
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:67
 * @route '/admin/events/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::update
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:116
 * @route '/admin/events/{event}'
 */
export const update = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/events/{event}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::update
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:116
 * @route '/admin/events/{event}'
 */
update.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::update
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:116
 * @route '/admin/events/{event}'
 */
update.put = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::update
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:116
 * @route '/admin/events/{event}'
 */
    const updateForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::update
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:116
 * @route '/admin/events/{event}'
 */
        updateForm.put = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::destroy
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:185
 * @route '/admin/event/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/event/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::destroy
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:185
 * @route '/admin/event/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::destroy
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:185
 * @route '/admin/event/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::destroy
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:185
 * @route '/admin/event/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminScheduleController::destroy
 * @see app/Http/Controllers/ImosAdmin/AdminScheduleController.php:185
 * @route '/admin/event/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AdminScheduleController = { list, schedule, store, update, destroy }

export default AdminScheduleController