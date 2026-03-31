import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::index
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:14
 * @route '/admin/profile'
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
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::uploadSignature
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:86
 * @route '/imos_admin/profile/signature'
 */
export const uploadSignature = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadSignature.url(options),
    method: 'post',
})

uploadSignature.definition = {
    methods: ["post"],
    url: '/imos_admin/profile/signature',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::uploadSignature
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:86
 * @route '/imos_admin/profile/signature'
 */
uploadSignature.url = (options?: RouteQueryOptions) => {
    return uploadSignature.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::uploadSignature
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:86
 * @route '/imos_admin/profile/signature'
 */
uploadSignature.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadSignature.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::uploadSignature
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:86
 * @route '/imos_admin/profile/signature'
 */
    const uploadSignatureForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadSignature.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\AdminProfileController::uploadSignature
 * @see app/Http/Controllers/ImosAdmin/AdminProfileController.php:86
 * @route '/imos_admin/profile/signature'
 */
        uploadSignatureForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadSignature.url(options),
            method: 'post',
        })
    
    uploadSignature.form = uploadSignatureForm
const AdminProfileController = { index, uploadSignature }

export default AdminProfileController