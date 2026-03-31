import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/facilitate/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/facilitate/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::create
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/facilitate/users/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::show
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:69
 * @route '/facilitate/users/{id}'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/facilitate/users/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::edit
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::store
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:325
 * @route '/admin/facilitate/users'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/facilitate/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::store
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:325
 * @route '/admin/facilitate/users'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::store
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:325
 * @route '/admin/facilitate/users'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::store
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:325
 * @route '/admin/facilitate/users'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::store
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:325
 * @route '/admin/facilitate/users'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::update
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/facilitate/users/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::update
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::update
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::update
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::update
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
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
const users = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default users