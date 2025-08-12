import manifest from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifest);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle API routes
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(pathname, request, env, ctx);
    }

    // Serve static assets
    const assetKey = pathname.substring(1) || 'index.html';
    
    if (assetManifest[assetKey]) {
      const asset = await env.ASSETS.fetch(request);
      return asset;
    }

    // Serve index.html for SPA routing
    const indexAsset = await env.ASSETS.fetch(new Request(new URL('/', url)));
    return new Response(indexAsset.body, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};

async function handleApiRequest(pathname, request, env, ctx) {
  if (pathname === '/api/hello') {
    return new Response(
      JSON.stringify({ 
        message: 'Hello from Cloudflare Worker!',
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  return new Response('Not found', { status: 404 });
}
