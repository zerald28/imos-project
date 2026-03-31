import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
export const complete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
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
 * @route '/marketplace/transaction/{id}/complete'
 */
complete.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
    const completeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::complete
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:199
 * @route '/marketplace/transaction/{id}/complete'
 */
        completeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
export const updateWeight = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight.url(args, options),
    method: 'post',
})

updateWeight.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/updateWeight/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
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
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
updateWeight.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateWeight.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
    const updateWeightForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateWeight.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::updateWeight
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:176
 * @route '/marketplace/transaction/updateWeight/{id}'
 */
        updateWeightForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateWeight.url(args, options),
            method: 'post',
        })
    
    updateWeight.form = updateWeightForm
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
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
export const addSwine = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSwine.url(args, options),
    method: 'post',
})

addSwine.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/add-swine',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
addSwine.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return addSwine.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
addSwine.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSwine.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
    const addSwineForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addSwine.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::addSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:229
 * @route '/marketplace/transactions/{transaction}/add-swine'
 */
        addSwineForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addSwine.url(args, options),
            method: 'post',
        })
    
    addSwine.form = addSwineForm
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
export const removeSwine = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSwine.url(args, options),
    method: 'post',
})

removeSwine.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/remove-swine',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
removeSwine.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return removeSwine.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
removeSwine.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSwine.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
    const removeSwineForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeSwine.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::removeSwine
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:333
 * @route '/marketplace/transactions/{transaction}/remove-swine'
 */
        removeSwineForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeSwine.url(args, options),
            method: 'post',
        })
    
    removeSwine.form = removeSwineForm
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
export const cancel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
cancel.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
cancel.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
    const cancelForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/transaction/{id}/cancel'
 */
        cancelForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
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
/**
* @see \App\Http\Controllers\FarmerRatingController::rate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
export const rate = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rate.url(args, options),
    method: 'post',
})

rate.definition = {
    methods: ["post"],
    url: '/marketplace/transactions/{transaction}/rate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FarmerRatingController::rate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
rate.url = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transaction: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return rate.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FarmerRatingController::rate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
rate.post = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FarmerRatingController::rate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
    const rateForm = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FarmerRatingController::rate
 * @see app/Http/Controllers/FarmerRatingController.php:17
 * @route '/marketplace/transactions/{transaction}/rate'
 */
        rateForm.post = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rate.url(args, options),
            method: 'post',
        })
    
    rate.form = rateForm
/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
export const getRating = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRating.url(args, options),
    method: 'get',
})

getRating.definition = {
    methods: ["get","head"],
    url: '/marketplace/transactions/{transaction}/rating',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.url = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { transaction: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transaction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return getRating.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRating.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
getRating.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRating.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
    const getRatingForm = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRating.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
        getRatingForm.get = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRating.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FarmerRatingController::getRating
 * @see app/Http/Controllers/FarmerRatingController.php:121
 * @route '/marketplace/transactions/{transaction}/rating'
 */
        getRatingForm.head = (args: { transaction: number | { id: number } } | [transaction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRating.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRating.form = getRatingForm
const transaction = {
    setup: Object.assign(setup, setup),
approve: Object.assign(approve, approve),
complete: Object.assign(complete, complete),
updateWeight: Object.assign(updateWeight, updateWeight),
updateFinalAmount: Object.assign(updateFinalAmount, updateFinalAmount),
updatePrice: Object.assign(updatePrice, updatePrice),
addSwine: Object.assign(addSwine, addSwine),
removeSwine: Object.assign(removeSwine, removeSwine),
receipt: Object.assign(receipt, receipt),
cancel: Object.assign(cancel, cancel),
delete: Object.assign(deleteMethod, deleteMethod),
markAsDone: Object.assign(markAsDone, markAsDone),
rate: Object.assign(rate, rate),
getRating: Object.assign(getRating, getRating),
}

export default transaction