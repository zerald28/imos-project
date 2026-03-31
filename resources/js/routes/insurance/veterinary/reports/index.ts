import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/veterinary-reports/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
    const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: all.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
        allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::all
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
        allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    all.form = allForm
const reports = {
    all: Object.assign(all, all),
}

export default reports