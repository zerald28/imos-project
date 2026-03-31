import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/marketplace/profile/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
export const own = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: own.url(options),
    method: 'get',
})

own.definition = {
    methods: ["get","head"],
    url: '/marketplace/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
own.url = (options?: RouteQueryOptions) => {
    return own.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
own.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: own.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
own.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: own.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
    const ownForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: own.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
        ownForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: own.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::own
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
        ownForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: own.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    own.form = ownForm
const profile = {
    show: Object.assign(show, show),
own: Object.assign(own, own),
}

export default profile