import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::home
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
export const indexPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPage.url(options),
    method: 'get',
})

indexPage.definition = {
    methods: ["get","head"],
    url: '/veterinary/farmers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.url = (options?: RouteQueryOptions) => {
    return indexPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
indexPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexPage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
    const indexPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexPage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
        indexPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPage
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:566
 * @route '/veterinary/farmers/list'
 */
        indexPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexPage.form = indexPageForm
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
export const indexPages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPages.url(options),
    method: 'get',
})

indexPages.definition = {
    methods: ["get","head"],
    url: '/veterinary/farmer/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.url = (options?: RouteQueryOptions) => {
    return indexPages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexPages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
indexPages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexPages.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
    const indexPagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexPages.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
        indexPagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPages.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\VeterinaryDiseaseReportController::indexPages
 * @see app/Http/Controllers/Form/VeterinaryDiseaseReportController.php:0
 * @route '/veterinary/farmer/list'
 */
        indexPagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexPages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexPages.form = indexPagesForm
/**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/dashboard'
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
 * @see [serialized-closure]:2
 * @route '/page'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/page'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/page'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/page'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/page'
 */
    const pageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: page.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/page'
 */
        pageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: page.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/page'
 */
        pageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: page.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    page.form = pageForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
export const profileInformation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profileInformation.url(options),
    method: 'get',
})

profileInformation.definition = {
    methods: ["get","head"],
    url: '/profile-information',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.url = (options?: RouteQueryOptions) => {
    return profileInformation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profileInformation.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profileInformation.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
    const profileInformationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profileInformation.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
        profileInformationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profileInformation.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
        profileInformationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profileInformation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profileInformation.form = profileInformationForm
/**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
export const appearance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})

appearance.definition = {
    methods: ["get","head"],
    url: '/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
appearance.url = (options?: RouteQueryOptions) => {
    return appearance.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
appearance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
appearance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appearance.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
    const appearanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appearance.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
        appearanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appearance.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/settings/appearance'
 */
        appearanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appearance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appearance.form = appearanceForm
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:20
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:73
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:73
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:73
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:73
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:73
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm