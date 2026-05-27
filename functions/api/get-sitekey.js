// 此文件是一个 Cloudflare Pages Function
// 路径: /api/get-sitekey

export async function onRequestGet(context) {
    const { env, request } = context;
    
    console.log('=== get-sitekey 开始 ===');
    console.log('请求 URL:', request.url);
    console.log('环境对象类型:', typeof env);
    console.log('环境对象是否存在:', !!env);
    
    // 尝试多种方式获取环境变量
    const siteKeyMethods = {
        direct: env?.TURNSTILE_SITE_KEY,
        bracket: env ? env['TURNSTILE_SITE_KEY'] : undefined,
        uppercase: env?.turnstile_site_key,
        lowercase: env?.turnstile_site_key,
    };
    
    console.log('各种获取方式的结果:', {
        direct: !!siteKeyMethods.direct,
        bracket: !!siteKeyMethods.bracket,
        uppercase: !!siteKeyMethods.uppercase,
        lowercase: !!siteKeyMethods.lowercase
    });
    
    console.log('所有可用的环境变量键:', env ? Object.keys(env) : '无');
    
    // 使用找到的第一个有效值
    const TURNSTILE_SITE_KEY = siteKeyMethods.direct || siteKeyMethods.bracket || 
                                siteKeyMethods.uppercase || siteKeyMethods.lowercase;

    if (!TURNSTILE_SITE_KEY) {
        console.error('❌ 所有方式都无法获取 TURNSTILE_SITE_KEY');
        console.error('可用的环境变量:', env ? Object.keys(env) : []);
        
        return new Response(
            JSON.stringify({
                success: false,
                message: '服务器配置错误：Site Key 未设置',
                'error-codes': ['missing-sitekey'],
                debug: {
                    availableKeys: env ? Object.keys(env) : [],
                    envExists: !!env,
                    envType: typeof env,
                    triedMethods: {
                        direct: !!siteKeyMethods.direct,
                        bracket: !!siteKeyMethods.bracket,
                        uppercase: !!siteKeyMethods.uppercase,
                        lowercase: !!siteKeyMethods.lowercase
                    },
                    suggestion: '请检查 Cloudflare Pages 环境变量配置，确保 TURNSTILE_SITE_KEY 已正确设置'
                }
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    console.log('✅ 成功获取 Site Key:', TURNSTILE_SITE_KEY.substring(0, 10) + '...');

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