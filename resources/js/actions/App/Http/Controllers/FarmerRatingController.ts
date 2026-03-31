import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FarmerRatingController::storeOrUpdate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
export const storeOrUpdate = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOrUpdate.url(args, options),
    method: 'post',
})

storeOrUpdate.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/rate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FarmerRatingController::storeOrUpdate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
storeOrUpdate.url = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transaction: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return storeOrUpdate.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FarmerRatingController::storeOrUpdate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
storeOrUpdate.post = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOrUpdate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FarmerRatingController::storeOrUpdate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
    const storeOrUpdateForm = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeOrUpdate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FarmerRatingController::storeOrUpdate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
        storeOrUpdateForm.post = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeOrUpdate.url(args, options),
            method: 'post',
        })
    
    storeOrUpdate.form = storeOrUpdateForm
/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
export const getRating = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRating.url(args, options),
    method: 'get',
})

getRating.definition = {
    methods: ["get","head"],
    url: '/marketplace/transactions/{transaction}/rating',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.url = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transaction: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return getRating.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRating.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRating.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
    const getRatingForm = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRating.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
        getRatingForm.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRating.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
        getRatingForm.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRating.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRating.form = getRatingForm
/**
* @see \App\Http\Controllers\FarmerRatingController::destroy
 * @see app/Http/Controllers/FarmerRatingController.php:151
 * @route '/marketplace/ratings/{rating}'
 */
export const destroy = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/ratings/{rating}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FarmerRatingController::destroy
 * @see app/Http/Controllers/FarmerRatingController.php:151
 * @route '/marketplace/ratings/{rating}'
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
* @see \App\Http\Controllers\FarmerRatingController::destroy
 * @see app/Http/Controllers/FarmerRatingController.php:151
 * @route '/marketplace/ratings/{rating}'
 */
destroy.delete = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FarmerRatingController::destroy
 * @see app/Http/Controllers/FarmerRatingController.php:151
 * @route '/marketplace/ratings/{rating}'
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
* @see \App\Http\Controllers\FarmerRatingController::destroy
 * @see app/Http/Controllers/FarmerRatingController.php:151
 * @route '/marketplace/ratings/{rating}'
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
const FarmerRatingController = { storeOrUpdate, getRating, destroy }

export default FarmerRatingController