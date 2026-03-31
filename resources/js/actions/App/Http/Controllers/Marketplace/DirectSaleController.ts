import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
export const createDirectSale = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createDirectSale.url(options),
    method: 'get',
})

createDirectSale.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/direct-sale',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
createDirectSale.url = (options?: RouteQueryOptions) => {
    return createDirectSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
createDirectSale.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createDirectSale.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
createDirectSale.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createDirectSale.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
    const createDirectSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createDirectSale.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
        createDirectSaleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createDirectSale.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::createDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
        createDirectSaleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createDirectSale.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createDirectSale.form = createDirectSaleForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::storeDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
export const storeDirectSale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDirectSale.url(options),
    method: 'post',
})

storeDirectSale.definition = {
    methods: ["post"],
    url: '/marketplace/seller/direct-sale',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::storeDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
storeDirectSale.url = (options?: RouteQueryOptions) => {
    return storeDirectSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::storeDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
storeDirectSale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDirectSale.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::storeDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
    const storeDirectSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeDirectSale.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::storeDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
        storeDirectSaleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeDirectSale.url(options),
            method: 'post',
        })
    
    storeDirectSale.form = storeDirectSaleForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
export const editDirectSale = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editDirectSale.url(args, options),
    method: 'get',
})

editDirectSale.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/direct-sale/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
editDirectSale.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return editDirectSale.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
editDirectSale.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editDirectSale.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
editDirectSale.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editDirectSale.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
    const editDirectSaleForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editDirectSale.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
        editDirectSaleForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editDirectSale.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::editDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
        editDirectSaleForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editDirectSale.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editDirectSale.form = editDirectSaleForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::updateDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
export const updateDirectSale = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDirectSale.url(args, options),
    method: 'put',
})

updateDirectSale.definition = {
    methods: ["put"],
    url: '/marketplace/seller/direct-sale/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::updateDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
updateDirectSale.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateDirectSale.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::updateDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
updateDirectSale.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDirectSale.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::updateDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
    const updateDirectSaleForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateDirectSale.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::updateDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
        updateDirectSaleForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateDirectSale.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateDirectSale.form = updateDirectSaleForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroyDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
export const destroyDirectSale = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyDirectSale.url(args, options),
    method: 'delete',
})

destroyDirectSale.definition = {
    methods: ["delete"],
    url: '/marketplace/seller/direct-sale/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroyDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
destroyDirectSale.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyDirectSale.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroyDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
destroyDirectSale.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyDirectSale.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroyDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
    const destroyDirectSaleForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyDirectSale.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroyDirectSale
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
        destroyDirectSaleForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyDirectSale.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyDirectSale.form = destroyDirectSaleForm
const DirectSaleController = { createDirectSale, storeDirectSale, editDirectSale, updateDirectSale, destroyDirectSale }

export default DirectSaleController