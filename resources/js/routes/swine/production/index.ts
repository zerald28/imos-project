import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
export const exportbreed = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportbreed.url(options),
    method: 'get',
})

exportbreed.definition = {
    methods: ["get","head"],
    url: '/admin/swine-production/exportbreed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
exportbreed.url = (options?: RouteQueryOptions) => {
    return exportbreed.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
exportbreed.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportbreed.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
exportbreed.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportbreed.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
    const exportbreedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportbreed.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
        exportbreedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportbreed.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportbreed
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:542
 * @route '/admin/swine-production/exportbreed'
 */
        exportbreedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportbreed.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportbreed.form = exportbreedForm
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
export const export6years = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: export6years.url(options),
    method: 'get',
})

export6years.definition = {
    methods: ["get","head"],
    url: '/admin/swine-production/export-last6years',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
export6years.url = (options?: RouteQueryOptions) => {
    return export6years.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
export6years.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: export6years.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
export6years.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: export6years.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
    const export6yearsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: export6years.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
        export6yearsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: export6years.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::export6years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
        export6yearsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: export6years.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    export6years.form = export6yearsForm
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/swine/production/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportMethod
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
export const exportCSV = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCSV.url(options),
    method: 'get',
})

exportCSV.definition = {
    methods: ["get","head"],
    url: '/swine/production/exportcsv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
exportCSV.url = (options?: RouteQueryOptions) => {
    return exportCSV.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
exportCSV.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCSV.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
exportCSV.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCSV.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
    const exportCSVForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportCSV.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
        exportCSVForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCSV.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSV
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:649
 * @route '/swine/production/exportcsv'
 */
        exportCSVForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCSV.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportCSV.form = exportCSVForm
const production = {
    exportbreed: Object.assign(exportbreed, exportbreed),
export6years: Object.assign(export6years, export6years),
export: Object.assign(exportMethod, exportMethod),
exportCSV: Object.assign(exportCSV, exportCSV),
}

export default production