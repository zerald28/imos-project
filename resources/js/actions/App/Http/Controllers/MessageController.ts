import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
export const index = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/conversations/{conversation}/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
index.url = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    conversation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversation: args.conversation,
                }

    return index.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
index.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
index.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
    const indexForm = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
        indexForm.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:25
 * @route '/conversations/{conversation}/messages'
 */
        indexForm.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\MessageController::send
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/conversations/{conversation}/messages'
 */
export const send = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/conversations/{conversation}/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::send
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/conversations/{conversation}/messages'
 */
send.url = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    conversation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversation: args.conversation,
                }

    return send.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::send
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/conversations/{conversation}/messages'
 */
send.post = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::send
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/conversations/{conversation}/messages'
 */
    const sendForm = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::send
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/conversations/{conversation}/messages'
 */
        sendForm.post = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(args, options),
            method: 'post',
        })
    
    send.form = sendForm
/**
* @see \App\Http\Controllers\MessageController::typing
 * @see app/Http/Controllers/MessageController.php:152
 * @route '/conversations/{conversation}/typing'
 */
export const typing = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: typing.url(args, options),
    method: 'post',
})

typing.definition = {
    methods: ["post"],
    url: '/conversations/{conversation}/typing',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::typing
 * @see app/Http/Controllers/MessageController.php:152
 * @route '/conversations/{conversation}/typing'
 */
typing.url = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conversation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conversation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversation: typeof args.conversation === 'object'
                ? args.conversation.id
                : args.conversation,
                }

    return typing.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::typing
 * @see app/Http/Controllers/MessageController.php:152
 * @route '/conversations/{conversation}/typing'
 */
typing.post = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: typing.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::typing
 * @see app/Http/Controllers/MessageController.php:152
 * @route '/conversations/{conversation}/typing'
 */
    const typingForm = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: typing.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::typing
 * @see app/Http/Controllers/MessageController.php:152
 * @route '/conversations/{conversation}/typing'
 */
        typingForm.post = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: typing.url(args, options),
            method: 'post',
        })
    
    typing.form = typingForm
/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:114
 * @route '/messages/{message}'
 */
export const update = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:114
 * @route '/messages/{message}'
 */
update.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return update.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:114
 * @route '/messages/{message}'
 */
update.put = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:114
 * @route '/messages/{message}'
 */
    const updateForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:114
 * @route '/messages/{message}'
 */
        updateForm.put = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:136
 * @route '/messages/{message}'
 */
export const destroy = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:136
 * @route '/messages/{message}'
 */
destroy.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: args.message,
                }

    return destroy.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:136
 * @route '/messages/{message}'
 */
destroy.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:136
 * @route '/messages/{message}'
 */
    const destroyForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:136
 * @route '/messages/{message}'
 */
        destroyForm.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MessageController::markAsRead
 * @see app/Http/Controllers/MessageController.php:40
 * @route '/conversations/{conversation}/mark-read'
 */
export const markAsRead = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.definition = {
    methods: ["post"],
    url: '/conversations/{conversation}/mark-read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::markAsRead
 * @see app/Http/Controllers/MessageController.php:40
 * @route '/conversations/{conversation}/mark-read'
 */
markAsRead.url = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    conversation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversation: args.conversation,
                }

    return markAsRead.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::markAsRead
 * @see app/Http/Controllers/MessageController.php:40
 * @route '/conversations/{conversation}/mark-read'
 */
markAsRead.post = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::markAsRead
 * @see app/Http/Controllers/MessageController.php:40
 * @route '/conversations/{conversation}/mark-read'
 */
    const markAsReadForm = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAsRead.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::markAsRead
 * @see app/Http/Controllers/MessageController.php:40
 * @route '/conversations/{conversation}/mark-read'
 */
        markAsReadForm.post = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAsRead.url(args, options),
            method: 'post',
        })
    
    markAsRead.form = markAsReadForm
const MessageController = { index, send, typing, update, destroy, markAsRead }

export default MessageController