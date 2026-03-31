import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
export const completeBuyer = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeBuyer.url(args, options),
    method: 'post',
})

completeBuyer.definition = {
    methods: ["post"],
    url: '/marketplace/transaction/{id}/complete-buyer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
completeBuyer.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return completeBuyer.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
completeBuyer.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeBuyer.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
    const completeBuyerForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeBuyer.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\BuyerTransactionController::completeBuyer
 * @see app/Http/Controllers/Marketplace/BuyerTransactionController.php:0
 * @route '/marketplace/transaction/{id}/complete-buyer'
 */
        completeBuyerForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeBuyer.url(args, options),
            method: 'post',
        })
    
    completeBuyer.form = completeBuyerForm
const transaction = {
    completeBuyer: Object.assign(completeBuyer, completeBuyer),
}

export default transaction