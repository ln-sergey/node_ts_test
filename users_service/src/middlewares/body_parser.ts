import { Context } from "koa";

export async function bodyParser(ctx: Context, next: () => Promise<any>) {
    if (["POST", "PUT"].includes(ctx.req.method ?? '')) {
        const body = await new Promise<string>((resolve, reject) => {
            const chunks: any[] = []
            ctx.req
                .on('data', chunk => chunks.push(chunk))
                .on('error', reject)
                .on('end', () => resolve(chunks.join('')))
                .on('error', reject)
        });
        ctx.body = JSON.parse(body);
    }
    await next();

}