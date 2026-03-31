import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/swine-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
export const financialPerformance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financialPerformance.url(options),
    method: 'get',
})

financialPerformance.definition = {
    methods: ["get","head"],
    url: '/swine-management/financial-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.url = (options?: RouteQueryOptions) => {
    return financialPerformance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financialPerformance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: financialPerformance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
    const financialPerformanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: financialPerformance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
        financialPerformanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financialPerformance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
        financialPerformanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financialPerformance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    financialPerformance.form = financialPerformanceForm
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
const index8179097990824cfb14af66ff35851133 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8179097990824cfb14af66ff35851133.url(options),
    method: 'get',
})

index8179097990824cfb14af66ff35851133.definition = {
    methods: ["get","head"],
    url: '/swine-management/swine',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index8179097990824cfb14af66ff35851133.url = (options?: RouteQueryOptions) => {
    return index8179097990824cfb14af66ff35851133.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index8179097990824cfb14af66ff35851133.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8179097990824cfb14af66ff35851133.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
index8179097990824cfb14af66ff35851133.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8179097990824cfb14af66ff35851133.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
    const index8179097990824cfb14af66ff35851133Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index8179097990824cfb14af66ff35851133.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
        index8179097990824cfb14af66ff35851133Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8179097990824cfb14af66ff35851133.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/swine-management/swine'
 */
        index8179097990824cfb14af66ff35851133Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8179097990824cfb14af66ff35851133.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index8179097990824cfb14af66ff35851133.form = index8179097990824cfb14af66ff35851133Form
    /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
const index62d2466245159d7cea3e522db6f15af6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index62d2466245159d7cea3e522db6f15af6.url(options),
    method: 'get',
})

index62d2466245159d7cea3e522db6f15af6.definition = {
    methods: ["get","head"],
    url: '/my-swine',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index62d2466245159d7cea3e522db6f15af6.url = (options?: RouteQueryOptions) => {
    return index62d2466245159d7cea3e522db6f15af6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index62d2466245159d7cea3e522db6f15af6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index62d2466245159d7cea3e522db6f15af6.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index62d2466245159d7cea3e522db6f15af6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index62d2466245159d7cea3e522db6f15af6.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
    const index62d2466245159d7cea3e522db6f15af6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index62d2466245159d7cea3e522db6f15af6.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
        index62d2466245159d7cea3e522db6f15af6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index62d2466245159d7cea3e522db6f15af6.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
        index62d2466245159d7cea3e522db6f15af6Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index62d2466245159d7cea3e522db6f15af6.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index62d2466245159d7cea3e522db6f15af6.form = index62d2466245159d7cea3e522db6f15af6Form

export const index = {
    '/swine-management/swine': index8179097990824cfb14af66ff35851133,
    '/my-swine': index62d2466245159d7cea3e522db6f15af6,
}

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
* @see \App\Http\Controllers\Swine\SwineController::updateListingSwine
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
export const updateListingSwine = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateListingSwine.url(args, options),
    method: 'put',
})

updateListingSwine.definition = {
    methods: ["put"],
    url: '/swine/{swine_id}/listing/{listing_id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::updateListingSwine
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
updateListingSwine.url = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    swine_id: args[0],
                    listing_id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine_id: args.swine_id,
                                listing_id: args.listing_id,
                }

    return updateListingSwine.definition.url
            .replace('{swine_id}', parsedArgs.swine_id.toString())
            .replace('{listing_id}', parsedArgs.listing_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::updateListingSwine
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
updateListingSwine.put = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateListingSwine.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::updateListingSwine
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
    const updateListingSwineForm = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateListingSwine.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::updateListingSwine
 * @see app/Http/Controllers/Swine/SwineController.php:445
 * @route '/swine/{swine_id}/listing/{listing_id}'
 */
        updateListingSwineForm.put = (args: { swine_id: string | number, listing_id: string | number } | [swine_id: string | number, listing_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateListingSwine.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateListingSwine.form = updateListingSwineForm
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
const SwineController = { dashboard, financialPerformance, multidelete, index, create, store, edit, update, destroy, updateListingSwine, show, update_swine, bulkDelete }

export default SwineController