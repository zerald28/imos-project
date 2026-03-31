import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
export const save = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/insurance/signature/{application}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
save.url = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { application: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: typeof args.application === 'object'
                ? args.application.id
                : args.application,
                }

    return save.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
save.post = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
    const saveForm = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
        saveForm.post = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(args, options),
            method: 'post',
        })
    
    save.form = saveForm
const signatureaplication = {
    save: Object.assign(save, save),
}

export default signatureaplication