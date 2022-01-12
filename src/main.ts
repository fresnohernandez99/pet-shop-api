import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
	  );
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Pet Shop")
		.setDescription("The greatest Pet Shop api")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);

	app.useStaticAssets(join(__dirname, '..', 'public'));
	
	await app.listen(AppModule.port);
}
bootstrap();
