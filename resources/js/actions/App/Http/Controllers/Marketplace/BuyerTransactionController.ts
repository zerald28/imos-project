import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updateFinalAmount
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:203
 * @route '/marketplace/transaction/update-final-amount/{listingSwineId}'
 */
export const updateFinalAmount = (args: { listingSwineId: string | number } | [listingSwineId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFinalAmount.url(args, options),
    method: 'post',
})

updateFinalAmount.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/update-final-amount/{listingSwineId}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updateFinalAmount
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:203
 * @route '/marketplace/transaction/update-final-amount/{listingSwineId}'
 */
updateFinalAmount.url = (args: { listingSwineId: string | number } | [listingSwineId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { listingSwineId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    listingSwineId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listingSwineId: args.listingSwineId,
                }

    return updateFinalAmount.definition.url
            .replace('{listingSwineId}', parsedArgs.listingSwineId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updateFinalAmount
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:203
 * @route '/marketplace/transaction/update-final-amount/{listingSwineId}'
 */
updateFinalAmount.post = (args: { listingSwineId: string | number } | [listingSwineId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateFinalAmount.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updateFinalAmount
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:203
 * @route '/marketplace/transaction/update-final-amount/{listingSwineId}'
 */
    const updateFinalAmountForm = (args: { listingSwineId: string | number } | [listingSwineId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateFinalAmount.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updateFinalAmount
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:203
 * @route '/marketplace/transaction/update-final-amount/{listingSwineId}'
 */
        updateFinalAmountForm.post = (args: { listingSwineId: string | number } | [listingSwineId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateFinalAmount.url(args, options),
            method: 'post',
        })
    
    updateFinalAmount.form = updateFinalAmountForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updatePrice
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:162
 * @route '/marketplace/transactions/{transaction}/update-price'
 */
export const updatePrice = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePrice.url(args, options),
    method: 'post',
})

updatePrice.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/update-price',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updatePrice
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:162
 * @route '/marketplace/transactions/{transaction}/update-price'
 */
updatePrice.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: args.transaction,
                }

    return updatePrice.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updatePrice
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:162
 * @route '/marketplace/transactions/{transaction}/update-price'
 */
updatePrice.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePrice.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updatePrice
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:162
 * @route '/marketplace/transactions/{transaction}/update-price'
 */
    const updatePriceForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePrice.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::updatePrice
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:162
 * @route '/marketplace/transactions/{transaction}/update-price'
 */
        updatePriceForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePrice.url(args, options),
            method: 'post',
        })
    
    updatePrice.form = updatePriceForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/marketplace/buyer/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::index
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
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
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
 */
export const setup = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(args, options),
    method: 'get',
})

setup.definition = {
    methods: ["get","head"],
    url: '/marketplace/transactions/{id}/buyer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
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
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
 */
setup.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
 */
setup.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setup.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
 */
    const setupForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: setup.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
 */
        setupForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: setup.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::setup
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:25
 * @route '/marketplace/transactions/{id}/buyer'
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
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwineToTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
export const addSwineToTransaction = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSwineToTransaction.url(args, options),
    method: 'post',
})

addSwineToTransaction.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/add-swine',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwineToTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
addSwineToTransaction.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: args.transaction,
                }

    return addSwineToTransaction.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwineToTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
addSwineToTransaction.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSwineToTransaction.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwineToTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
    const addSwineToTransactionForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addSwineToTransaction.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwineToTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
        addSwineToTransactionForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addSwineToTransaction.url(args, options),
            method: 'post',
        })
    
    addSwineToTransaction.form = addSwineToTransactionForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwineFromTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
export const removeSwineFromTransaction = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSwineFromTransaction.url(args, options),
    method: 'post',
})

removeSwineFromTransaction.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/remove-swine',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwineFromTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
removeSwineFromTransaction.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: args.transaction,
                }

    return removeSwineFromTransaction.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwineFromTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
removeSwineFromTransaction.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSwineFromTransaction.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwineFromTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
    const removeSwineFromTransactionForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeSwineFromTransaction.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwineFromTransaction
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
        removeSwineFromTransactionForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeSwineFromTransaction.url(args, options),
            method: 'post',
        })
    
    removeSwineFromTransaction.form = removeSwineFromTransactionForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
export const receipt = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/marketplace/transaction/{id}/receipt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
receipt.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return receipt.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
receipt.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
receipt.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
    const receiptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
        receiptForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::receipt
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:402
 * @route '/marketplace/transaction/{id}/receipt'
 */
        receiptForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
const cancel3574713e390fedd67bdceaab72ed9570 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel3574713e390fedd67bdceaab72ed9570.url(args, options),
    method: 'post',
})

cancel3574713e390fedd67bdceaab72ed9570.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
cancel3574713e390fedd67bdceaab72ed9570.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancel3574713e390fedd67bdceaab72ed9570.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
cancel3574713e390fedd67bdceaab72ed9570.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel3574713e390fedd67bdceaab72ed9570.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
    const cancel3574713e390fedd67bdceaab72ed9570Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel3574713e390fedd67bdceaab72ed9570.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
        cancel3574713e390fedd67bdceaab72ed9570Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel3574713e390fedd67bdceaab72ed9570.url(args, options),
            method: 'post',
        })
    
    cancel3574713e390fedd67bdceaab72ed9570.form = cancel3574713e390fedd67bdceaab72ed9570Form
    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
const cancelab02bc79305f557a1bb0a4d1b0393bbb = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelab02bc79305f557a1bb0a4d1b0393bbb.url(args, options),
    method: 'post',
})

cancelab02bc79305f557a1bb0a4d1b0393bbb.definition = {
    methods: ["post"],
    url: '/marketplace/buyer/transaction/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
cancelab02bc79305f557a1bb0a4d1b0393bbb.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancelab02bc79305f557a1bb0a4d1b0393bbb.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
cancelab02bc79305f557a1bb0a4d1b0393bbb.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelab02bc79305f557a1bb0a4d1b0393bbb.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
    const cancelab02bc79305f557a1bb0a4d1b0393bbbForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelab02bc79305f557a1bb0a4d1b0393bbb.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
        cancelab02bc79305f557a1bb0a4d1b0393bbbForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelab02bc79305f557a1bb0a4d1b0393bbb.url(args, options),
            method: 'post',
        })
    
    cancelab02bc79305f557a1bb0a4d1b0393bbb.form = cancelab02bc79305f557a1bb0a4d1b0393bbbForm

export const cancel = {
    '/marketplace/transaction/{id}/cancel': cancel3574713e390fedd67bdceaab72ed9570,
    '/marketplace/buyer/transaction/{id}/cancel': cancelab02bc79305f557a1bb0a4d1b0393bbb,
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::deleteMethod
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:766
 * @route '/marketplace/transaction/{id}/delete'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/marketplace/transaction/{id}/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::deleteMethod
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:766
 * @route '/marketplace/transaction/{id}/delete'
 */
deleteMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::deleteMethod
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:766
 * @route '/marketplace/transaction/{id}/delete'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::deleteMethod
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:766
 * @route '/marketplace/transaction/{id}/delete'
 */
    const deleteMethodForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::deleteMethod
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:766
 * @route '/marketplace/transaction/{id}/delete'
 */
        deleteMethodForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::confirm
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:555
 * @route '/marketplace/buyer/transaction/{id}/confirm'
 */
export const confirm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/marketplace/buyer/transaction/{id}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::confirm
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:555
 * @route '/marketplace/buyer/transaction/{id}/confirm'
 */
confirm.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return confirm.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::confirm
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:555
 * @route '/marketplace/buyer/transaction/{id}/confirm'
 */
confirm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::confirm
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:555
 * @route '/marketplace/buyer/transaction/{id}/confirm'
 */
    const confirmForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::confirm
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:555
 * @route '/marketplace/buyer/transaction/{id}/confirm'
 */
        confirmForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeByBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
export const completeByBuyer = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeByBuyer.url(args, options),
    method: 'post',
})

completeByBuyer.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/complete-buyer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeByBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
completeByBuyer.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeByBuyer.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeByBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
completeByBuyer.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeByBuyer.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeByBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
    const completeByBuyerForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeByBuyer.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeByBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
        completeByBuyerForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeByBuyer.url(args, options),
            method: 'post',
        })
    
    completeByBuyer.form = completeByBuyerForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::markAsDone
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:779
 * @route '/marketplace/transaction/{transaction}/mark-as-done'
 */
export const markAsDone = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsDone.url(args, options),
    method: 'post',
})

markAsDone.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{transaction}/mark-as-done',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::markAsDone
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:779
 * @route '/marketplace/transaction/{transaction}/mark-as-done'
 */
markAsDone.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: args.transaction,
                }

    return markAsDone.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::markAsDone
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:779
 * @route '/marketplace/transaction/{transaction}/mark-as-done'
 */
markAsDone.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsDone.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::markAsDone
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:779
 * @route '/marketplace/transaction/{transaction}/mark-as-done'
 */
    const markAsDoneForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAsDone.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::markAsDone
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:779
 * @route '/marketplace/transaction/{transaction}/mark-as-done'
 */
        markAsDoneForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAsDone.url(args, options),
            method: 'post',
        })
    
    markAsDone.form = markAsDoneForm
const BuyerTransactionController = { updateFinalAmount, updatePrice, index, setup, addSwineToTransaction, removeSwineFromTransaction, receipt, cancel, deleteMethod, confirm, completeByBuyer, markAsDone, delete: deleteMethod }

export default BuyerTransactionController