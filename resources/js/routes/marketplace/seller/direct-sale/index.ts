import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/direct-sale',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::create
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:60
 * @route '/marketplace/seller/direct-sale'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::store
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/marketplace/seller/direct-sale',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::store
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::store
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::store
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::store
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:15
 * @route '/marketplace/seller/direct-sale'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/direct-sale/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::edit
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:84
 * @route '/marketplace/seller/direct-sale/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Marketplace\DirectSaleController::update
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/marketplace/seller/direct-sale/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::update
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::update
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::update
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::update
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:170
 * @route '/marketplace/seller/direct-sale/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroy
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/seller/direct-sale/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroy
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroy
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroy
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\DirectSaleController::destroy
 * @see app/Http/Controllers/Marketplace/DirectSaleController.php:203
 * @route '/marketplace/seller/direct-sale/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const directSale = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default directSale