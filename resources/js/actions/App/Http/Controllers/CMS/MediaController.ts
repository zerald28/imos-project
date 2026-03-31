import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\CMS\MediaController::upload
 * @see app/Http/Controllers/CMS/MediaController.php:12
 * @route '/cms/uploads'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/cms/uploads',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\MediaController::upload
 * @see app/Http/Controllers/CMS/MediaController.php:12
 * @route '/cms/uploads'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\MediaController::upload
 * @see app/Http/Controllers/CMS/MediaController.php:12
 * @route '/cms/uploads'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\MediaController::upload
 * @see app/Http/Controllers/CMS/MediaController.php:12
 * @route '/cms/uploads'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\MediaController::upload
 * @see app/Http/Controllers/CMS/MediaController.php:12
 * @route '/cms/uploads'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \App\Http\Controllers\CMS\MediaController::deleteMethod
 * @see app/Http/Controllers/CMS/MediaController.php:30
 * @route '/cms/uploads'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/cms/uploads',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CMS\MediaController::deleteMethod
 * @see app/Http/Controllers/CMS/MediaController.php:30
 * @route '/cms/uploads'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\MediaController::deleteMethod
 * @see app/Http/Controllers/CMS/MediaController.php:30
 * @route '/cms/uploads'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CMS\MediaController::deleteMethod
 * @see app/Http/Controllers/CMS/MediaController.php:30
 * @route '/cms/uploads'
 */
    const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\MediaController::deleteMethod
 * @see app/Http/Controllers/CMS/MediaController.php:30
 * @route '/cms/uploads'
 */
        deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
const MediaController = { upload, deleteMethod, delete: deleteMethod }

export default MediaController