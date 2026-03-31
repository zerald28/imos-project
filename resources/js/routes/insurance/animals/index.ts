import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultiple
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
export const addMultiple = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMultiple.url(args, options),
    method: 'post',
})

addMultiple.definition = {
    methods: ["post"],
    url: '/insurance/{application}/animals/add-multiple',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultiple
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
addMultiple.url = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return addMultiple.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultiple
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
addMultiple.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addMultiple.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultiple
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
    const addMultipleForm = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addMultiple.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::addMultiple
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:274
 * @route '/insurance/{application}/animals/add-multiple'
 */
        addMultipleForm.post = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addMultiple.url(args, options),
            method: 'post',
        })
    
    addMultiple.form = addMultipleForm
const animals = {
    addMultiple: Object.assign(addMultiple, addMultiple),
}

export default animals