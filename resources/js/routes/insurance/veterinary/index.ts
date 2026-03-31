import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import reports from './reports'
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
export const form = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(options),
    method: 'get',
})

form.definition = {
    methods: ["get","head"],
    url: '/insurance/veterinary-form',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
form.url = (options?: RouteQueryOptions) => {
    return form.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
form.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: form.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
form.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: form.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
    const formForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: form.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
        formForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: form.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::form
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
        formForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: form.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    form.form = formForm
const veterinary = {
    form: Object.assign(form, form),
reports: Object.assign(reports, reports),
}

export default veterinary