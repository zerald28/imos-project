import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const rating = {
    destroy: Object.assign(destroy, destroy),
}

export default rating