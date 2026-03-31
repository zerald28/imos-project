import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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
const profile = {
    uploadSignature: Object.assign(uploadSignature, uploadSignature),
}

export default profile