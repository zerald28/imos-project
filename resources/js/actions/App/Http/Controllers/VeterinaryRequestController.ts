import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VeterinaryRequestController::updateStatus
 * @see app/Http/Controllers/VeterinaryRequestController.php:39
 * @route '/veterinary-request/{id}/update-status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/veterinary-request/{id}/update-status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\VeterinaryRequestController::updateStatus
 * @see app/Http/Controllers/VeterinaryRequestController.php:39
 * @route '/veterinary-request/{id}/update-status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VeterinaryRequestController::updateStatus
 * @see app/Http/Controllers/VeterinaryRequestController.php:39
 * @route '/veterinary-request/{id}/update-status'
 */
updateStatus.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\VeterinaryRequestController::updateStatus
 * @see app/Http/Controllers/VeterinaryRequestController.php:39
 * @route '/veterinary-request/{id}/update-status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VeterinaryRequestController::updateStatus
 * @see app/Http/Controllers/VeterinaryRequestController.php:39
 * @route '/veterinary-request/{id}/update-status'
 */
        updateStatusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\VeterinaryRequestController::destroy
 * @see app/Http/Controllers/VeterinaryRequestController.php:52
 * @route '/veterinary-requests/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/veterinary-requests/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VeterinaryRequestController::destroy
 * @see app/Http/Controllers/VeterinaryRequestController.php:52
 * @route '/veterinary-requests/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VeterinaryRequestController::destroy
 * @see app/Http/Controllers/VeterinaryRequestController.php:52
 * @route '/veterinary-requests/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\VeterinaryRequestController::destroy
 * @see app/Http/Controllers/VeterinaryRequestController.php:52
 * @route '/veterinary-requests/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VeterinaryRequestController::destroy
 * @see app/Http/Controllers/VeterinaryRequestController.php:52
 * @route '/veterinary-requests/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/veterinary-request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VeterinaryRequestController::store
 * @see app/Http/Controllers/VeterinaryRequestController.php:11
 * @route '/veterinary-request'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const VeterinaryRequestController = { updateStatus, destroy, store }

export default VeterinaryRequestController