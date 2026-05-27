// 此文件是一个 Cloudflare Pages Function
// 路径: /api/get-sitekey

export async function onRequestGet(context) {
    const { env } = context;
    const { TURNSTILE_SITE_KEY } = env;

    if (!TURNSTILE_SITE_KEY) {
        return new Response(
            JSON.stringify({
                success: false,
                message: '服务器配置错误：Site Key 未设置',
                'error-codes': ['missing-sitekey'],
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

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