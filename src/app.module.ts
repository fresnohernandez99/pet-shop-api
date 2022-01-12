import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigService } from "./config/config.service";
import { Configuration } from "./config/config.keys";
import { PersonModule } from "./modules/person/person.module";
import { ShopModule } from "./modules/shop/shop.module";
import { BreedModule } from "./modules/breed/breed.module";
import { AnimalModule } from "./modules/animal/animal.module";
import { PetModule } from "./modules/pet/pet.module";
import { ImagesModule } from './modules/images/images.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule,
		DatabaseModule,
		PersonModule,
		RoleModule,
		AuthModule,
		BreedModule,
		ShopModule,
		AnimalModule,
		PetModule,
		ImagesModule,
	],
})
export class AppModule {
	static port: number | string;

	constructor(private readonly _configService: ConfigService) {
		AppModule.port = this._configService.get(Configuration.PORT);
	}
}
