const BundleTracker = require("webpack-bundle-tracker")

const pages = {
    recipe_search_view: {
        entry: "./src/apps/RecipeSearchView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    recipe_view: {
        entry: "./src/apps/RecipeView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    offline_view: {
        entry: "./src/apps/OfflineView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    import_view: {
        entry: "./src/apps/ImportView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    import_response_view: {
        entry: "./src/apps/ImportResponseView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    export_response_view: {
        entry: "./src/apps/ExportResponseView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    export_view: {
        entry: "./src/apps/ExportView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    supermarket_view: {
        entry: "./src/apps/SupermarketView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    model_list_view: {
        entry: "./src/apps/ModelListView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    edit_internal_recipe: {
        entry: "./src/apps/RecipeEditView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    cookbook_view: {
        entry: "./src/apps/CookbookView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    meal_plan_view: {
        entry: "./src/apps/MealPlanView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    ingredient_editor_view: {
        entry: "./src/apps/IngredientEditorView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    shopping_list_view: {
        entry: "./src/apps/ShoppingListView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    space_manage_view: {
        entry: "./src/apps/SpaceManageView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    profile_view: {
        entry: "./src/apps/ProfileView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    settings_view: {
        entry: "./src/apps/SettingsView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    },
    test_view: {
        entry: "./src/apps/TestView/main.js",
        chunks: ["chunk-vendors","locales-chunk","api-chunk"],
    }
}

module.exports = {
    pages: pages,
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === "production" ? "" : "http://192.168.1.7:8080/",
    outputDir: "../cookbook/static/vue/",
    runtimeCompiler: true,
    pwa: {
        name: "Recipes",
        themeColor: "#4DBA87",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",

        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "./src/sw.js",
            swDest: "../../templates/sw.js",
            manifestTransforms: [
                (originalManifest) => {
                    const result = originalManifest.map((entry) => new Object({url: "static/vue/" + entry.url}))
                    return {manifest: result, warnings: []}
                },
            ],
        },
    },
    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "en",
            localeDir: "locales",
            enableInSFC: true,
        },
    },
    chainWebpack: (config) => {
        config.optimization.splitChunks(
            {
                cacheGroups: {
                    locale: {
                        test: /[\\/]src[\\/]locales[\\/]/,
                        name: "locales-chunk",
                        chunks: "all",
                        priority: 3,
                    },
                    api: {
                        test: /[\\/]src[\\/]utils[\\/]openapi[\\/]/,
                        name: "api-chunk",
                        chunks: "all",
                        priority: 3,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-vendors",
                        chunks: "all",
                        priority: 1,
                    },
                },
            },
        )

        config.optimization.minimize(true)

        //TODO somehow remove them as they are also added to the manifest config of the service worker
        /*
        Object.keys(pages).forEach(page => {
            config.plugins.delete(`html-${page}`);
            config.plugins.delete(`preload-${page}`);
            config.plugins.delete(`prefetch-${page}`);
        })
        */

        config.plugin("BundleTracker").use(BundleTracker, [{relativePath: true, path: "../vue/"}])

        config.resolve.alias.set("__STATIC__", "static")

        config.devServer
            .host("0.0.0.0")
            .port(8080)
            .set('hot', 'only')
            .set('static', {watch: true})
            // old webpack dev server v3 settings
            //  .hotOnly(true)
            //   .watchOptions({ poll: 500 })
            //  .public("http://localhost:8080")
            .https(false)
            .headers({"Access-Control-Allow-Origin": ["*"]})
            .proxy({
      // '/parkingServer': {
      // //普通的http代理
      //   target: 'http://你的服务器地址/parkingServer', // 内网(目前在用)如10.2.40.119:10014
      //   /*target: 'http://你的服务器地址/parkingServer', // 外网(目前在用)*/
      //   /*target: 'http://你的服务器地址/parkingServer',//蒋涛本地  网线*/
      //
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/parkingServer': '/'
      //   }
      // },
      '/socket': {
      //webSocket代理
        target: 'ws://192.168.1.7', // 内网
        /*target: 'ws://你的服务器地址/parkingServer', // 外网*/
        /*target: 'ws://你的服务器地址/parkingServer',//本地测试*/
        ws:true,//开启ws, 如果是http代理此处可以不用设置
        changeOrigin: true,
        // pathRewrite: {
        //   '^/socket': '/'
        // }
      }
    }
            )

    },

}
