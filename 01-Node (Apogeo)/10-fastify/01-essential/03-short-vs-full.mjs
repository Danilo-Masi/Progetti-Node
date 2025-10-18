import Fastify from "fastify";
const fastify = Fastify({
    logger: {
        level: "debug",
    },
    requestIdLogLabel: "rid",
});

fastify.get("/", async function handler(request, reply) {
    request.log.info("Handling hello world");
    return { hello: "fastify" };
});

fastify.get("/short", async function handler(request, reply) {
    request.log.info("Handling shorthand route");
    return { hello: "short" };
});

fastify.route({
    url: "/full",
    method: "GET",
    handler: async function handler(request, reply) {
        request.log.info("Handling full route");
        return { hello: "full" };
    },
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}