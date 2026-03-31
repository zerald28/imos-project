import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
export const preview = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
preview.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
preview.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
preview.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
    const previewForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: preview.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
        previewForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::preview
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
        previewForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    preview.form = previewForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
export const previews = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previews.url(args, options),
    method: 'get',
})

previews.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/previews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previews.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return previews.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previews.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previews.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previews.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previews.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
    const previewsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: previews.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
        previewsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previews.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previews
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
        previewsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previews.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    previews.form = previewsForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/downloads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
download.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
    const downloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
        downloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
        downloadForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
export const downloadempty = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadempty.url(args, options),
    method: 'get',
})

downloadempty.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/downloadempty',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
downloadempty.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadempty.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
downloadempty.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadempty.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
downloadempty.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadempty.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
    const downloademptyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadempty.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
        downloademptyForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadempty.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadempty
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
        downloademptyForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadempty.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadempty.form = downloademptyForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
export const downloadreport = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadreport.url(args, options),
    method: 'get',
})

downloadreport.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/downloadreport',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
downloadreport.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadreport.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
downloadreport.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadreport.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
downloadreport.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadreport.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
    const downloadreportForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadreport.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
        downloadreportForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadreport.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadreport
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:77
 * @route '/insurance/{id}/pdf/downloadreport'
 */
        downloadreportForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadreport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadreport.form = downloadreportForm
const pdf = {
    preview: Object.assign(preview, preview),
previews: Object.assign(previews, previews),
download: Object.assign(download, download),
downloadempty: Object.assign(downloadempty, downloadempty),
downloadreport: Object.assign(downloadreport, downloadreport),
}

export default pdf