// 此文件是一个 Cloudflare Pages Function
// 路径: /api/get-sitekey

export async function onRequestGet(context) {
    const { env, request } = context;
    const { TURNSTILE_SITE_KEY } = env;

    console.log('get-sitekey 被调用');
    console.log('环境变量可用性:', {
        TURNSTILE_SITE_KEY: !!TURNSTILE_SITE_KEY,
        allEnvKeys: Object.keys(env || {})
    });

    if (!TURNSTILE_SITE_KEY) {
        console.error('TURNSTILE_SITE_KEY 环境变量未设置');
        return new Response(
            JSON.stringify({
                success: false,
                message: '服务器配置错误：Site Key 未设置',
                'error-codes': ['missing-sitekey'],
                debug: {
                    availableKeys: Object.keys(env || {}),
                    hasSiteKey: !!TURNSTILE_SITE_KEY
                }
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    console.log('成功获取 Site Key:', TURNSTILE_SITE_KEY.substring(0, 10) + '...');

    return new Response(
        JSON.stringify({
            success: true,
            sitekey: TURNSTILE_SITE_KEY,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600',
            },
        }
    );
}