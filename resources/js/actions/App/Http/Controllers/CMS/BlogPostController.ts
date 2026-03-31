import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
export const admincreate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admincreate.url(options),
    method: 'get',
})

admincreate.definition = {
    methods: ["get","head"],
    url: '/cms/admin/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
admincreate.url = (options?: RouteQueryOptions) => {
    return admincreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
admincreate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admincreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
admincreate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admincreate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
    const admincreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: admincreate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
        admincreateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admincreate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::admincreate
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
        admincreateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admincreate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    admincreate.form = admincreateForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cms/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
export const publicShow = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})

publicShow.definition = {
    methods: ["get","head"],
    url: '/cms/blog/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
publicShow.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return publicShow.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
publicShow.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
publicShow.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
    const publicShowForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
        publicShowForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::publicShow
 * @see app/Http/Controllers/CMS/BlogPostController.php:313
 * @route '/cms/blog/{slug}'
 */
        publicShowForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicShow.form = publicShowForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/cms/blog/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::edit
 * @see app/Http/Controllers/CMS/BlogPostController.php:216
 * @route '/cms/blog/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::update
 * @see app/Http/Controllers/CMS/BlogPostController.php:240
 * @route '/cms/blog/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/cms/blog/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::update
 * @see app/Http/Controllers/CMS/BlogPostController.php:240
 * @route '/cms/blog/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::update
 * @see app/Http/Controllers/CMS/BlogPostController.php:240
 * @route '/cms/blog/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::update
 * @see app/Http/Controllers/CMS/BlogPostController.php:240
 * @route '/cms/blog/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::update
 * @see app/Http/Controllers/CMS/BlogPostController.php:240
 * @route '/cms/blog/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::uploadImage
 * @see app/Http/Controllers/CMS/BlogPostController.php:350
 * @route '/cms/posts/upload-image'
 */
export const uploadImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

uploadImage.definition = {
    methods: ["post"],
    url: '/cms/posts/upload-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::uploadImage
 * @see app/Http/Controllers/CMS/BlogPostController.php:350
 * @route '/cms/posts/upload-image'
 */
uploadImage.url = (options?: RouteQueryOptions) => {
    return uploadImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::uploadImage
 * @see app/Http/Controllers/CMS/BlogPostController.php:350
 * @route '/cms/posts/upload-image'
 */
uploadImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::uploadImage
 * @see app/Http/Controllers/CMS/BlogPostController.php:350
 * @route '/cms/posts/upload-image'
 */
    const uploadImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadImage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::uploadImage
 * @see app/Http/Controllers/CMS/BlogPostController.php:350
 * @route '/cms/posts/upload-image'
 */
        uploadImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadImage.url(options),
            method: 'post',
        })
    
    uploadImage.form = uploadImageForm
/**
* @see \App\Http\Controllers\CMS\BlogPostController::destroy
 * @see app/Http/Controllers/CMS/BlogPostController.php:300
 * @route '/cms/blog/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cms/blog/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::destroy
 * @see app/Http/Controllers/CMS/BlogPostController.php:300
 * @route '/cms/blog/{id}'
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
* @see \App\Http\Controllers\CMS\BlogPostController::destroy
 * @see app/Http/Controllers/CMS/BlogPostController.php:300
 * @route '/cms/blog/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::destroy
 * @see app/Http/Controllers/CMS/BlogPostController.php:300
 * @route '/cms/blog/{id}'
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
* @see \App\Http\Controllers\CMS\BlogPostController::destroy
 * @see app/Http/Controllers/CMS/BlogPostController.php:300
 * @route '/cms/blog/{id}'
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
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
const BlogPostController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BlogPostController.url(options),
    method: 'get',
})

BlogPostController.definition = {
    methods: ["get","head"],
    url: '/cms/exit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
BlogPostController.url = (options?: RouteQueryOptions) => {
    return BlogPostController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
BlogPostController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BlogPostController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
BlogPostController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: BlogPostController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
    const BlogPostControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: BlogPostController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
        BlogPostControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BlogPostController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
        BlogPostControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BlogPostController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    BlogPostController.form = BlogPostControllerForm
BlogPostController.create = create
BlogPostController.admincreate = admincreate
BlogPostController.store = store
BlogPostController.publicShow = publicShow
BlogPostController.edit = edit
BlogPostController.update = update
BlogPostController.uploadImage = uploadImage
BlogPostController.destroy = destroy

export default BlogPostController