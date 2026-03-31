import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
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
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
export const showWithData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showWithData.url(options),
    method: 'get',
})

showWithData.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/sample',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
showWithData.url = (options?: RouteQueryOptions) => {
    return showWithData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
showWithData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showWithData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
showWithData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showWithData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
    const showWithDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showWithData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
        showWithDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showWithData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showWithData
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
        showWithDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showWithData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showWithData.form = showWithDataForm
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
    const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
        downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
        downloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
export const showMultiple = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showMultiple.url(options),
    method: 'get',
})

showMultiple.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/multiple',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
showMultiple.url = (options?: RouteQueryOptions) => {
    return showMultiple.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
showMultiple.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showMultiple.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
showMultiple.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showMultiple.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
    const showMultipleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showMultiple.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
        showMultipleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showMultiple.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::showMultiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
        showMultipleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showMultiple.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showMultiple.form = showMultipleForm
const LivestockLossNoticeController = { show, showWithData, download, showMultiple }

export default LivestockLossNoticeController