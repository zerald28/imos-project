import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
export const showRatingPage = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRatingPage.url(args, options),
    method: 'get',
})

showRatingPage.definition = {
    methods: ["get","head"],
    url: '/marketplace/services/ratings/booking/{booking}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
showRatingPage.url = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: args.booking,
                }

    return showRatingPage.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
showRatingPage.get = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRatingPage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
showRatingPage.head = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRatingPage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
    const showRatingPageForm = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showRatingPage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
        showRatingPageForm.get = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showRatingPage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceRatingController::showRatingPage
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
        showRatingPageForm.head = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showRatingPage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showRatingPage.form = showRatingPageForm
/**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
export const editRating = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editRating.url(args, options),
    method: 'get',
})

editRating.definition = {
    methods: ["get","head"],
    url: '/marketplace/services/ratings/{rating}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
editRating.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rating: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rating: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rating: typeof args.rating === 'object'
                ? args.rating.id
                : args.rating,
                }

    return editRating.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
editRating.get = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editRating.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
editRating.head = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editRating.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
    const editRatingForm = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editRating.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
        editRatingForm.get = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editRating.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceRatingController::editRating
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
        editRatingForm.head = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editRating.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editRating.form = editRatingForm
/**
* @see \App\Http\Controllers\ServiceRatingController::store
 * @see app/Http/Controllers/ServiceRatingController.php:48
 * @route '/marketplace/services/ratings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/marketplace/services/ratings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::store
 * @see app/Http/Controllers/ServiceRatingController.php:48
 * @route '/marketplace/services/ratings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::store
 * @see app/Http/Controllers/ServiceRatingController.php:48
 * @route '/marketplace/services/ratings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::store
 * @see app/Http/Controllers/ServiceRatingController.php:48
 * @route '/marketplace/services/ratings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::store
 * @see app/Http/Controllers/ServiceRatingController.php:48
 * @route '/marketplace/services/ratings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServiceRatingController::update
 * @see app/Http/Controllers/ServiceRatingController.php:138
 * @route '/marketplace/services/ratings/{rating}'
 */
export const update = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/marketplace/services/ratings/{rating}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::update
 * @see app/Http/Controllers/ServiceRatingController.php:138
 * @route '/marketplace/services/ratings/{rating}'
 */
update.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rating: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rating: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rating: typeof args.rating === 'object'
                ? args.rating.id
                : args.rating,
                }

    return update.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::update
 * @see app/Http/Controllers/ServiceRatingController.php:138
 * @route '/marketplace/services/ratings/{rating}'
 */
update.put = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::update
 * @see app/Http/Controllers/ServiceRatingController.php:138
 * @route '/marketplace/services/ratings/{rating}'
 */
    const updateForm = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::update
 * @see app/Http/Controllers/ServiceRatingController.php:138
 * @route '/marketplace/services/ratings/{rating}'
 */
        updateForm.put = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ServiceRatingController::destroy
 * @see app/Http/Controllers/ServiceRatingController.php:189
 * @route '/marketplace/services/ratings/{rating}'
 */
export const destroy = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/services/ratings/{rating}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::destroy
 * @see app/Http/Controllers/ServiceRatingController.php:189
 * @route '/marketplace/services/ratings/{rating}'
 */
destroy.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { rating: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rating: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rating: typeof args.rating === 'object'
                ? args.rating.id
                : args.rating,
                }

    return destroy.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::destroy
 * @see app/Http/Controllers/ServiceRatingController.php:189
 * @route '/marketplace/services/ratings/{rating}'
 */
destroy.delete = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::destroy
 * @see app/Http/Controllers/ServiceRatingController.php:189
 * @route '/marketplace/services/ratings/{rating}'
 */
    const destroyForm = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::destroy
 * @see app/Http/Controllers/ServiceRatingController.php:189
 * @route '/marketplace/services/ratings/{rating}'
 */
        destroyForm.delete = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ServiceRatingController = { showRatingPage, editRating, store, update, destroy }

export default ServiceRatingController