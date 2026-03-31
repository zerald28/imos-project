import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import profile from './profile'
import seller from './seller'
import transaction from './transaction'
import buyer from './buyer'
import marketplace from './marketplace'
import services from './services'
import rating from './rating'
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/marketplace',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
export const loadMore = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadMore.url(options),
    method: 'get',
})

loadMore.definition = {
    methods: ["get","head"],
    url: '/marketplace/load-more',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.url = (options?: RouteQueryOptions) => {
    return loadMore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadMore.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loadMore.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
    const loadMoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loadMore.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
        loadMoreForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadMore.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
        loadMoreForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadMore.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loadMore.form = loadMoreForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
export const show = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/marketplace/{listing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
    const showForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
        showForm.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
        showForm.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const marketplace = {
    profile: Object.assign(profile, profile),
seller: Object.assign(seller, seller),
index: Object.assign(index, index),
loadMore: Object.assign(loadMore, loadMore),
transaction: Object.assign(transaction, transaction),
buyer: Object.assign(buyer, buyer),
marketplace: Object.assign(marketplace, marketplace),
services: Object.assign(services, services),
show: Object.assign(show, show),
rating: Object.assign(rating, rating),
}

export default marketplace