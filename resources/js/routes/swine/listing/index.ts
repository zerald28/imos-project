import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
export const update = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/swine/{swine_id}/listing/{listing_id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
update.url = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    swine_id: args[0],
                    listing_id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine_id: args.swine_id,
                                listing_id: args.listing_id,
                }

    return update.definition.url
            .replace('{swine_id}', parsedArgs.swine_id.toString())
            .replace('{listing_id}', parsedArgs.listing_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
update.put = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
    const updateForm = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
        updateForm.put = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const listing = {
    update: Object.assign(update, update),
}

export default listing