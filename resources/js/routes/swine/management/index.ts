import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/swine-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::dashboard
 * @see app/Http/Controllers/Swine/SwineController.php:466
 * @route '/swine-management'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
export const financialPerformance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financialPerformance.url(options),
    method: 'get',
})

financialPerformance.definition = {
    methods: ["get","head"],
    url: '/swine-management/financial-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.url = (options?: RouteQueryOptions) => {
    return financialPerformance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: financialPerformance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
financialPerformance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: financialPerformance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
    const financialPerformanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: financialPerformance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
        financialPerformanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financialPerformance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::financialPerformance
 * @see app/Http/Controllers/Swine/SwineController.php:598
 * @route '/swine-management/financial-performance'
 */
        financialPerformanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: financialPerformance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    financialPerformance.form = financialPerformanceForm
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
export const activityLog = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityLog.url(options),
    method: 'get',
})

activityLog.definition = {
    methods: ["get","head"],
    url: '/swine-management/activity-log',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.url = (options?: RouteQueryOptions) => {
    return activityLog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityLog.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
activityLog.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activityLog.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
    const activityLogForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: activityLog.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
        activityLogForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activityLog.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\SellerTransactionController::activityLog
 * @see app/Http/Controllers/Marketplace/SellerTransactionController.php:271
 * @route '/swine-management/activity-log'
 */
        activityLogForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activityLog.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    activityLog.form = activityLogForm
const management = {
    dashboard: Object.assign(dashboard, dashboard),
financialPerformance: Object.assign(financialPerformance, financialPerformance),
activityLog: Object.assign(activityLog, activityLog),
}

export default management