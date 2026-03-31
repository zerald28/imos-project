import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::update
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:384
 * @route '/veterinary-disease-report/update/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/veterinary-disease-report/update/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::update
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:384
 * @route '/veterinary-disease-report/update/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::update
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:384
 * @route '/veterinary-disease-report/update/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::update
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:384
 * @route '/veterinary-disease-report/update/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::update
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:384
 * @route '/veterinary-disease-report/update/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const veterinaryDiseaseReport = {
    update: Object.assign(update, update),
}

export default veterinaryDiseaseReport