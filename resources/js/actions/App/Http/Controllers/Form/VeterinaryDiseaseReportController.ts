import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/insurance/veterinary-form',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::index
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:85
 * @route '/insurance/veterinary-form'
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
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
export const indexPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPage.url(options),
    method: 'get',
})

indexPage.definition = {
    methods: ["get","head"],
    url: '/veterinary/farmers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.url = (options?: RouteQueryOptions) => {
    return indexPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexPage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
    const indexPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexPage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
        indexPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
        indexPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexPage.form = indexPageForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
export const apiList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiList.url(options),
    method: 'get',
})

apiList.definition = {
    methods: ["get","head"],
    url: '/api/insurance/farmers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
apiList.url = (options?: RouteQueryOptions) => {
    return apiList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
apiList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiList.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
apiList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiList.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
    const apiListForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: apiList.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
        apiListForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiList.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::apiList
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:25
 * @route '/api/insurance/farmers/list'
 */
        apiListForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiList.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    apiList.form = apiListForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
export const showLivestocks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLivestocks.url(args, options),
    method: 'get',
})

showLivestocks.definition = {
    methods: ["get","head"],
    url: '/insurance/farmer/livestocks/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
showLivestocks.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showLivestocks.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
showLivestocks.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLivestocks.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
showLivestocks.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLivestocks.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
    const showLivestocksForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLivestocks.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
        showLivestocksForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLivestocks.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::showLivestocks
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:671
 * @route '/insurance/farmer/livestocks/{id}'
 */
        showLivestocksForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLivestocks.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLivestocks.form = showLivestocksForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
export const viewAnimalReport = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewAnimalReport.url(args, options),
    method: 'get',
})

viewAnimalReport.definition = {
    methods: ["get","head"],
    url: '/veterinary-disease-report/{report}/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
viewAnimalReport.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return viewAnimalReport.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
viewAnimalReport.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewAnimalReport.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
viewAnimalReport.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewAnimalReport.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
    const viewAnimalReportForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewAnimalReport.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
        viewAnimalReportForm.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewAnimalReport.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::viewAnimalReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:816
 * @route '/veterinary-disease-report/{report}/view'
 */
        viewAnimalReportForm.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewAnimalReport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewAnimalReport.form = viewAnimalReportForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
export const allVeterinaryReports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVeterinaryReports.url(options),
    method: 'get',
})

allVeterinaryReports.definition = {
    methods: ["get","head"],
    url: '/veterinary-reports/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
allVeterinaryReports.url = (options?: RouteQueryOptions) => {
    return allVeterinaryReports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
allVeterinaryReports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allVeterinaryReports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
allVeterinaryReports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allVeterinaryReports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
    const allVeterinaryReportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: allVeterinaryReports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
        allVeterinaryReportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allVeterinaryReports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::allVeterinaryReports
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:312
 * @route '/veterinary-reports/all'
 */
        allVeterinaryReportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allVeterinaryReports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    allVeterinaryReports.form = allVeterinaryReportsForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::detachReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:746
 * @route '/veterinary-report/detach/{animalId}'
 */
export const detachReport = (args: { animalId: string | number } | [animalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachReport.url(args, options),
    method: 'delete',
})

detachReport.definition = {
    methods: ["delete"],
    url: '/veterinary-report/detach/{animalId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::detachReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:746
 * @route '/veterinary-report/detach/{animalId}'
 */
detachReport.url = (args: { animalId: string | number } | [animalId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animalId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    animalId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        animalId: args.animalId,
                }

    return detachReport.definition.url
            .replace('{animalId}', parsedArgs.animalId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::detachReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:746
 * @route '/veterinary-report/detach/{animalId}'
 */
detachReport.delete = (args: { animalId: string | number } | [animalId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachReport.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::detachReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:746
 * @route '/veterinary-report/detach/{animalId}'
 */
    const detachReportForm = (args: { animalId: string | number } | [animalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detachReport.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::detachReport
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:746
 * @route '/veterinary-report/detach/{animalId}'
 */
        detachReportForm.delete = (args: { animalId: string | number } | [animalId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detachReport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    detachReport.form = detachReportForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
export const getFarmerAnimals = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFarmerAnimals.url(args, options),
    method: 'get',
})

getFarmerAnimals.definition = {
    methods: ["get","head"],
    url: '/api/farmer/{farmerId}/animals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
getFarmerAnimals.url = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { farmerId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    farmerId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        farmerId: args.farmerId,
                }

    return getFarmerAnimals.definition.url
            .replace('{farmerId}', parsedArgs.farmerId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
getFarmerAnimals.get = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getFarmerAnimals.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
getFarmerAnimals.head = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getFarmerAnimals.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
    const getFarmerAnimalsForm = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getFarmerAnimals.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
        getFarmerAnimalsForm.get = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFarmerAnimals.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::getFarmerAnimals
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:73
 * @route '/api/farmer/{farmerId}/animals'
 */
        getFarmerAnimalsForm.head = (args: { farmerId: string | number } | [farmerId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getFarmerAnimals.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getFarmerAnimals.form = getFarmerAnimalsForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
export const generatePdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generatePdf.url(args, options),
    method: 'get',
})

generatePdf.definition = {
    methods: ["get","head"],
    url: '/vetpdf/download/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
generatePdf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return generatePdf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
generatePdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generatePdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
generatePdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generatePdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
    const generatePdfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generatePdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
        generatePdfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generatePdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::generatePdf
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/vetpdf/download/{id}'
 */
        generatePdfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generatePdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generatePdf.form = generatePdfForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
export const indexPages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPages.url(options),
    method: 'get',
})

indexPages.definition = {
    methods: ["get","head"],
    url: '/veterinary/farmer/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.url = (options?: RouteQueryOptions) => {
    return indexPages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexPages.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
    const indexPagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexPages.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
        indexPagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPages.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
        indexPagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexPages.form = indexPagesForm
const VeterinaryDiseaseReportController = { edit, update, store, index, indexPage, apiList, showLivestocks, viewAnimalReport, allVeterinaryReports, detachReport, getFarmerAnimals, generatePdf, indexPages }

export default VeterinaryDiseaseReportController