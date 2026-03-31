import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
export const livestocks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: livestocks.url(args, options),
    method: 'get',
})

livestocks.definition = {
    methods: ["get","head"],
    url: '/insurance/farmer/livestocks/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
livestocks.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return livestocks.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
livestocks.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: livestocks.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
livestocks.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: livestocks.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
    const livestocksForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: livestocks.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
        livestocksForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: livestocks.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::livestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
        livestocksForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: livestocks.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    livestocks.form = livestocksForm
const farmer = {
    livestocks: Object.assign(livestocks, livestocks),
}

export default farmer