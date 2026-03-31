import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
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
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/swine-production',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::show
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:114
 * @route '/admin/swine-production'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
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
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
export const exportCSVLast6Years = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCSVLast6Years.url(options),
    method: 'get',
})

exportCSVLast6Years.definition = {
    methods: ["get","head"],
    url: '/admin/swine-production/export-last6years',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
exportCSVLast6Years.url = (options?: RouteQueryOptions) => {
    return exportCSVLast6Years.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
exportCSVLast6Years.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCSVLast6Years.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
exportCSVLast6Years.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCSVLast6Years.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
    const exportCSVLast6YearsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportCSVLast6Years.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
        exportCSVLast6YearsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCSVLast6Years.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportCSVLast6Years
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:599
 * @route '/admin/swine-production/export-last6years'
 */
        exportCSVLast6YearsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCSVLast6Years.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportCSVLast6Years.form = exportCSVLast6YearsForm
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
export const exportForecast = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportForecast.url(options),
    method: 'get',
})

exportForecast.definition = {
    methods: ["get","head"],
    url: '/swine/production/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportForecast.url = (options?: RouteQueryOptions) => {
    return exportForecast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportForecast.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportForecast.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
exportForecast.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportForecast.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
    const exportForecastForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportForecast.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
        exportForecastForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportForecast.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::exportForecast
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:469
 * @route '/swine/production/export'
 */
        exportForecastForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportForecast.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportForecast.form = exportForecastForm
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
const DashboardController = { index, show, exportbreed, exportCSVLast6Years, exportForecast, exportCSV }

export default DashboardController