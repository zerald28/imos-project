import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/swine-groups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
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
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/swine-groups',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attachSwine
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
export const attachSwine = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachSwine.url(options),
    method: 'post',
})

attachSwine.definition = {
    methods: ["post"],
    url: '/swine-groups/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attachSwine
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
attachSwine.url = (options?: RouteQueryOptions) => {
    return attachSwine.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attachSwine
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
attachSwine.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachSwine.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::attachSwine
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
    const attachSwineForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: attachSwine.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::attachSwine
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
        attachSwineForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: attachSwine.url(options),
            method: 'post',
        })
    
    attachSwine.form = attachSwineForm
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
* @see \App\Http\Controllers\Swine\SwineGroupController::update
 * @see app/Http/Controllers/Swine/SwineGroupController.php:136
 * @route '/swine/groups/{group}'
 */
export const update = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/swine/groups/{group}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::update
 * @see app/Http/Controllers/Swine/SwineGroupController.php:136
 * @route '/swine/groups/{group}'
 */
update.url = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { group: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { group: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    group: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        group: typeof args.group === 'object'
                ? args.group.id
                : args.group,
                }

    return update.definition.url
            .replace('{group}', parsedArgs.group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::update
 * @see app/Http/Controllers/Swine/SwineGroupController.php:136
 * @route '/swine/groups/{group}'
 */
update.put = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::update
 * @see app/Http/Controllers/Swine/SwineGroupController.php:136
 * @route '/swine/groups/{group}'
 */
    const updateForm = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::update
 * @see app/Http/Controllers/Swine/SwineGroupController.php:136
 * @route '/swine/groups/{group}'
 */
        updateForm.put = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:157
 * @route '/swine/groups/{group}'
 */
export const destroy = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/swine/groups/{group}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:157
 * @route '/swine/groups/{group}'
 */
destroy.url = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { group: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { group: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    group: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        group: typeof args.group === 'object'
                ? args.group.id
                : args.group,
                }

    return destroy.definition.url
            .replace('{group}', parsedArgs.group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:157
 * @route '/swine/groups/{group}'
 */
destroy.delete = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:157
 * @route '/swine/groups/{group}'
 */
    const destroyForm = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:157
 * @route '/swine/groups/{group}'
 */
        destroyForm.delete = (args: { group: number | { id: number } } | [group: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Swine\SwineGroupController::removeMember
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
export const removeMember = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

removeMember.definition = {
    methods: ["delete"],
    url: '/swines/groups/{group}/members/{swine}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::removeMember
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
removeMember.url = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    group: args[0],
                    swine: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        group: args.group,
                                swine: args.swine,
                }

    return removeMember.definition.url
            .replace('{group}', parsedArgs.group.toString())
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::removeMember
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
removeMember.delete = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::removeMember
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
    const removeMemberForm = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeMember.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::removeMember
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
        removeMemberForm.delete = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeMember.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeMember.form = removeMemberForm
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
export const assign = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/swine/{swine}/assign-group',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
assign.url = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assign.definition.url
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
assign.post = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
    const assignForm = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
        assignForm.post = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
const SwineGroupController = { index, store, attachSwine, bulkAssign, update, destroy, removeMember, assign }

export default SwineGroupController