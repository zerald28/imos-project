import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/veterinary-disease-report/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
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
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::edit
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:370
 * @route '/veterinary-disease-report/{id}/edit'
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
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::store
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:144
 * @route '/veterinary-disease-report/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/veterinary-disease-report/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::store
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:144
 * @route '/veterinary-disease-report/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::store
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:144
 * @route '/veterinary-disease-report/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::store
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:144
 * @route '/veterinary-disease-report/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::store
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:144
 * @route '/veterinary-disease-report/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
export const view = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/veterinary-disease-report/{report}/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
view.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { report: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: typeof args.report === 'object'
                ? args.report.id
                : args.report,
                }

    return view.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
view.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
view.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
    const viewForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
        viewForm.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::view
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
        viewForm.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
const report = {
    edit: Object.assign(edit, edit),
store: Object.assign(store, store),
view: Object.assign(view, view),
}

export default report