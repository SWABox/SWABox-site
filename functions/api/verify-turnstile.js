// 此文件是一个 Cloudflare Pages Function
// 路径: /api/verify-turnstile

export async function onRequestOptions(context) {
    const { request, env } = context;
    const origin = request.headers.get('Origin');
    const allowedOrigins = env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',') : ['https://swabox.cc.cd'];
    const isAllowedOrigin = origin && allowedOrigins.some(allowed => origin.includes(allowed));

    const headers = {
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };

    if (isAllowedOrigin) {
        headers['Access-Control-Allow-Origin'] = origin;
        headers['Access-Control-Allow-Credentials'] = 'true';
    }

    return new Response(null, { headers });
}

export async function onRequestPost(context) {
    // context.env 包含了环境变量
    const { request, env } = context;
    const { TURNSTILE_SECRET_KEY } = env;

    // 1. 检查环境变量
    if (!TURNSTILE_SECRET_KEY) {
        return new Response(
            JSON.stringify({
                success: false,
                message: '服务器配置错误。',
                'error-codes': ['missing-secret'],
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    try {
        // 2. 解析前端传来的 JSON
        const { token } = await request.json();

        if (!token) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: '请求中缺少验证令牌。',
                    'error-codes': ['missing-input-response'],
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // 3. 准备向 Cloudflare 验证 API 发送的数据
        const formData = new FormData();
        formData.append('secret', TURNSTILE_SECRET_KEY);
        formData.append('response', token);
        // 可选：如果需要，可以添加 remoteip
        // const clientIP = request.headers.get('CF-Connecting-IP');
        // if (clientIP) formData.append('remoteip', clientIP);

        // 4. 向 Cloudflare 验证端点发送请求
        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await verifyResponse.json();

        const origin = request.headers.get('Origin');
        const allowedOrigins = env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',') : ['https://swabox.cc.cd'];
        const isAllowedOrigin = origin && allowedOrigins.some(allowed => origin.includes(allowed));

        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (isAllowedOrigin) {
            headers['Access-Control-Allow-Origin'] = origin;
            headers['Access-Control-Allow-Credentials'] = 'true';
            headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
            headers['Access-Control-Allow-Headers'] = 'Content-Type';
        }

        return new Response(
            JSON.stringify({
                success: data.success,
                challenge_ts: data.challenge_ts,
                hostname: data.hostname,
                'error-codes': data['error-codes'],
                message: data.success ? '验证通过。' : '人机验证失败，请重试。',
            }),
            { headers }
        );

    } catch (error) {
        // 6. 捕获处理过程中的任何错误
        console.error('Function 内部错误:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: '验证服务暂时不可用。',
                'error-codes': ['internal-error'],
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}