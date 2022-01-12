import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { ConnectionOptions } from "typeorm";
import { Configuration } from "../config/config.keys";

export const databaseProviders = [
	TypeOrmModule.forRoot()
];
