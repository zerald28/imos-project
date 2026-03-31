import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/multicreate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::index
 * @see app/Http/Controllers/Swine/SwineMultiController.php:64
 * @route '/swine-management/swine/multicreate'
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
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/multicreate/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::create
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/create'
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
* @see \App\Http\Controllers\Swine\SwineMultiController::store
 * @see app/Http/Controllers/Swine/SwineMultiController.php:157
 * @route '/swine-management/swine/multicreate'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/swine-management/swine/multicreate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::store
 * @see app/Http/Controllers/Swine/SwineMultiController.php:157
 * @route '/swine-management/swine/multicreate'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::store
 * @see app/Http/Controllers/Swine/SwineMultiController.php:157
 * @route '/swine-management/swine/multicreate'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::store
 * @see app/Http/Controllers/Swine/SwineMultiController.php:157
 * @route '/swine-management/swine/multicreate'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::store
 * @see app/Http/Controllers/Swine/SwineMultiController.php:157
 * @route '/swine-management/swine/multicreate'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
export const show = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/multicreate/{multicreate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
show.url = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { multicreate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    multicreate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        multicreate: args.multicreate,
                }

    return show.definition.url
            .replace('{multicreate}', parsedArgs.multicreate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
show.get = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
show.head = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
    const showForm = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
        showForm.get = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::show
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
        showForm.head = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
export const edit = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/multicreate/{multicreate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
edit.url = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { multicreate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    multicreate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        multicreate: args.multicreate,
                }

    return edit.definition.url
            .replace('{multicreate}', parsedArgs.multicreate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
edit.get = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
edit.head = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
    const editForm = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
        editForm.get = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::edit
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}/edit'
 */
        editForm.head = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
export const update = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/swine-management/swine/multicreate/{multicreate}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
update.url = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { multicreate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    multicreate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        multicreate: args.multicreate,
                }

    return update.definition.url
            .replace('{multicreate}', parsedArgs.multicreate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
update.put = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
update.patch = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
    const updateForm = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
        updateForm.put = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::update
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
        updateForm.patch = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Swine\SwineMultiController::destroy
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
export const destroy = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/swine-management/swine/multicreate/{multicreate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::destroy
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
destroy.url = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { multicreate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    multicreate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        multicreate: args.multicreate,
                }

    return destroy.definition.url
            .replace('{multicreate}', parsedArgs.multicreate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineMultiController::destroy
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
destroy.delete = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineMultiController::destroy
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
    const destroyForm = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineMultiController::destroy
 * @see app/Http/Controllers/Swine/SwineMultiController.php:0
 * @route '/swine-management/swine/multicreate/{multicreate}'
 */
        destroyForm.delete = (args: { multicreate: string | number } | [multicreate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SwineMultiController = { index, create, store, show, edit, update, destroy }

export default SwineMultiController