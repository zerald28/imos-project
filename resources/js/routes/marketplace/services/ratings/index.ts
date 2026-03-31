import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
export const create = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/marketplace/services/ratings/booking/{booking}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
create.url = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
create.get = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
create.head = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
    const createForm = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
        createForm.get = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceRatingController::create
 * @see app/Http/Controllers/ServiceRatingController.php:17
 * @route '/marketplace/services/ratings/booking/{booking}'
 */
        createForm.head = (args: { booking: string | number } | [booking: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
export const edit = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/marketplace/services/ratings/{rating}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
edit.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
edit.get = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
edit.head = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
    const editForm = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
        editForm.get = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceRatingController::edit
 * @see app/Http/Controllers/ServiceRatingController.php:34
 * @route '/marketplace/services/ratings/{rating}/edit'
 */
        editForm.head = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
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
const ratings = {
    create: Object.assign(create, create),
edit: Object.assign(edit, edit),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default ratings