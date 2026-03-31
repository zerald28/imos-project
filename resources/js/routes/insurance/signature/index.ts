import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
export const save = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/insurance/signature/{id}/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
save.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return save.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
save.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
    const saveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
        saveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(args, options),
            method: 'post',
        })
    
    save.form = saveForm
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saves
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
export const saves = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saves.url(args, options),
    method: 'post',
})

saves.definition = {
    methods: ["post"],
    url: '/insurance/signature/{id}/saves',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saves
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
saves.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return saves.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saves
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
saves.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saves.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saves
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
    const savesForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saves.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saves
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
        savesForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saves.url(args, options),
            method: 'post',
        })
    
    saves.form = savesForm
const signature = {
    save: Object.assign(save, save),
saves: Object.assign(saves, saves),
}

export default signature