import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::add
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:576
 * @route '/marketplace/seller/{listing}/images'
 */
export const add = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(args, options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/marketplace/seller/{listing}/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::add
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:576
 * @route '/marketplace/seller/{listing}/images'
 */
add.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { listing: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    listing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listing: args.listing,
                }

    return add.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::add
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:576
 * @route '/marketplace/seller/{listing}/images'
 */
add.post = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::add
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:576
 * @route '/marketplace/seller/{listing}/images'
 */
    const addForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: add.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::add
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:576
 * @route '/marketplace/seller/{listing}/images'
 */
        addForm.post = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: add.url(args, options),
            method: 'post',
        })
    
    add.form = addForm
const images = {
    add: Object.assign(add, add),
}

export default images