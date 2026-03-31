import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import pdf from './pdf'
import veterinary from './veterinary'
import farmer from './farmer'
import signature from './signature'
import signatureaplication from './signatureaplication'
import application from './application'
import animals from './animals'
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/insurance/application/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::edit
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:377
 * @route '/insurance/application/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/insurance/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::update
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:405
 * @route '/insurance/{id}'
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
const insurance = {
    pdf: Object.assign(pdf, pdf),
veterinary: Object.assign(veterinary, veterinary),
farmer: Object.assign(farmer, farmer),
signature: Object.assign(signature, signature),
signatureaplication: Object.assign(signatureaplication, signatureaplication),
application: Object.assign(application, application),
animals: Object.assign(animals, animals),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default insurance