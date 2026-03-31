import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/marketplace/profileshow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::edit
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:20
 * @route '/marketplace/profileshow'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::update
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:56
 * @route '/marketplace/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/marketplace/profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::update
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:56
 * @route '/marketplace/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::update
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:56
 * @route '/marketplace/profile'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::update
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:56
 * @route '/marketplace/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerMarketplaceController::update
 * @see app/Http/Controllers/Marketplace/SellerMarketplaceController.php:56
 * @route '/marketplace/profile'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default profile