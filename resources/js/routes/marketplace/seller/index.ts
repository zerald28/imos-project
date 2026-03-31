import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import images from './images'
import profile from './profile'
import directSale from './direct-sale'
import method from './'
import marketplace from './marketplace'
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::create
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:229
 * @route '/marketplace/seller/create'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/index',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::index
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:27
 * @route '/marketplace/seller/index'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::store
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:250
 * @route '/marketplace/seller'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/marketplace/seller',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::store
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:250
 * @route '/marketplace/seller'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::store
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:250
 * @route '/marketplace/seller'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::store
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:250
 * @route '/marketplace/seller'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::store
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:250
 * @route '/marketplace/seller'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::edit
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:333
 * @route '/marketplace/seller/{id}/edit'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::update
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:371
 * @route '/marketplace/seller/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/marketplace/seller/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::update
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:371
 * @route '/marketplace/seller/{id}'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::update
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:371
 * @route '/marketplace/seller/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::update
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:371
 * @route '/marketplace/seller/{id}'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::update
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:371
 * @route '/marketplace/seller/{id}'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:432
 * @route '/marketplace/seller/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/marketplace/seller/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:432
 * @route '/marketplace/seller/{id}'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:432
 * @route '/marketplace/seller/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:432
 * @route '/marketplace/seller/{id}'
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
* @see \App\Http\Controllers\Marketplace\SellerListingController::destroy
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:432
 * @route '/marketplace/seller/{id}'
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
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::updateImage
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:551
 * @route '/marketplace/seller/{listing}/image'
 */
export const updateImage = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateImage.url(args, options),
    method: 'post',
})

updateImage.definition = {
    methods: ["post"],
    url: '/marketplace/seller/{listing}/image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::updateImage
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:551
 * @route '/marketplace/seller/{listing}/image'
 */
updateImage.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateImage.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::updateImage
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:551
 * @route '/marketplace/seller/{listing}/image'
 */
updateImage.post = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateImage.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::updateImage
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:551
 * @route '/marketplace/seller/{listing}/image'
 */
    const updateImageForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateImage.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::updateImage
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:551
 * @route '/marketplace/seller/{listing}/image'
 */
        updateImageForm.post = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateImage.url(args, options),
            method: 'post',
        })
    
    updateImage.form = updateImageForm
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::removeSwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:527
 * @route '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}'
 */
export const removeSwine = (args: { listingId: string | number, swineId: string | number } | [listingId: string | number, swineId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeSwine.url(args, options),
    method: 'delete',
})

removeSwine.definition = {
    methods: ["delete"],
    url: '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::removeSwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:527
 * @route '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}'
 */
removeSwine.url = (args: { listingId: string | number, swineId: string | number } | [listingId: string | number, swineId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    listingId: args[0],
                    swineId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listingId: args.listingId,
                                swineId: args.swineId,
                }

    return removeSwine.definition.url
            .replace('{listingId}', parsedArgs.listingId.toString())
            .replace('{swineId}', parsedArgs.swineId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::removeSwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:527
 * @route '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}'
 */
removeSwine.delete = (args: { listingId: string | number, swineId: string | number } | [listingId: string | number, swineId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeSwine.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::removeSwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:527
 * @route '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}'
 */
    const removeSwineForm = (args: { listingId: string | number, swineId: string | number } | [listingId: string | number, swineId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeSwine.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::removeSwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:527
 * @route '/marketplace/seller/listings/{listingId}/remove-swine/{swineId}'
 */
        removeSwineForm.delete = (args: { listingId: string | number, swineId: string | number } | [listingId: string | number, swineId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeSwine.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeSwine.form = removeSwineForm
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
export const requests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})

requests.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
requests.url = (options?: RouteQueryOptions) => {
    return requests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
requests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
requests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
    const requestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: requests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
        requestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::requests
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:622
 * @route '/marketplace/seller/requests'
 */
        requestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    requests.form = requestsForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
export const complete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/marketplace/seller/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
complete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return complete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
complete.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
    const completeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
        completeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
export const updateWeight = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight.url(args, options),
    method: 'post',
})

updateWeight.definition = {
    methods: ["post"],
    url: '/marketplace/seller/weight/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
updateWeight.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateWeight.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
updateWeight.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
    const updateWeightForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateWeight.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
        updateWeightForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateWeight.url(args, options),
            method: 'post',
        })
    
    updateWeight.form = updateWeightForm
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
export const findBySwine = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBySwine.url(args, options),
    method: 'get',
})

findBySwine.definition = {
    methods: ["get","head"],
    url: '/marketplace/seller/find-by-swine/{swineId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
findBySwine.url = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swineId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    swineId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swineId: args.swineId,
                }

    return findBySwine.definition.url
            .replace('{swineId}', parsedArgs.swineId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
findBySwine.get = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBySwine.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
findBySwine.head = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findBySwine.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
    const findBySwineForm = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: findBySwine.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
        findBySwineForm.get = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: findBySwine.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerListingController::findBySwine
 * @see app/Http/Controllers/Marketplace/SellerListingController.php:659
 * @route '/marketplace/seller/find-by-swine/{swineId}'
 */
        findBySwineForm.head = (args: { swineId: string | number } | [swineId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: findBySwine.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    findBySwine.form = findBySwineForm
const seller = {
    profile: Object.assign(profile, profile),
create: Object.assign(create, create),
index: Object.assign(index, index),
store: Object.assign(store, store),
directSale: Object.assign(directSale, directSale),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
updateImage: Object.assign(updateImage, updateImage),
removeSwine: Object.assign(removeSwine, removeSwine),
: Object.assign(method, method),
marketplace: Object.assign(marketplace, marketplace),
requests: Object.assign(requests, requests),
complete: Object.assign(complete, complete),
updateWeight: Object.assign(updateWeight, updateWeight),
findBySwine: Object.assign(findBySwine, findBySwine),
}

export default seller
const seller = {
    images: Object.assign(images, images),
}

export default seller