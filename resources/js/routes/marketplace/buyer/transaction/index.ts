import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
export const cancel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/marketplace/buyer/transaction/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
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
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
cancel.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
    const cancelForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::cancel
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:738
 * @route '/marketplace/buyer/transaction/{id}/cancel'
 */
        cancelForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const transaction = {
    setup: Object.assign(setup, setup),
confirm: Object.assign(confirm, confirm),
cancel: Object.assign(cancel, cancel),
}

export default transaction