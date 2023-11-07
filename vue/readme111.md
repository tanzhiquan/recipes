# 1、启动后端
    python manage.py runserver 0.0.0.0:8000

# 2、启动前端
    yarn install 
    yarn serve
# 2.1、注意
    修改 vue.config.js 对应的 IP
    修改 webpack-stats.json 对应的 IP

# 3、修改前端
## 3.1收集到 Python 目录静态文件
    python3 manage.py collectstatic --no-input
    python3 manage.py collectstatic_js_reverse

# 4、后端设置语言（中文） 
    LANGUAGE_CODE = 'zh-hans'
# 5、前端设置语言（中文）
    i18n.js 文件 ：
    locale: process.env.VUE_APP_I18N_LOCALE || 'zh_Hans',
