import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceBookingController::store
 * @see app/Http/Controllers/ServiceBookingController.php:17
 * @route '/marketplace/services/bookings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/marketplace/services/bookings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::store
 * @see app/Http/Controllers/ServiceBookingController.php:17
 * @route '/marketplace/services/bookings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::store
 * @see app/Http/Controllers/ServiceBookingController.php:17
 * @route '/marketplace/services/bookings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::store
 * @see app/Http/Controllers/ServiceBookingController.php:17
 * @route '/marketplace/services/bookings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::store
 * @see app/Http/Controllers/ServiceBookingController.php:17
 * @route '/marketplace/services/bookings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServiceBookingController::updateStatus
 * @see app/Http/Controllers/ServiceBookingController.php:87
 * @route '/marketplace/services/bookings/{booking}/update-status'
 */
export const updateStatus = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/marketplace/services/bookings/{booking}/update-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::updateStatus
 * @see app/Http/Controllers/ServiceBookingController.php:87
 * @route '/marketplace/services/bookings/{booking}/update-status'
 */
updateStatus.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return updateStatus.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::updateStatus
 * @see app/Http/Controllers/ServiceBookingController.php:87
 * @route '/marketplace/services/bookings/{booking}/update-status'
 */
updateStatus.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::updateStatus
 * @see app/Http/Controllers/ServiceBookingController.php:87
 * @route '/marketplace/services/bookings/{booking}/update-status'
 */
    const updateStatusForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::updateStatus
 * @see app/Http/Controllers/ServiceBookingController.php:87
 * @route '/marketplace/services/bookings/{booking}/update-status'
 */
        updateStatusForm.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, options),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\ServiceBookingController::complete
 * @see app/Http/Controllers/ServiceBookingController.php:205
 * @route '/marketplace/services/bookings/{booking}/complete'
 */
export const complete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/marketplace/services/bookings/{booking}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::complete
 * @see app/Http/Controllers/ServiceBookingController.php:205
 * @route '/marketplace/services/bookings/{booking}/complete'
 */
complete.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return complete.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::complete
 * @see app/Http/Controllers/ServiceBookingController.php:205
 * @route '/marketplace/services/bookings/{booking}/complete'
 */
complete.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::complete
 * @see app/Http/Controllers/ServiceBookingController.php:205
 * @route '/marketplace/services/bookings/{booking}/complete'
 */
    const completeForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::complete
 * @see app/Http/Controllers/ServiceBookingController.php:205
 * @route '/marketplace/services/bookings/{booking}/complete'
 */
        completeForm.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
export const myBookings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myBookings.url(options),
    method: 'get',
})

myBookings.definition = {
    methods: ["get","head"],
    url: '/marketplace/services/my-bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
myBookings.url = (options?: RouteQueryOptions) => {
    return myBookings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
myBookings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myBookings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
myBookings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myBookings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
    const myBookingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myBookings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
        myBookingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myBookings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceBookingController::myBookings
 * @see app/Http/Controllers/ServiceBookingController.php:185
 * @route '/marketplace/services/my-bookings'
 */
        myBookingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myBookings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    myBookings.form = myBookingsForm
/**
* @see \App\Http\Controllers\ServiceBookingController::destroy
 * @see app/Http/Controllers/ServiceBookingController.php:242
 * @route '/marketplace/services/bookings/{booking}'
 */
export const destroy = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/services/bookings/{booking}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::destroy
 * @see app/Http/Controllers/ServiceBookingController.php:242
 * @route '/marketplace/services/bookings/{booking}'
 */
destroy.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return destroy.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::destroy
 * @see app/Http/Controllers/ServiceBookingController.php:242
 * @route '/marketplace/services/bookings/{booking}'
 */
destroy.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::destroy
 * @see app/Http/Controllers/ServiceBookingController.php:242
 * @route '/marketplace/services/bookings/{booking}'
 */
    const destroyForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::destroy
 * @see app/Http/Controllers/ServiceBookingController.php:242
 * @route '/marketplace/services/bookings/{booking}'
 */
        destroyForm.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const bookings = {
    store: Object.assign(store, store),
updateStatus: Object.assign(updateStatus, updateStatus),
complete: Object.assign(complete, complete),
myBookings: Object.assign(myBookings, myBookings),
destroy: Object.assign(destroy, destroy),
}

export default bookings