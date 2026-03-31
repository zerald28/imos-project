import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/insurance/application/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/insurance/application',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
export const show = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/insurance/application/{application}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.url = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: args.application,
                }

    return show.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.get = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.head = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
    const showForm = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
        showForm.get = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
        showForm.head = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:234
 * @route '/insurance/application/{application}/animal'
 */
export const addAnimal = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAnimal.url(args, options),
    method: 'post',
})

addAnimal.definition = {
    methods: ["post"],
    url: '/insurance/application/{application}/animal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:234
 * @route '/insurance/application/{application}/animal'
 */
addAnimal.url = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: args.application,
                }

    return addAnimal.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:234
 * @route '/insurance/application/{application}/animal'
 */
addAnimal.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addAnimal.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:234
 * @route '/insurance/application/{application}/animal'
 */
    const addAnimalForm = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addAnimal.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:234
 * @route '/insurance/application/{application}/animal'
 */
        addAnimalForm.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addAnimal.url(args, options),
            method: 'post',
        })
    
    addAnimal.form = addAnimalForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultipleAnimals
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
export const addMultipleAnimals = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMultipleAnimals.url(args, options),
    method: 'post',
})

addMultipleAnimals.definition = {
    methods: ["post"],
    url: '/insurance/{application}/animals/add-multiple',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultipleAnimals
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
addMultipleAnimals.url = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: args.application,
                }

    return addMultipleAnimals.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultipleAnimals
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
addMultipleAnimals.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMultipleAnimals.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultipleAnimals
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
    const addMultipleAnimalsForm = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addMultipleAnimals.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultipleAnimals
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
        addMultipleAnimalsForm.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addMultipleAnimals.url(args, options),
            method: 'post',
        })
    
    addMultipleAnimals.form = addMultipleAnimalsForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::updateAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:356
 * @route '/insurance/animal/{id}'
 */
export const updateAnimal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAnimal.url(args, options),
    method: 'put',
})

updateAnimal.definition = {
    methods: ["put"],
    url: '/insurance/animal/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::updateAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:356
 * @route '/insurance/animal/{id}'
 */
updateAnimal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateAnimal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::updateAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:356
 * @route '/insurance/animal/{id}'
 */
updateAnimal.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAnimal.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::updateAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:356
 * @route '/insurance/animal/{id}'
 */
    const updateAnimalForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAnimal.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::updateAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:356
 * @route '/insurance/animal/{id}'
 */
        updateAnimalForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAnimal.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateAnimal.form = updateAnimalForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::deleteAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:341
 * @route '/insurance/animal/{id}'
 */
export const deleteAnimal = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAnimal.url(args, options),
    method: 'delete',
})

deleteAnimal.definition = {
    methods: ["delete"],
    url: '/insurance/animal/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::deleteAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:341
 * @route '/insurance/animal/{id}'
 */
deleteAnimal.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteAnimal.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::deleteAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:341
 * @route '/insurance/animal/{id}'
 */
deleteAnimal.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAnimal.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::deleteAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:341
 * @route '/insurance/animal/{id}'
 */
    const deleteAnimalForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteAnimal.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::deleteAnimal
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:341
 * @route '/insurance/animal/{id}'
 */
        deleteAnimalForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteAnimal.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteAnimal.form = deleteAnimalForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/insurance/application/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/insurance/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
const LivestockInsuranceApplicationController = { create, store, show, addAnimal, addMultipleAnimals, updateAnimal, deleteAnimal, edit, update }

export default LivestockInsuranceApplicationController