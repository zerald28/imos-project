import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import transaction from './transaction'
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
export const transactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/marketplace/buyer/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
transactions.url = (options?: RouteQueryOptions) => {
    return transactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
transactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
transactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
    const transactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
        transactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::transactions
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:683
 * @route '/marketplace/buyer/transactions'
 */
        transactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transactions.form = transactionsForm
const buyer = {
    transactions: Object.assign(transactions, transactions),
transaction: Object.assign(transaction, transaction),
}

export default buyer