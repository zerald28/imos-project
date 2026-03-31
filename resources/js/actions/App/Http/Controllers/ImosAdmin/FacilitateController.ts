import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
const index3e3998584f5626936e84fadf1d967f50 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3e3998584f5626936e84fadf1d967f50.url(options),
    method: 'get',
})

index3e3998584f5626936e84fadf1d967f50.definition = {
    methods: ["get","head"],
    url: '/facilitate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
index3e3998584f5626936e84fadf1d967f50.url = (options?: RouteQueryOptions) => {
    return index3e3998584f5626936e84fadf1d967f50.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
index3e3998584f5626936e84fadf1d967f50.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3e3998584f5626936e84fadf1d967f50.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
index3e3998584f5626936e84fadf1d967f50.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3e3998584f5626936e84fadf1d967f50.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
    const index3e3998584f5626936e84fadf1d967f50Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index3e3998584f5626936e84fadf1d967f50.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
        index3e3998584f5626936e84fadf1d967f50Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3e3998584f5626936e84fadf1d967f50.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate'
 */
        index3e3998584f5626936e84fadf1d967f50Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3e3998584f5626936e84fadf1d967f50.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index3e3998584f5626936e84fadf1d967f50.form = index3e3998584f5626936e84fadf1d967f50Form
    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
const indexc7bbd1a26fc18cccc4223a231157d28e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc7bbd1a26fc18cccc4223a231157d28e.url(options),
    method: 'get',
})

indexc7bbd1a26fc18cccc4223a231157d28e.definition = {
    methods: ["get","head"],
    url: '/facilitate/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
indexc7bbd1a26fc18cccc4223a231157d28e.url = (options?: RouteQueryOptions) => {
    return indexc7bbd1a26fc18cccc4223a231157d28e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
indexc7bbd1a26fc18cccc4223a231157d28e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc7bbd1a26fc18cccc4223a231157d28e.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
indexc7bbd1a26fc18cccc4223a231157d28e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexc7bbd1a26fc18cccc4223a231157d28e.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
    const indexc7bbd1a26fc18cccc4223a231157d28eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexc7bbd1a26fc18cccc4223a231157d28e.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
        indexc7bbd1a26fc18cccc4223a231157d28eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexc7bbd1a26fc18cccc4223a231157d28e.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::index
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:17
 * @route '/facilitate/users'
 */
        indexc7bbd1a26fc18cccc4223a231157d28eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexc7bbd1a26fc18cccc4223a231157d28e.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexc7bbd1a26fc18cccc4223a231157d28e.form = indexc7bbd1a26fc18cccc4223a231157d28eForm

export const index = {
    '/facilitate': index3e3998584f5626936e84fadf1d967f50,
    '/facilitate/users': indexc7bbd1a26fc18cccc4223a231157d28e,
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
export const createUser = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createUser.url(options),
    method: 'get',
})

createUser.definition = {
    methods: ["get","head"],
    url: '/facilitate/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
createUser.url = (options?: RouteQueryOptions) => {
    return createUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
createUser.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createUser.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
createUser.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createUser.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
    const createUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createUser.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
        createUserForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createUser.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::createUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:318
 * @route '/facilitate/users/create'
 */
        createUserForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createUser.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createUser.form = createUserForm
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
export const editUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editUser.url(args, options),
    method: 'get',
})

editUser.definition = {
    methods: ["get","head"],
    url: '/facilitate/users/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
editUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return editUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
editUser.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editUser.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
editUser.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editUser.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
    const editUserForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editUser.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
        editUserForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editUser.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::editUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:370
 * @route '/facilitate/users/{id}/edit'
 */
        editUserForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editUser.form = editUserForm
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
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::updateUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
export const updateUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

updateUser.definition = {
    methods: ["put"],
    url: '/admin/facilitate/users/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::updateUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
updateUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::updateUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
updateUser.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::updateUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
    const updateUserForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateUser.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::updateUser
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:412
 * @route '/admin/facilitate/users/{id}'
 */
        updateUserForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateUser.form = updateUserForm
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
export const farmershow = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: farmershow.url(options),
    method: 'get',
})

farmershow.definition = {
    methods: ["get","head"],
    url: '/farmer/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
farmershow.url = (options?: RouteQueryOptions) => {
    return farmershow.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
farmershow.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: farmershow.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
farmershow.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: farmershow.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
    const farmershowForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: farmershow.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
        farmershowForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: farmershow.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\FacilitateController::farmershow
 * @see app/Http/Controllers/ImosAdmin/FacilitateController.php:192
 * @route '/farmer/profile'
 */
        farmershowForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: farmershow.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    farmershow.form = farmershowForm
const FacilitateController = { index, createUser, show, editUser, store, updateUser, farmershow }

export default FacilitateController