import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
export const setup = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(args, options),
    method: 'get',
})

setup.definition = {
    methods: ["get","head"],
    url: '/marketplace/transaction/{id}/setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
setup.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return setup.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
setup.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
setup.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setup.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
    const setupForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: setup.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
        setupForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: setup.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:23
 * @route '/marketplace/transaction/{id}/setup'
 */
        setupForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: setup.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    setup.form = setupForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::approve
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:151
 * @route '/marketplace/transaction/{id}/approve'
 */
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::approve
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:151
 * @route '/marketplace/transaction/{id}/approve'
 */
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::approve
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:151
 * @route '/marketplace/transaction/{id}/approve'
 */
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::approve
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:151
 * @route '/marketplace/transaction/{id}/approve'
 */
    const approveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::approve
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:151
 * @route '/marketplace/transaction/{id}/approve'
 */
        approveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
const completeTransaction59a2f04d4491134c741bf1be2d0b5c82 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeTransaction59a2f04d4491134c741bf1be2d0b5c82.url(args, options),
    method: 'post',
})

completeTransaction59a2f04d4491134c741bf1be2d0b5c82.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
completeTransaction59a2f04d4491134c741bf1be2d0b5c82.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeTransaction59a2f04d4491134c741bf1be2d0b5c82.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
completeTransaction59a2f04d4491134c741bf1be2d0b5c82.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeTransaction59a2f04d4491134c741bf1be2d0b5c82.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
    const completeTransaction59a2f04d4491134c741bf1be2d0b5c82Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeTransaction59a2f04d4491134c741bf1be2d0b5c82.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
        completeTransaction59a2f04d4491134c741bf1be2d0b5c82Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeTransaction59a2f04d4491134c741bf1be2d0b5c82.url(args, options),
            method: 'post',
        })
    
    completeTransaction59a2f04d4491134c741bf1be2d0b5c82.form = completeTransaction59a2f04d4491134c741bf1be2d0b5c82Form
    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
const completeTransactione262aa9da549cf635e5e7c385cb50414 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeTransactione262aa9da549cf635e5e7c385cb50414.url(args, options),
    method: 'post',
})

completeTransactione262aa9da549cf635e5e7c385cb50414.definition = {
    methods: ["post"],
    url: '/marketplace/seller/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
completeTransactione262aa9da549cf635e5e7c385cb50414.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeTransactione262aa9da549cf635e5e7c385cb50414.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
completeTransactione262aa9da549cf635e5e7c385cb50414.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeTransactione262aa9da549cf635e5e7c385cb50414.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
    const completeTransactione262aa9da549cf635e5e7c385cb50414Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeTransactione262aa9da549cf635e5e7c385cb50414.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::completeTransaction
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/seller/{id}/complete'
 */
        completeTransactione262aa9da549cf635e5e7c385cb50414Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeTransactione262aa9da549cf635e5e7c385cb50414.url(args, options),
            method: 'post',
        })
    
    completeTransactione262aa9da549cf635e5e7c385cb50414.form = completeTransactione262aa9da549cf635e5e7c385cb50414Form

export const completeTransaction = {
    '/marketplace/transaction/{id}/complete': completeTransaction59a2f04d4491134c741bf1be2d0b5c82,
    '/marketplace/seller/{id}/complete': completeTransactione262aa9da549cf635e5e7c385cb50414,
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
const updateWeight68be5ad30fa633e43dbeaee55bdac91f = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight68be5ad30fa633e43dbeaee55bdac91f.url(args, options),
    method: 'post',
})

updateWeight68be5ad30fa633e43dbeaee55bdac91f.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/updateWeight/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
updateWeight68be5ad30fa633e43dbeaee55bdac91f.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateWeight68be5ad30fa633e43dbeaee55bdac91f.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
updateWeight68be5ad30fa633e43dbeaee55bdac91f.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight68be5ad30fa633e43dbeaee55bdac91f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
    const updateWeight68be5ad30fa633e43dbeaee55bdac91fForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateWeight68be5ad30fa633e43dbeaee55bdac91f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
        updateWeight68be5ad30fa633e43dbeaee55bdac91fForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateWeight68be5ad30fa633e43dbeaee55bdac91f.url(args, options),
            method: 'post',
        })
    
    updateWeight68be5ad30fa633e43dbeaee55bdac91f.form = updateWeight68be5ad30fa633e43dbeaee55bdac91fForm
    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
const updateWeightc13cf66c9bfdd7dbe3870365b486a348 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeightc13cf66c9bfdd7dbe3870365b486a348.url(args, options),
    method: 'post',
})

updateWeightc13cf66c9bfdd7dbe3870365b486a348.definition = {
    methods: ["post"],
    url: '/marketplace/seller/weight/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
updateWeightc13cf66c9bfdd7dbe3870365b486a348.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateWeightc13cf66c9bfdd7dbe3870365b486a348.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
updateWeightc13cf66c9bfdd7dbe3870365b486a348.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeightc13cf66c9bfdd7dbe3870365b486a348.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
    const updateWeightc13cf66c9bfdd7dbe3870365b486a348Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateWeightc13cf66c9bfdd7dbe3870365b486a348.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/seller/weight/{id}'
 */
        updateWeightc13cf66c9bfdd7dbe3870365b486a348Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateWeightc13cf66c9bfdd7dbe3870365b486a348.url(args, options),
            method: 'post',
        })
    
    updateWeightc13cf66c9bfdd7dbe3870365b486a348.form = updateWeightc13cf66c9bfdd7dbe3870365b486a348Form

export const updateWeight = {
    '/marketplace/transaction/updateWeight/{id}': updateWeight68be5ad30fa633e43dbeaee55bdac91f,
    '/marketplace/seller/weight/{id}': updateWeightc13cf66c9bfdd7dbe3870365b486a348,
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
export const activityLog = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityLog.url(options),
    method: 'get',
})

activityLog.definition = {
    methods: ["get","head"],
    url: '/swine-management/activity-log',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.url = (options?: RouteQueryOptions) => {
    return activityLog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityLog.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activityLog.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
    const activityLogForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: activityLog.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
        activityLogForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activityLog.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
        activityLogForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activityLog.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    activityLog.form = activityLogForm
const SellerTransactionController = { setup, approve, completeTransaction, updateWeight, activityLog }

export default SellerTransactionController