import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Pet Shop")
		.setDescription("The greatest Pet Shop api")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);

	await app.listen(AppModule.port);
}
bootstrap();
