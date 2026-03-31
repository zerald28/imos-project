import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/insurance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
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
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
export const signatureEditor = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signatureEditor.url(args, options),
    method: 'get',
})

signatureEditor.definition = {
    methods: ["get","head"],
    url: '/insurance/signature/{id}/editor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return signatureEditor.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signatureEditor.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signatureEditor.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
    const signatureEditorForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signatureEditor.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
        signatureEditorForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signatureEditor.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
        signatureEditorForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signatureEditor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signatureEditor.form = signatureEditorForm
const insurance = {
    index: Object.assign(index, index),
signatureEditor: Object.assign(signatureEditor, signatureEditor),
}

export default insurance