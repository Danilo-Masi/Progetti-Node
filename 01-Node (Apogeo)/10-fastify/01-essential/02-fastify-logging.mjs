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

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}