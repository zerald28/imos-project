import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/insurance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::index
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:16
 * @route '/insurance'
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
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
export const signatureEditor = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signatureEditor.url(args, options),
    method: 'get',
})

signatureEditor.definition = {
    methods: ["get","head"],
    url: '/insurance/signature/{id}/editor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return signatureEditor.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signatureEditor.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
signatureEditor.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signatureEditor.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
    const signatureEditorForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signatureEditor.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
        signatureEditorForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signatureEditor.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::signatureEditor
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:302
 * @route '/insurance/signature/{id}/editor'
 */
        signatureEditorForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signatureEditor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signatureEditor.form = signatureEditorForm
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
export const saveSignature = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSignature.url(args, options),
    method: 'post',
})

saveSignature.definition = {
    methods: ["post"],
    url: '/insurance/signature/{id}/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
saveSignature.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return saveSignature.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
saveSignature.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSignature.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
    const saveSignatureForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveSignature.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:176
 * @route '/insurance/signature/{id}/save'
 */
        saveSignatureForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveSignature.url(args, options),
            method: 'post',
        })
    
    saveSignature.form = saveSignatureForm
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignatures
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
export const saveSignatures = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSignatures.url(args, options),
    method: 'post',
})

saveSignatures.definition = {
    methods: ["post"],
    url: '/insurance/signature/{id}/saves',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignatures
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
saveSignatures.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return saveSignatures.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignatures
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
saveSignatures.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSignatures.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignatures
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
    const saveSignaturesForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveSignatures.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::saveSignatures
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:150
 * @route '/insurance/signature/{id}/saves'
 */
        saveSignaturesForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveSignatures.url(args, options),
            method: 'post',
        })
    
    saveSignatures.form = saveSignaturesForm
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
 */
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
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
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
 */
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
 */
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
 */
    const downloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
 */
        downloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::download
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:232
 * @route '/insurance/{id}/pdf/download'
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
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
export const previewImage = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewImage.url(args, options),
    method: 'get',
})

previewImage.definition = {
    methods: ["get","head"],
    url: '/insurance/{id}/preview-image',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
previewImage.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return previewImage.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
previewImage.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewImage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
previewImage.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewImage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
    const previewImageForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: previewImage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
        previewImageForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewImage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::previewImage
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:203
 * @route '/insurance/{id}/preview-image'
 */
        previewImageForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: previewImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    previewImage.form = previewImageForm
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/{id}/signature/save'
 */
const saveee622861164a3f86ca983560ce300b6d = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveee622861164a3f86ca983560ce300b6d.url(args, options),
    method: 'post',
})

saveee622861164a3f86ca983560ce300b6d.definition = {
    methods: ["post"],
    url: '/insurance/{id}/signature/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/{id}/signature/save'
 */
saveee622861164a3f86ca983560ce300b6d.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return saveee622861164a3f86ca983560ce300b6d.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/{id}/signature/save'
 */
saveee622861164a3f86ca983560ce300b6d.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveee622861164a3f86ca983560ce300b6d.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/{id}/signature/save'
 */
    const saveee622861164a3f86ca983560ce300b6dForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveee622861164a3f86ca983560ce300b6d.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/{id}/signature/save'
 */
        saveee622861164a3f86ca983560ce300b6dForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveee622861164a3f86ca983560ce300b6d.url(args, options),
            method: 'post',
        })
    
    saveee622861164a3f86ca983560ce300b6d.form = saveee622861164a3f86ca983560ce300b6dForm
    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
const savee5684cbc1804a485b89d9018597a9840 = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savee5684cbc1804a485b89d9018597a9840.url(args, options),
    method: 'post',
})

savee5684cbc1804a485b89d9018597a9840.definition = {
    methods: ["post"],
    url: '/insurance/signature/{application}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
savee5684cbc1804a485b89d9018597a9840.url = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { application: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: typeof args.application === 'object'
                ? args.application.id
                : args.application,
                }

    return savee5684cbc1804a485b89d9018597a9840.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
savee5684cbc1804a485b89d9018597a9840.post = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savee5684cbc1804a485b89d9018597a9840.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
    const savee5684cbc1804a485b89d9018597a9840Form = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: savee5684cbc1804a485b89d9018597a9840.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::save
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:251
 * @route '/insurance/signature/{application}'
 */
        savee5684cbc1804a485b89d9018597a9840Form.post = (args: { application: number | { id: number } } | [application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: savee5684cbc1804a485b89d9018597a9840.url(args, options),
            method: 'post',
        })
    
    savee5684cbc1804a485b89d9018597a9840.form = savee5684cbc1804a485b89d9018597a9840Form

export const save = {
    '/insurance/{id}/signature/save': saveee622861164a3f86ca983560ce300b6d,
    '/insurance/signature/{application}': savee5684cbc1804a485b89d9018597a9840,
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
export const getSignature = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSignature.url(args, options),
    method: 'get',
})

getSignature.definition = {
    methods: ["get","head"],
    url: '/insurance/signature/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
getSignature.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getSignature.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
getSignature.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSignature.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
getSignature.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSignature.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
    const getSignatureForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSignature.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
        getSignatureForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSignature.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\InsuranceController::getSignature
 * @see app/Http/Controllers/ImosAdmin/InsuranceController.php:293
 * @route '/insurance/signature/{id}'
 */
        getSignatureForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSignature.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSignature.form = getSignatureForm
const InsuranceController = { index, signatureEditor, saveSignature, saveSignatures, download, previewImage, save, getSignature }

export default InsuranceController