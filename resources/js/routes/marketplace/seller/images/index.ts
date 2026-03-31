import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:604
 * @route '/marketplace/seller/{listing}/images/{photo}'
 */
export const destroy = (args: { listing: string | number, photo: string | number } | [listing: string | number, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/seller/{listing}/images/{photo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:604
 * @route '/marketplace/seller/{listing}/images/{photo}'
 */
destroy.url = (args: { listing: string | number, photo: string | number } | [listing: string | number, photo: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    listing: args[0],
                    photo: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listing: args.listing,
                                photo: args.photo,
                }

    return destroy.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:604
 * @route '/marketplace/seller/{listing}/images/{photo}'
 */
destroy.delete = (args: { listing: string | number, photo: string | number } | [listing: string | number, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:604
 * @route '/marketplace/seller/{listing}/images/{photo}'
 */
    const destroyForm = (args: { listing: string | number, photo: string | number } | [listing: string | number, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:604
 * @route '/marketplace/seller/{listing}/images/{photo}'
 */
        destroyForm.delete = (args: { listing: string | number, photo: string | number } | [listing: string | number, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const images = {
    destroy: Object.assign(destroy, destroy),
}

export default images