// 调试端点 - 检查环境变量配置
export async function onRequestGet(context) {
    const { env, request } = context;
    
    const debugInfo = {
        timestamp: new Date().toISOString(),
        requestUrl: request.url,
        environment: {
            hasEnv: !!env,
            envType: typeof env,
            envKeys: env ? Object.keys(env) : [],
        },
        turnstileConfig: {
            hasSiteKey: !!env?.TURNSTILE_SITE_KEY,
            hasSecretKey: !!env?.TURNSTILE_SECRET_KEY,
            hasAllowedOrigins: !!env?.ALLOWED_ORIGINS,
            siteKeyPreview: env?.TURNSTILE_SITE_KEY ? 
                env.TURNSTILE_SITE_KEY.substring(0, 10) + '...' : 'NOT_SET',
            allowedOrigins: env?.ALLOWED_ORIGINS || 'NOT_SET'
        },
        allEnvVariables: env ? Object.keys(env).reduce((acc, key) => {
            acc[key] = typeof env[key];
            return acc;
        }, {}) : {}
    };

    console.log('调试信息:', JSON.stringify(debugInfo, null, 2));

    return new Response(JSON.stringify(debugInfo, null, 2), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}