import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import mortality from './mortality'
import production9eb667 from './production'
import management from './management'
import listing from './listing'
import groups from './groups'
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
export const production = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: production.url(options),
    method: 'get',
})

production.definition = {
    methods: ["get","head"],
    url: '/admin/swine-production',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
production.url = (options?: RouteQueryOptions) => {
    return production.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
production.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: production.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
production.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: production.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
    const productionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: production.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
        productionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: production.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::production
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
        productionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: production.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    production.form = productionForm
/**
* @see \App\Http\Controllers\Swine\SwineController::multidelete
 * @see app/Http/Controllers/Swine/SwineController.php:213
 * @route '/swine-management/swine/multidelete'
 */
export const multidelete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: multidelete.url(options),
    method: 'delete',
})

multidelete.definition = {
    methods: ["delete"],
    url: '/swine-management/swine/multidelete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::multidelete
 * @see app/Http/Controllers/Swine/SwineController.php:213
 * @route '/swine-management/swine/multidelete'
 */
multidelete.url = (options?: RouteQueryOptions) => {
    return multidelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::multidelete
 * @see app/Http/Controllers/Swine/SwineController.php:213
 * @route '/swine-management/swine/multidelete'
 */
multidelete.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: multidelete.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::multidelete
 * @see app/Http/Controllers/Swine/SwineController.php:213
 * @route '/swine-management/swine/multidelete'
 */
    const multideleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: multidelete.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::multidelete
 * @see app/Http/Controllers/Swine/SwineController.php:213
 * @route '/swine-management/swine/multidelete'
 */
        multideleteForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: multidelete.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    multidelete.form = multideleteForm
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
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
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::create
 * @see app/Http/Controllers/Swine/SwineController.php:84
 * @route '/swine-management/swine/create'
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
* @see \App\Http\Controllers\Swine\SwineController::store
 * @see app/Http/Controllers/Swine/SwineController.php:101
 * @route '/swine-management/swine'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/swine-management/swine',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::store
 * @see app/Http/Controllers/Swine/SwineController.php:101
 * @route '/swine-management/swine'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::store
 * @see app/Http/Controllers/Swine/SwineController.php:101
 * @route '/swine-management/swine'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::store
 * @see app/Http/Controllers/Swine/SwineController.php:101
 * @route '/swine-management/swine'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::store
 * @see app/Http/Controllers/Swine/SwineController.php:101
 * @route '/swine-management/swine'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
export const edit = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine/{swine}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
edit.url = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine: typeof args.swine === 'object'
                ? args.swine.id
                : args.swine,
                }

    return edit.definition.url
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
edit.get = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
edit.head = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
    const editForm = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
        editForm.get = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::edit
 * @see app/Http/Controllers/Swine/SwineController.php:144
 * @route '/swine-management/swine/{swine}/edit'
 */
        editForm.head = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
export const update = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/swine-management/swine/{swine}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
update.url = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine: typeof args.swine === 'object'
                ? args.swine.id
                : args.swine,
                }

    return update.definition.url
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
update.put = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
update.patch = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::update
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
    const updateForm = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
        updateForm.put = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Swine/SwineController.php:158
 * @route '/swine-management/swine/{swine}'
 */
        updateForm.patch = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Swine\SwineController::destroy
 * @see app/Http/Controllers/Swine/SwineController.php:194
 * @route '/swine-management/swine/{swine}'
 */
export const destroy = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/swine-management/swine/{swine}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::destroy
 * @see app/Http/Controllers/Swine/SwineController.php:194
 * @route '/swine-management/swine/{swine}'
 */
destroy.url = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine: typeof args.swine === 'object'
                ? args.swine.id
                : args.swine,
                }

    return destroy.definition.url
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::destroy
 * @see app/Http/Controllers/Swine/SwineController.php:194
 * @route '/swine-management/swine/{swine}'
 */
destroy.delete = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::destroy
 * @see app/Http/Controllers/Swine/SwineController.php:194
 * @route '/swine-management/swine/{swine}'
 */
    const destroyForm = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::destroy
 * @see app/Http/Controllers/Swine/SwineController.php:194
 * @route '/swine-management/swine/{swine}'
 */
        destroyForm.delete = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/swine/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
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
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::show
 * @see app/Http/Controllers/Swine/SwineController.php:373
 * @route '/swine/{id}'
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
* @see \App\Http\Controllers\Swine\SwineController::update_swine
 * @see app/Http/Controllers/Swine/SwineController.php:410
 * @route '/swine/{id}'
 */
export const update_swine = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update_swine.url(args, options),
    method: 'put',
})

update_swine.definition = {
    methods: ["put"],
    url: '/swine/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::update_swine
 * @see app/Http/Controllers/Swine/SwineController.php:410
 * @route '/swine/{id}'
 */
update_swine.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update_swine.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::update_swine
 * @see app/Http/Controllers/Swine/SwineController.php:410
 * @route '/swine/{id}'
 */
update_swine.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update_swine.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::update_swine
 * @see app/Http/Controllers/Swine/SwineController.php:410
 * @route '/swine/{id}'
 */
    const update_swineForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update_swine.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::update_swine
 * @see app/Http/Controllers/Swine/SwineController.php:410
 * @route '/swine/{id}'
 */
        update_swineForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update_swine.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update_swine.form = update_swineForm
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::bulkAssign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:99
 * @route '/swine/bulk-assign'
 */
export const bulkAssign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

bulkAssign.definition = {
    methods: ["post"],
    url: '/swine/bulk-assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::bulkAssign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:99
 * @route '/swine/bulk-assign'
 */
bulkAssign.url = (options?: RouteQueryOptions) => {
    return bulkAssign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::bulkAssign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:99
 * @route '/swine/bulk-assign'
 */
bulkAssign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::bulkAssign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:99
 * @route '/swine/bulk-assign'
 */
    const bulkAssignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkAssign.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::bulkAssign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:99
 * @route '/swine/bulk-assign'
 */
        bulkAssignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkAssign.url(options),
            method: 'post',
        })
    
    bulkAssign.form = bulkAssignForm
/**
* @see \App\Http\Controllers\Swine\SwineController::bulkDelete
 * @see app/Http/Controllers/Swine/SwineController.php:0
 * @route '/swine/bulk-delete'
 */
export const bulkDelete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

bulkDelete.definition = {
    methods: ["delete"],
    url: '/swine/bulk-delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::bulkDelete
 * @see app/Http/Controllers/Swine/SwineController.php:0
 * @route '/swine/bulk-delete'
 */
bulkDelete.url = (options?: RouteQueryOptions) => {
    return bulkDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::bulkDelete
 * @see app/Http/Controllers/Swine/SwineController.php:0
 * @route '/swine/bulk-delete'
 */
bulkDelete.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::bulkDelete
 * @see app/Http/Controllers/Swine/SwineController.php:0
 * @route '/swine/bulk-delete'
 */
    const bulkDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkDelete.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::bulkDelete
 * @see app/Http/Controllers/Swine/SwineController.php:0
 * @route '/swine/bulk-delete'
 */
        bulkDeleteForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkDelete.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    bulkDelete.form = bulkDeleteForm
const swine = {
    mortality: Object.assign(mortality, mortality),
production: Object.assign(production, production9eb667),
management: Object.assign(management, management),
multidelete: Object.assign(multidelete, multidelete),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
listing: Object.assign(listing, listing),
show: Object.assign(show, show),
update_swine: Object.assign(update_swine, update_swine),
bulkAssign: Object.assign(bulkAssign, bulkAssign),
bulkDelete: Object.assign(bulkDelete, bulkDelete),
groups: Object.assign(groups, groups),
}

export default swine