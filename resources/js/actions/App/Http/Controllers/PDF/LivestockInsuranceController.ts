import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
export const previewPdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewPdf.url(args, options),
    method: 'get',
})

previewPdf.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
previewPdf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return previewPdf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
previewPdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
previewPdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
    const previewPdfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: previewPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
        previewPdfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:45
 * @route '/insurance/{id}/pdf/preview'
 */
        previewPdfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    previewPdf.form = previewPdfForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
export const previewPdfs = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewPdfs.url(args, options),
    method: 'get',
})

previewPdfs.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/previews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previewPdfs.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return previewPdfs.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previewPdfs.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewPdfs.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
previewPdfs.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewPdfs.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
    const previewPdfsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: previewPdfs.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
        previewPdfsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewPdfs.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::previewPdfs
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:15
 * @route '/insurance/{id}/pdf/previews'
 */
        previewPdfsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewPdfs.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    previewPdfs.form = previewPdfsForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
export const downloadPdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf.url(args, options),
    method: 'get',
})

downloadPdf.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/downloads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
downloadPdf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadPdf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
downloadPdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
downloadPdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
    const downloadPdfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
        downloadPdfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::downloadPdf
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:59
 * @route '/insurance/{id}/pdf/downloads'
 */
        downloadPdfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadPdf.form = downloadPdfForm
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/downloadempty',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
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
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
    const downloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
 */
        downloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PDF\LivestockInsuranceController::download
 * @see app/Http/Controllers/PDF/LivestockInsuranceController.php:107
 * @route '/insurance/{id}/pdf/downloadempty'
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
const LivestockInsuranceController = { previewPdf, previewPdfs, downloadPdf, download, downloadreport }

export default LivestockInsuranceController